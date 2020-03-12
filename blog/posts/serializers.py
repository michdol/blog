from rest_framework import serializers

from posts.models import Post, PostContent


class PostContentSerializer(serializers.ModelSerializer):
	class Meta:
		model = PostContent
		fields = ('id', 'post_id', 'headline', 'text', 'is_hidden')

	def create(self, validated_data):
		return PostContent.objects.create(**validated_data)

	def update(self, instance, validated_data):
		instance.headline = validated_data.get('headline', instance.headline)
		instance.text = validated_data.get('text', instance.text)
		instance.is_hidden = validated_data.get('is_hidden', instance.is_hidden)
		instance.order = validated_data.get('order', instance.order)
		return instance


class PostWithContentSerializer(serializers.ModelSerializer):
	contents = PostContentSerializer(many=True)

	class Meta:
		model = Post
		fields = ('id', 'contents')

	def update(self, instance, validated_data):
		new_contents = []
		for content_data in validated_data["contents"]:
			content_data["order"] = 99
			content = PostContent(post_id=instance.id, **content_data)
			new_contents.append(content)
		PostContent.objects.bulk_create(new_contents)
		return instance
