# Generated by Django 3.1.3 on 2021-01-12 14:10

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SearchedEntities',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entity', models.CharField(blank=True, max_length=300, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Twits',
            fields=[
                ('id', models.CharField(editable=False, max_length=100, primary_key=True, serialize=False)),
                ('text', models.CharField(blank=True, max_length=100000, null=True)),
                ('created_at', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('entity', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.searchedentities')),
            ],
        ),
    ]