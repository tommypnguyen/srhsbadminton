from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Count, Q
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status


from matches.models import Game, Match, Player, School
from matches.filters import MatchFilter, PlayerFilter
from matches.serializers import (
    GameSerializer,
    MatchSerializer,
    PlayerSerializer,
    PlayerListSerializer,
    SchoolSerializer,
    SchoolDetailSerializer,
)


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PlayerFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PlayerListSerializer
        return super().get_serializer_class()

    def retrieve(self, request, pk):
        year = self.request.query_params.get("year")
        year_q = Q()
        if year:
            year_q = Q(match__date__year=year)
        instance = self.get_object()
        games = Game.objects.filter(
            id__in=instance.gameresult_set.values_list("game", flat=True)
        )
        games = games.filter(year_q)

        instance.games = games

        serializer = self.get_serializer(instance)

        return Response(serializer.data)


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        year = self.request.query_params.get("year")
        opponent = self.request.query_params.get("opponent")
        year_q = Q()
        opponent_q = Q()
        if year:
            year_q = Q(match__date__year=year)
        if opponent:
            opponent_q = Q(match__teams__id=opponent)

        self.queryset = self.queryset.filter(year_q & opponent_q)

        self.queryset = self.queryset.annotate(
            wins=Count("match", filter=Q(team__winner=True))
        )
        self.queryset = self.queryset.annotate(
            losses=Count("match", filter=Q(team__winner=False))
        )
        self.queryset = self.queryset.annotate(total_matches=Count("match"))

        return self.queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return SchoolDetailSerializer
        return super().get_serializer_class()


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MatchFilter

    def get_queryset(self):
        return self.queryset.prefetch_related("teams", "games").order_by("-date")

    @action(detail=False, methods=["get"])
    def years(self, request):
        years = self.get_queryset().dates("date", "year")
        years = sorted([d.year for d in years], reverse=True)
        return Response(data=years, status=status.HTTP_200_OK)


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
