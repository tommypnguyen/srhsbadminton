from django.db import models

from posts.models import Image


class School(models.Model):
    name = models.CharField(unique=True)
    abbreviation = models.CharField(max_length=24)

    def __str__(self):
        return self.name


class Player(models.Model):
    name = models.CharField(max_length=100, blank=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return f"{self.name} ({self.school})"


class Match(models.Model):
    date = models.DateField()
    scoresheet = models.ForeignKey(
        Image, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    teams = models.ManyToManyField(
        School, through="Team", through_fields=("match", "school")
    )

    def __str__(self):
        teams = self.teams.all()
        return f"{teams[0]} vs {teams[1]} ({self.date})"


class Team(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    winner = models.BooleanField(default=False, null=True, blank=True)
    score = models.IntegerField(default=0)


class Game(models.Model):
    class Discipline(models.TextChoices):
        MS = "Men's Singles"
        MD = "Men's Doubles"
        WS = "Women's Singles"
        WD = "Women's Doubles"
        MX = "Mixed Doubles"

    discipline = models.CharField(choices=Discipline.choices, default=Discipline.MS)
    rank = models.IntegerField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="games")

    def __str__(self):
        return f"{self.discipline} {self.rank} (Match ID: {self.match.id})"


class GameResult(models.Model):
    first_set = models.IntegerField()
    second_set = models.IntegerField()
    third_set = models.IntegerField(blank=True, null=True)
    winner = models.BooleanField(default=False)
    player_one = models.ForeignKey(Player, on_delete=models.CASCADE)
    player_two = models.ForeignKey(
        Player,
        on_delete=models.CASCADE,
        related_name="player_two",
        blank=True,
        null=True,
    )
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
