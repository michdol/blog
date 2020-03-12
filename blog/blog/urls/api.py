from django.urls import path, include

urlpatterns = [
	path('api-auth/', include('rest_framework.urls')),
	path('posts/', include(('posts.urls.api', 'posts')))
]
