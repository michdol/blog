from rest_framework import serializers

from posts.models import Post, PostContent


class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields = ('id',)


class PostContentSerializer(serializers.ModelSerializer):
	post = PostSerializer(read_only=True)
	post_id = serializers.IntegerField(write_only=True)

	class Meta:
		model = PostContent
		fields = ('id', 'post', 'post_id', 'headline', 'text', 'is_hidden', 'order')

	def create(self, validated_data) -> PostContent:
		return PostContent.objects.create(**validated_data)

	def update(self, instance, validated_data) -> PostContent:
		instance.headline = validated_data.get('headline', instance.headline)
		instance.text = validated_data.get('text', instance.text)
		instance.is_hidden = validated_data.get('is_hidden', instance.is_hidden)
		instance.order = validated_data.get('order', instance.order)
		instance.save()
		return instance
