from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from posts.models import Post, PostContent
from posts.serializers import PostWithContentSerializer, PostContentSerializer


class PostContentList(generics.ListAPIView):
	queryset = PostContent.objects.all().order_by('order')
	serializer_class = PostContentSerializer


class PostContentsDetail(generics.CreateAPIView):
	serializer_class = PostContentSerializer
	# TODO: change to authenticated only
	permission_classes = (AllowAny,)

	def post(self, request, *args, **kwargs):
		self.process(request.data)
		return Response(status.HTTP_200_OK)

	def process(self, data):
		self.delete_contents(data.get("delete", []))
		self.update_contents(data.get("update", []))
		self.create_contents(data.get("create", []))
		self.fix_ordering(data.get("ordering", {}))

	def delete_contents(self, ids):
		post_id = self.get_post_id()
		PostContent.objects.filter(post_id=post_id, id__in=ids).delete()

	def update_contents(self, update_data):
		for content_data in update_data:
			serializer = PostContentSerializer(data=content_data)
			if serializer.is_valid():
				serializer.save()

	def create_contents(self, create_data):
		post_id = self.get_post_id()
		data = {
			"contents": create_data
		}
		post = Post.objects.get(id=post_id)
		serializer = PostWithContentSerializer(instance=post, data=data)
		if serializer.is_valid():
			serializer.save()		
			"""
		for content_data in create_data:
			content_data["post_id"] = post_id
			print(content_data)
			serializer = PostWithContentSerializer(data=content_data)
			if serializer.is_valid():
				serializer.save()
				"""

	def fix_ordering(self, ordering):
		" TODO: implement this "
		post_id = self.get_post_id()
		queryset = PostContent.objects.filter(post_id=post_id)
		for content in queryset:
			content.order = ordering.get(content.id, 99)
			# TODO: use bulk_update
			content.save()

	def get_post_id(self):
		return self.kwargs.get('pk')
