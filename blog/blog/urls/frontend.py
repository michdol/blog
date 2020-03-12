from django.contrib import admin
from django.urls import path, include

urlpatterns = [
	path('', include(('posts.urls.frontend', 'posts'), namespace='posts')),
	path('admin/', admin.site.urls),
	path('api-auth/', include('rest_framework.urls')),
]
