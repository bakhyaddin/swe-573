from django.conf import settings
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR

from posts.models import SearchedEntities, Twits
from posts.serializers import SearchedEntitiesSerializer, TwitSerializer
from posts import recent

from decouple import config


get_recent_posts = recent.Recent()
get_recent_posts.bearer_token = config('TWITTER_BEARER_TOKEN')

def fetch_twits():
    entities = SearchedEntities.objects.all()
    entity_serialiazer = SearchedEntitiesSerializer
    twit_serialiazer = TwitSerializer

    print("IT IS IN")

    if (len(entities) <= 0):
        print("Len is", len(entities))
        return

    for entity in entities:
        twit_ids = []

        searched_entity = entity_serialiazer(entity).data["entity"]
        twits_in_db = Twits.objects.filter(entity=entity)

        for twit in twits_in_db:
            twit_ids.append(twit_serialiazer(twit).data["id"])

        twits = None
        try:
            get_recent_posts.entity = searched_entity
            twits = get_recent_posts.get_query()
        except Exception as e:
            return Response(e, HTTP_500_INTERNAL_SERVER_ERROR)

        for twit in twits["data"]:
            if twit["id"] in twit_ids:
                print("IT exists")
                continue

            # create the twit in the database
            # try:
            #     tw = Twits.objects.create(
            #         id=twit["id"],
            #         text=twit["text"],
            #         entity=entity,
            #         created_at=datetime.fromisoformat(twit["created_at"][:-1])
            #     )
            #     print("IT IS SAVE")
            #     tw.save()
            # except Exception as e:
            #     return Response({"message": "Could not create the twit in the database"}, HTTP_500_INTERNAL_SERVER_ERROR)