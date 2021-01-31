from django.conf import settings
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR


from decouple import config
from datetime import datetime


from posts.models import SearchedEntities, Twits
from posts.serializers import SearchedEntitiesSerializer, TwitSerializer
from posts import recent
from posts.preprocessing import CleanData
from posts.sentiment import Sentiment


clean_data = CleanData().clean_data
sentiment = Sentiment()
get_recent_posts = recent.Recent()
get_recent_posts.bearer_token = config('TWITTER_BEARER_TOKEN')

def fetch_twits():
    entities = SearchedEntities.objects.all()
    entity_serialiazer = SearchedEntitiesSerializer
    twit_serialiazer = TwitSerializer

    if (len(entities) <= 0):
        print("Len is", len(entities))
        return

    # get all twit ids
    for entity in entities:
        twits_in_db = Twits.objects.filter(entity=entity)
        twit_ids = [twit_serialiazer(twit).data["id"] for twit in twits_in_db]

        searched_entity = entity_serialiazer(entity).data["entity"]
        twits = None

        try:
            get_recent_posts.entity = searched_entity
            twits = get_recent_posts.get_query()
        except Exception as e:
            return Response(e, HTTP_500_INTERNAL_SERVER_ERROR)

        for twit in twits["data"]:
            if int(twit["id"]) in twit_ids:
                print("IT exists")
                continue

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
                return Response({"message": "Could not create twits in the database"}, HTTP_500_INTERNAL_SERVER_ERROR)