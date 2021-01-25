from django.shortcuts import render
from django.utils import timezone
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.exceptions import ValidationError

from datetime import datetime
import requests
import json
from decouple import config

from posts.models import SearchedEntities, Twits
from posts.serializers import TwitSerializer
from posts import recent
from posts.preprocessing import CleanData
from posts.sentiment import Sentiment
from posts.wordcloud import WordCloud
# from posts.entity_linking import EntityLinker
from posts.ngram import NGram
import utils

get_recent_posts = recent.Recent()
get_recent_posts.bearer_token = config('TWITTER_BEARER_TOKEN')

clean_data = CleanData().clean_data
sentiment = Sentiment()
wordcloud = WordCloud()
ngram = NGram()
# entity_linker = EntityLinker()


class PostsAPIView(APIView):
    def post(self, request, *args, **kwargs):
        response = None

        searched_entity = request.data.get("search")
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
                    # create the twit in the database
                    try:
                        tw = Twits.objects.create(
                            id=twit["id"],
                            text=twit["text"],
                            entity=entity,
                            created_at=datetime.fromisoformat(twit["created_at"][:-1])
                        )
                        tw.save()
                    except Exception as e:
                        entity.delete()
                        return Response({"message": "Could not create the twit in the database"}, HTTP_500_INTERNAL_SERVER_ERROR)
                
                # analyze data here
                return Response(twits["data"], HTTP_200_OK)
            except:
                entity.delete()
                return Response({"message": "Database error"}, HTTP_500_INTERNAL_SERVER_ERROR)
        
        else:
            twits = None
            try:
                twit_response = []
                twit_serialiazer = TwitSerializer
                twits = Twits.objects.all().filter(entity=entity)

                for twit in twits:
                    try:
                        twit_response.append(clean_data(twit_serialiazer(twit).data["text"]))
                    except Exception as e:
                        print(e)

                # sentiment.data = twit_response
                ngram.data = twit_response
                # try:
                #     sentiment.analyze()
                # except Exception as e:
                #     print(e)
                bigram = None
                try:
                    bigram = ngram.get_bigram()
                except Exception as e:
                    print("Error", e)
                # analyze data here
                # return Response(bigram, HTTP_200_OK)
                return HttpResponse(bigram, content_type="image/png", status=HTTP_200_OK)
            except Exception as e:
                return Response({"message": "Could not fetch twits from the database"}, HTTP_500_INTERNAL_SERVER_ERROR)
