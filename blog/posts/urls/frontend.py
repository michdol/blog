from django.urls import path

from posts.views import PostDetailView, HomeView, PostsView


urlpatterns = [
	path('', HomeView.as_view(), name="home"),
	path('posts/', PostsView.as_view(), name="list"),
	path('posts/<int:pk>/', PostDetailView.as_view(), name="detail"),
]