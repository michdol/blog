from django.views.generic import ListView

from posts.models import Post


class PostsView(ListView):
	model = Post
	template_name = 'posts/list.html'
	context_object_name = 'posts'