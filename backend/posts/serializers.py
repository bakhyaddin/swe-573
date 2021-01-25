from rest_framework.serializers import ModelSerializer

from posts.models import SearchedEntities, Twits

class SearchedEntitiesSerializer(ModelSerializer):
    class Meta:
        model = SearchedEntities
        fields = '__all__'


class TwitSerializer(ModelSerializer):
    class Meta:
        model = Twits
        fields = '__all__'