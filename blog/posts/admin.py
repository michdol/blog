from django.contrib import admin

from posts.models import Post


class PostAdminView(admin.ModelAdmin):
	def change_view(self, request, object_id, form_url='', extra_context=None):
		extra_context = extra_context or {}
		extra_context['post'] = Post.objects.prefetch_related("contents").get(id=object_id)
		extra_context['contents'] = self._contents_to_dicts(extra_context['post'])
		return super().change_view(request, object_id, form_url, extra_context=extra_context)

	def _contents_to_dicts(self, post):
		return [
			{
				"id": content.id,
				"headline": content.headline,
				"text": content.text,
				"is_hidden": content.is_hidden,
				"order": content.order,
			}
			for content in post.contents.order_by('order')
		]


admin.site.register(Post, PostAdminView)
