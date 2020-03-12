from django.urls import path
from posts.views_api import PostContentList, PostContentsDetail

urlpatterns = [
	path('contents/', PostContentList.as_view(), name='contents'),
	path('<int:pk>/contents/detail/', PostContentsDetail.as_view(), name='contents_detail'),
]
