from django_filters import rest_framework as filters
from matches.models import Match, Player


class MatchFilter(filters.FilterSet):
    year = filters.NumberFilter(field_name="date", lookup_expr="year")
    opponent = filters.CharFilter(field_name="teams__id")

    class Meta:
        model = Match
        fields = ["date", "teams"]


class PlayerFilter(filters.FilterSet):
    school = filters.CharFilter(field_name="school__id")
    name = filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Player
        fields = ["name", "school"]
