from typing import List, Dict

from django.db import transaction
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from posts.models import PostContent
from posts.serializers import PostContentSerializer


class PostContentList(generics.ListAPIView):
    queryset = PostContent.objects.all().order_by('order')
    serializer_class = PostContentSerializer


class PostContentsDetail(generics.CreateAPIView):
    serializer_class = PostContentSerializer
    # TODO: change to authenticated only
    permission_classes = (AllowAny,)

    @transaction.atomic
    def post(self, request, *args, **kwargs) -> Response:
        self.process(request.data)
        return Response(status.HTTP_200_OK)

    def get_post_id(self) -> int:
        return self.kwargs.get('pk')

    def process(self, data: dict):
        self.delete_contents(data.get("delete", []))
        self.update_contents(data.get("update", []))
        id_ref_map = self.create_contents(data.get("create", []))
        self.fix_ordering(data.get("ordering", {}), id_ref_map)

    def delete_contents(self, ids: list):
        post_id = self.get_post_id()
        PostContent.objects.filter(post_id=post_id, id__in=ids).delete()

    def update_contents(self, update_data: List[dict]):
        ids = sorted([obj['id'] for obj in update_data])
        queryset = PostContent.objects.filter(id__in=ids).order_by('id')
        for content, content_data in zip(queryset, update_data):
            serializer = PostContentSerializer(
                instance=content, data=content_data, partial=True
            )
            if serializer.is_valid():
                serializer.save()

    def create_contents(self, create_data: List[dict]) -> dict:
        post_id = self.get_post_id()
        id_ref_map = {}
        for content_data in create_data:
            content_data["post_id"] = post_id
            content_data["order"] = 99
            serializer = PostContentSerializer(data=content_data)
            if serializer.is_valid(raise_exception=True):
                new_content = serializer.save()
                id_ref_map[new_content.id] = content_data['ref']
        return id_ref_map

    def fix_ordering(self, ordering: Dict[str, int], id_ref_map):
        post_id = self.get_post_id()
        queryset = PostContent.objects.filter(post_id=post_id)
        for content in queryset:
            order = ordering.get(id_ref_map.get(content.id))
            if not isinstance(order, int):
                # TODO: check if you need to change it to ints
                order = ordering.get(str(content.id))
            content.order = order
            # TODO: use bulk_update
            content.save()
