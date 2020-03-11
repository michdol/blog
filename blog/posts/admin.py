from django import forms
from django.contrib import admin

from posts.models import Post


class TmpForm(forms.ModelForm):
	class Meta:
		model = Post
		fields = '__all__'

	def clean(self):
		import ipdb; ipdb.set_trace()
		print('kurwa')
		super().clean()


class PostAdminView(admin.ModelAdmin):
	form = TmpForm

	# TODO: either add field to fieldset? or add inline

	def change_view(self, request, object_id, form_url='', extra_context=None):
		extra_context = extra_context or {}
		extra_context['post'] = Post.objects.prefetch_related("contents").get(id=object_id)
		post = extra_context['post']
		extra_context['post_dict'] = {
			"id": post.id,
			"title": post.title,
			"contents": self._contents_to_dicts(post)
		}
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

	def save_model(request, obj, form, change):
		print(form)
		print(dir(form))
		return super().save_model(request, obj, form, change)


admin.site.register(Post, PostAdminView)
