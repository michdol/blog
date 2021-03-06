from django.contrib.postgres.fields import JSONField
from django.db import models

from posts.constants import (
	POST_STATUS_HIDE,
	POST_STATUS_CHOICES,
	POST_CONTENT_TYPE_UNDEFINED,
	POST_CONTENT_TYPE_CHOICES
)


class Post(models.Model):
	title = models.CharField(max_length=512)
	description = models.TextField(null=True, blank=True)
	image_url = models.CharField(max_length=1024, blank=True, null=True)
	extra = JSONField(default=dict)
	status = models.IntegerField(choices=POST_STATUS_CHOICES, default=POST_STATUS_HIDE)
	published = models.DateTimeField(null=True, blank=True)
	updated = models.DateTimeField(auto_now=True)
	created = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = 'post'
		verbose_name_plural = 'posts'

	def __unicode__(self):
		return self.title

	def get_home_page_background_color(self):
		return self.extra.get('background-color', "#61082b")


class PostContent(models.Model):
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='contents')
	headline = models.CharField(max_length=256, blank=True, null=True)
	text = models.TextField(blank=True, null=True)
	image_url = models.CharField(max_length=1024, blank=True, null=True)
	is_hidden = models.BooleanField(default=False)
	type = models.SmallIntegerField(default=POST_CONTENT_TYPE_UNDEFINED, choices=POST_CONTENT_TYPE_CHOICES)
	order = models.IntegerField(default=99)
	extra = JSONField(default=dict)
	updated = models.DateTimeField(auto_now=True)
	created = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = 'content'
		verbose_name_plural = 'contents'
		ordering = ['order']
