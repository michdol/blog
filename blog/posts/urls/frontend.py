from django.urls import path

from posts.views import HomeView, PostsView


urlpatterns = [
	path('', HomeView.as_view()),
	path('posts/', PostsView.as_view())
]