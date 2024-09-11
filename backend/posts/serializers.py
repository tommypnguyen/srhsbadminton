from rest_framework import serializers

from posts.models import Image, Post


class ImageSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=False)

    class Meta:
        model = Image
        fields = ("id", "url", "title", "category")


class PostSerializer(serializers.ModelSerializer):
    images = serializers.SlugRelatedField(
        queryset=Image.objects.all(),
        many=True,
        allow_null=True,
        slug_field="url",
        required=False,
    )

    class Meta:
        model = Post
        fields = ("id", "date", "title", "body", "images")
