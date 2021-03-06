from django.views.generic import DetailView, ListView, TemplateView

from posts.constants import POST_CONTENT_TYPE_HEADLINE, POST_CONTENT_TYPE_TEXT
from posts.models import Post


class HomeView(TemplateView):
	template_name = 'posts/home.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		posts = Post.objects.all().order_by('-created')
		context['latest_post'] = posts[0]
		context['post_1'] = posts[1]
		context['post_2'] = posts[2]
		context['post_3'] = posts[3]
		return context


class PostsView(ListView):
	model = Post
	template_name = 'posts/list.html'
	context_object_name = 'posts'
	ordering = ('-created',)
	paginate_by = 3


class PostDetailView(DetailView):
	model = Post
	template_name = 'posts/detail.html'
	context_object_name = 'post'

	def get_queryset(self):
		return Post.objects.prefetch_related("contents").filter(id=self.kwargs.get('pk'))

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		post = context['post']
		contents = post.contents.all()
		context['contents'] = contents
		context['PCT_HEADLINE'] = POST_CONTENT_TYPE_HEADLINE
		context['PCT_TEXT'] = POST_CONTENT_TYPE_TEXT
		return context
