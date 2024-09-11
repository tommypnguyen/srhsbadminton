from django_filters import rest_framework as filters
from matches.models import Image


class ImageFilter(filters.FilterSet):
    class Meta:
        model = Image
        fields = ["category"]
