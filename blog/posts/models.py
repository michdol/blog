from django.contrib.postgres.fields import JSONField
from django.db import models

from posts.constants import POST_STATUS_HIDE, POST_STATUS_CHOICES


class Post(models.Model):
	title = models.CharField(max_length=512)
	description = models.TextField(null=True, blank=True)
	image_url = models.CharField(max_length=1024, blank=True, null=True)
	extra = JSONField(default=dict)
	status = models.IntegerField(choices=POST_STATUS_CHOICES, default=POST_STATUS_HIDE)
	updated = models.DateTimeField(auto_now=True)
	created = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = 'post'
		verbose_name_plural = 'posts'

	def __unicode__(self):
		return self.title


class PostContent(models.Model):
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='contents')
	headline = models.CharField(max_length=256, blank=True, null=True)
	text = models.CharField(max_length=2048, blank=True, null=True)
	is_hidden = models.BooleanField(default=False)
	order = models.IntegerField(default=99)

	class Meta:
		verbose_name = 'content'
		verbose_name_plural = 'contents'
