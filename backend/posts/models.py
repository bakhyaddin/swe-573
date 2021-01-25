from django.db import models
from datetime import datetime
from django.utils import timezone

# Create your models here.

class SearchedEntities(models.Model):
    entity = models.CharField(max_length=300, blank=True, null=True, unique=False)

class Twits(models.Model):
    id = models.CharField(max_length=100, primary_key=True, editable=False)
    text = models.CharField(max_length=100000, blank=True, null=True, unique=False)
    entity = models.ForeignKey(SearchedEntities, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)