# Generated by Django 3.0.3 on 2020-03-04 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image_url',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
    ]