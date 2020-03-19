from django import forms
from django.conf import settings
from django.contrib import admin
from django.utils.timezone import now

from posts.constants import POST_STATUS_SHOW
from posts.models import Post, PostContent
from posts.serializers import PostSerializer


class PostAdminView(admin.ModelAdmin):
	list_display = ('id', 'title', 'published', 'status', 'created', 'updated')
	exclude = ('published',)

	def change_view(self, request, object_id, form_url='', extra_context=None):
		extra_context = extra_context or {}
		post = Post.objects.prefetch_related("contents").get(id=object_id)
		extra_context['post'] = post
		serialized_post = PostSerializer(post)
		extra_context['post_dict'] = serialized_post.data
		extra_context['API_URL'] = getattr(settings, "API_URL", "")
		
		return super().change_view(request, object_id, form_url, extra_context=extra_context)

	def save_model(self, request, obj, form, change):
		if not obj.published and self.is_being_published(form):
			obj.published = now()
		super().save_model(request, obj, form, change)

	def is_being_published(self,form) -> bool:
		is_not_published = form.initial.get('status') < POST_STATUS_SHOW
		new_status_published = form.cleaned_data.get('status') == POST_STATUS_SHOW
		return is_not_published and new_status_published


admin.site.register(Post, PostAdminView)
