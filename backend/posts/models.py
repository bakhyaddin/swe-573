from django.db import models
from datetime import datetime
from django.utils import timezone
from authentication.models import UserTemplate
# Create your models here.

class SearchedEntities(models.Model):
    entity = models.CharField(max_length=300, blank=True, null=True, unique=False)


class Twits(models.Model):
    id = models.BigIntegerField(primary_key=True, editable=False)
    text = models.CharField(max_length=100000, blank=True, null=True, unique=False)
    cleaned_text = models.CharField(max_length=100000, blank=True, null=True, unique=False)
    entity = models.ForeignKey(SearchedEntities, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    sentiment = models.CharField(max_length=100, blank=True, null=True, unique=False)
    unique_together = ('created_at', 'entity', 'id')


class Results(models.Model):
    entity = models.CharField(max_length=100, blank=True, null=True, unique=False)
    twits = models.ManyToManyField(Twits, blank=True, related_name='results')
    user_id = models.ForeignKey(UserTemplate, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    sentiment_result = models.CharField(max_length=100, blank=True, null=True, unique=False)
    graph_img = models.BinaryField(max_length=None, blank=True, null=True, editable=True)
    wordcloud_img = models.BinaryField(max_length=None, blank=True, null=True, editable=True)
