from django.db.models import Q
from rest_framework import serializers

from matches.models import Game, Match, Player, School, GameResult, Team
from posts.models import Image
from posts.serializers import ImageSerializer


class SchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = School
        fields = ("id", "name", "abbreviation")


class PlayerSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True)
    school_id = serializers.PrimaryKeyRelatedField(
        queryset=School.objects.all(), write_only=True
    )

    class Meta:
        model = Player
        fields = ("id", "name", "school", "school_id")


class GameResultSerializer(serializers.ModelSerializer):
    player_one = PlayerSerializer()
    player_two = PlayerSerializer(required=False)

    class Meta:
        model = GameResult
        fields = (
            "first_set",
            "second_set",
            "third_set",
            "winner",
            "player_one",
            "player_two",
        )

    def to_representation(self, instance):
        result = super(GameResultSerializer, self).to_representation(instance)
        return dict([(key, result[key]) for key in result if result[key] is not None])


class MatchGameSerializer(serializers.ModelSerializer):
    results = GameResultSerializer(source="gameresult_set", many=True)
    date = serializers.DateField(source="match.date")
    match_id = serializers.IntegerField(source="match.id")

    class Meta:
        model = Game
        fields = ("id", "discipline", "rank", "results", "date", "match_id")


class GameSerializer(serializers.ModelSerializer):
    match_id = serializers.PrimaryKeyRelatedField(
        queryset=Match.objects.all(), source="match"
    )
    results = GameResultSerializer(many=True, source="gameresult_set")

    class Meta:
        model = Game
        fields = ("id", "discipline", "rank", "match_id", "results")

    def create(self, validated_data):
        results = validated_data.pop("gameresult_set")
        game = Game.objects.create(**validated_data)
        for result in results:
            for player in ["player_one", "player_two"]:
                if result.get(player, None):
                    p = Player.objects.filter(
                        name=result[player]["name"], school=result[player]["school_id"]
                    ).first()
                    if not p:
                        p = Player.objects.create(
                            name=result[player]["name"],
                            school=result[player]["school_id"],
                        )
                    result[player] = p
            GameResult.objects.create(game=game, **result)

        return game

    def update(self, instance, validated_data):
        instance.discipline = validated_data.get("discipline", instance.discipline)
        instance.rank = validated_data.get("rank", instance.rank)

        results = validated_data.pop("gameresult_set")
        for result in results:
            for player in ["player_one", "player_two"]:
                if result.get(player, None):
                    p = Player.objects.filter(
                        name=result[player]["name"], school=result[player]["school_id"]
                    ).first()
                    if not p:
                        p = Player.objects.create(
                            name=result[player]["name"],
                            school=result[player]["school_id"],
                        )
                    result[player] = p
            r = GameResult.objects.filter(
                game_id=instance.id, winner=result["winner"]
            ).first()
            for k, v in result.items():
                setattr(r, k, v)
            r.save()
        instance.save()
        return instance


class PlayerListSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()
    games = MatchGameSerializer(many=True)
    wins = serializers.SerializerMethodField()
    losses = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = ("id", "name", "school", "games", "wins", "losses")

    def get_wins(self, obj):
        result = obj.games.filter(gameresult__player_one__id=obj.id) | obj.games.filter(
            gameresult__player_two__id=obj.id
        )
        query = Q(gameresult__player_one__id=obj.id) | Q(
            gameresult__player_two__id=obj.id
        )
        return result.filter(query, gameresult__winner=True).count()

    def get_losses(self, obj):
        result = obj.games.filter(gameresult__player_one__id=obj.id) | obj.games.filter(
            gameresult__player_two__id=obj.id
        )
        query = Q(gameresult__player_one__id=obj.id) | Q(
            gameresult__player_two__id=obj.id
        )
        return result.filter(query, gameresult__winner=False).count()


class TeamSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True)
    school_id = serializers.PrimaryKeyRelatedField(
        queryset=School.objects.all(), source="school"
    )

    class Meta:
        model = Team
        fields = ("winner", "school", "score", "school_id")


class MatchSerializer(serializers.ModelSerializer):
    scoresheet = ImageSerializer(required=False)
    teams = TeamSerializer(source="team_set", many=True)
    games = MatchGameSerializer(many=True, required=False)

    class Meta:
        model = Match
        fields = ("id", "date", "scoresheet", "teams", "games")


class MatchCreateSerializer(serializers.ModelSerializer):
    scoresheet = serializers.FileField(required=False)
    teams = TeamSerializer(source="team_set", many=True, required=False)
    games = MatchGameSerializer(many=True, required=False)
    date = serializers.DateField(required=False)

    class Meta:
        model = Match
        fields = ("id", "date", "scoresheet", "teams", "games")


class SchoolDetailSerializer(serializers.ModelSerializer):
    wins = serializers.IntegerField()
    losses = serializers.IntegerField()
    total_matches = serializers.IntegerField()

    class Meta:
        model = School
        fields = ("id", "name", "abbreviation", "wins", "losses", "total_matches")
