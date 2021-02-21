from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField

from posts.models import SearchedEntities, Twits, Results

class SearchedEntitiesSerializer(ModelSerializer):
    class Meta:
        model = SearchedEntities
        fields = '__all__'


class TwitSerializer(ModelSerializer):
    class Meta:
        model = Twits
        fields = '__all__'


class ResultsSerializer(ModelSerializer):
    twits = SerializerMethodField("last_hundred_twits")
    number_of_twits = SerializerMethodField("get_number_of_twits")

    class Meta:
        model = Results
        fields = (
            "id",
            "created_at",
            "entity",
            "graph_img",
            "sentiment_result",
            "twits",
            "user_id",
            "wordcloud_img",
            "number_of_twits"
        )

    def last_hundred_twits(self, results):
        try:
            qs = list(results.twits.all())[-100:]
        except Exception as e:
            print(e)

        serializer = TwitSerializer(instance=qs, many=True)
        return serializer.data

    def get_number_of_twits(self, results):
        return len(list(results.twits.all()))
