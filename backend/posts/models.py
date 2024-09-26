from django.db import models


class Image(models.Model):
    class ImageType(models.TextChoices):
        POST = "post"
        GALLERY = "gallery"

    url = models.TextField()
    title = models.TextField(null=True, blank=True)
    category = models.CharField(choices=ImageType.choices, default=ImageType.POST)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title or self.url


class Post(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    title = models.TextField()
    body = models.TextField()
    images = models.ManyToManyField(Image, blank=True)

    def __str__(self):
        return self.title
