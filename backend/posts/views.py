from django.shortcuts import render
from django.utils import timezone
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.exceptions import ValidationError

from datetime import datetime
import jwt
import json
import requests
import base64
from decouple import config

from authentication.permissions import IsOwnerPermission
from authentication.models import UserTemplate
from posts.models import SearchedEntities, Twits, Results
from posts.serializers import TwitSerializer, ResultsSerializer
from posts import recent
from posts.preprocessing import CleanData
from posts.sentiment import Sentiment
from posts.wordcloud import GenerateWordCloud
from posts.ngram import NGram
import utils

get_recent_posts = recent.Recent()
get_recent_posts.bearer_token = config('TWITTER_BEARER_TOKEN')
clean_data = CleanData().clean_data
sentiment = Sentiment()
wordcloud = GenerateWordCloud()
ngram = NGram()


class PostsAPIView(APIView):
    def post(self, request, *args, **kwargs):
        twit_serialiazer = TwitSerializer
        searched_entity = request.data.get("search")
        result_types = request.data.get("result-type")
        user_id = request.user.id
        
        entity = SearchedEntities.objects.filter(entity=searched_entity).first()

        if not entity:
            try:
                # create an entity in the DB
                try:
                    entity = SearchedEntities.objects.create(entity=searched_entity)
                    entity.save()
                except Exception as e:
                    return Response({"message": "Could not create the entity in the database"}, HTTP_500_INTERNAL_SERVER_ERROR)

                # fetching twits
                twits = None
                try:
                    get_recent_posts.entity = searched_entity
                    twits = get_recent_posts.get_query()
                except Exception as e:
                    return Response(e, HTTP_500_INTERNAL_SERVER_ERROR)

                for twit in twits["data"]:
                    """create the twit in the database"""
                    
                    # getting the twit data cleaned
                    cleaned_text = clean_data(twit["text"])
                    
                    # sentiment alalysis for each twit
                    sentiment.data = cleaned_text
                    try:
                        tw = Twits.objects.create(
                            id=int(twit["id"]),
                            text=twit["text"],
                            cleaned_text=cleaned_text,
                            entity=entity,
                            created_at=datetime.fromisoformat(twit["created_at"][:-1]),
                            sentiment=sentiment.analyze()
                        )
                        tw.save()
                    except Exception as e:
                        entity.delete()
                        return Response({"message": "Could not create twits in the database"}, HTTP_500_INTERNAL_SERVER_ERROR)
                
                """ Analyze Data """
                # get all recently created twits
                twits = Twits.objects.all().filter(entity=entity)
                analyze_data(twit_serialiazer, twits, user_id, result_types, searched_entity)

                return Response("SUP", HTTP_200_OK)
            except Exception as e:
                print(e)
                entity.delete()
                return Response({"message": "Database error"}, HTTP_500_INTERNAL_SERVER_ERROR)
        
        else:
            try:
                twits = Twits.objects.all().filter(entity=entity)


                # creating cleaned_text filed in the twits that do not have
                for twit in twits:
                    cleaned_text = clean_data(twit_serialiazer(twit).data["text"])
                    if not twit.cleaned_text:
                        try:
                            twit.cleaned_text=cleaned_text
                            twit.save()
                        except Exception as e:
                            print(e)
                    if not twit.sentiment:
                        try:
                            sentiment.data = cleaned_text
                            twit.sentiment=sentiment.analyze()
                            twit.save()
                        except Exception as e:
                            print(e)

                """ Analyze Data """
                analyze_data(twit_serialiazer, twits, user_id, result_types, searched_entity)
                
                return HttpResponse("Done", content_type="image/png", status=HTTP_200_OK)
            except Exception as e:
                return Response({"message": "Could not fetch twits from the database"}, HTTP_500_INTERNAL_SERVER_ERROR)



class GetResultsAPI(APIView):
    serializer_class = ResultsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        try:
            results = Results.objects.filter(user_id=request.user.id)
            return Response([self.serializer_class(result).data for result in results], HTTP_200_OK)
        except Exception as e:
            return Response(e, HTTP_500_INTERNAL_SERVER_ERROR)


class GetAllTwitsAPI(ListAPIView):
    serializer_class = TwitSerializer
    queryset = Twits.objects.all()


class DeleteResultsAPI(APIView):
    def delete(self, request, *args, **kwargs):
        result = Results.objects.filter(user_id=request.user.id)
        result = result.get(id=kwargs.get("pk"))
        try:
            result.delete()
            return Response({"message": "Result is deleted"}, HTTP_200_OK)
        except Exception as e:
            return Response({"message": e}, HTTP_400_BAD_REQUEST)



def analyze_data(twit_serialiazer, twits, user_id, result_types, entity):
    # fetching all cleaned data from the DB

    all_cleaned_text = [twit_serialiazer(twit).data["cleaned_text"] for twit in twits]
    
    # getting the user
    user = UserTemplate.objects.get(id = user_id)
    
    # creating results object
    try:
        results = Results.objects.create(user_id=user, entity=entity)
        results.twits.set(twits)
        results.save()
    except Exception as e:
        return Response({"message": "Something went wrong"}, HTTP_500_INTERNAL_SERVER_ERROR)
        print(e)

    for result_type in result_types:
        # generating bigram
        if result_type == "bigram":
            ngram.data = all_cleaned_text
            try:
                graph_img = ngram.get_bigram()
                results.graph_img = graph_img
            except Exception as e:
                print("ERROR", e)
                results.delete()
                return Response({"message": "Something went wrong"}, HTTP_500_INTERNAL_SERVER_ERROR)
        
        # generating wordcloud
        if result_type == "wordcloud":
            wordcloud.data = all_cleaned_text
            try:
                wordcloud_img = wordcloud.get_word_cloud()
                results.wordcloud_img = wordcloud_img
            except Exception as e:
                results.delete()
                return Response({"message": "Something went wrong"}, HTTP_500_INTERNAL_SERVER_ERROR)
                print(e)

        # getting sentiment
        if result_type == "sentiment":
            sentiment.data = all_cleaned_text
            try:
                results.sentiment_result = sentiment.analyze()
            except Exception as e:
                results.delete()
                return Response({"message": "Something went wrong"}, HTTP_500_INTERNAL_SERVER_ERROR)
                print(e)
        
        results.save()
