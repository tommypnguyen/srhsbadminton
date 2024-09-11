from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from posts.models import Image, Post
from posts.filters import ImageFilter
from posts.serializers import ImageSerializer, PostSerializer
from posts.services import cloudinary


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ImageFilter
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request):
        files = request.FILES.getlist("files")
        if not files:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if len(files) > 10:
            return Response(
                {"error": "Unable to upload more than 10 images at a time."},
                status.HTTP_400_BAD_REQUEST,
            )
        images = []
        for file in files:
            try:
                url, public_id = cloudinary.upload_image(file=file)
                image = Image(
                    url=url,
                    title=public_id,
                    category=Image.ImageType.GALLERY,
                )
                images.append(image)
            except Exception as e:
                print(e)
                return Response(
                    {
                        "error": "Error trying to upload image",
                    },
                    status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        Image.objects.bulk_create(images)
        return Response(status=status.HTTP_201_CREATED)

    def destroy(self, request, pk):
        try:
            image = self.get_object()
            cloudinary.delete_image(image.title)
            image.delete()
        except Exception:
            return Response(
                {"error": "Unable to delete image from server"},
                status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        files = self.request.data.getlist("files")
        if len(files) > 5:
            return Response(
                {"error": "Unable to upload more than 5 images at a time."},
                status.HTTP_400_BAD_REQUEST,
            )
        images = []
        for file in files:
            try:
                url, public_id = cloudinary.upload_image(file=file)
                image = Image(
                    url=url,
                    title=public_id,
                    category=Image.ImageType.POST,
                )
                images.append(image)
            except Exception as e:
                print(e)
                return Response(
                    {
                        "error": "Error trying to upload image into database",
                    },
                    status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        images = Image.objects.bulk_create(images)
        serializer.save(images=images)

    def perform_update(self, serializer):
        print(self.request.data)
        files = self.request.data.getlist("files")
        if len(files) > 5:
            return Response(
                {"error": "Unable to upload more than 5 images at a time."},
                status.HTTP_400_BAD_REQUEST,
            )
        images = []
        existing_images = []
        for file in files:
            if type(file) is str:
                existing_images.append(file)
            else:
                try:
                    url, public_id = cloudinary.upload_image(file=file)
                    image = Image(
                        url=url,
                        title=public_id,
                        category=Image.ImageType.POST,
                    )
                    images.append(image)
                except Exception as e:
                    print(e)
                    return Response(
                        {
                            "error": "Error trying to upload image into database",
                        },
                        status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
        images = Image.objects.bulk_create(images)
        for image in existing_images:
            i = Image.objects.filter(url=image).first()
            images.append(i)
        serializer.save(images=images)

    @action(detail=True, methods=["PUT"], url_path="add_images")
    def add_images(self, request, pk):
        post = self.get_object()
        files = request.FILES.getlist("files")
        if len(files) > 10:
            return Response(
                {"error": "Unable to upload more than 10 images at a time."},
                status.HTTP_400_BAD_REQUEST,
            )
        images = []
        for file in files:
            try:
                url, public_id = cloudinary.upload_image(file=file)
                image = Image(
                    url=url,
                    title=public_id,
                    category=Image.ImageType.POST,
                )
                images.append(image)
            except Exception as e:
                print(e)
                return Response(
                    {
                        "error": "Error trying to upload image into database",
                    },
                    status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        images = Image.objects.bulk_create(images)
        post.images.add(*images)
        return Response(status=status.HTTP_200_OK, data=post)
