from django.urls import path

from posts.views import PostsView


urlpatterns = [
	path('', PostsView.as_view())
]