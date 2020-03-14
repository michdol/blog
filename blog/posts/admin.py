from django import forms
from django.conf import settings
from django.contrib import admin

from posts.models import Post, PostContent
from posts.serializers import PostSerializer


class PostAdminView(admin.ModelAdmin):
	def change_view(self, request, object_id, form_url='', extra_context=None):
		extra_context = extra_context or {}
		post = Post.objects.prefetch_related("contents").get(id=object_id)
		extra_context['post'] = post
		serialized_post = PostSerializer(post)
		extra_context['post_dict'] = serialized_post.data
		extra_context['API_URL'] = getattr(settings, "API_URL", "")
		
		return super().change_view(request, object_id, form_url, extra_context=extra_context)


admin.site.register(Post, PostAdminView)
