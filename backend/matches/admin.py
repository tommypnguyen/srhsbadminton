from django.contrib import admin

from matches.models import Game, Match, Player, School, Team, GameResult


class TeamInLine(admin.TabularInline):
    model = Team
    max_num = 2


class GameResultInLine(admin.TabularInline):
    model = GameResult
    max_num = 2


class MatchAdmin(admin.ModelAdmin):
    inlines = (TeamInLine,)


class GameAdmin(admin.ModelAdmin):
    inlines = (GameResultInLine,)


class PlayerAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


# Register your models here.
admin.site.register(Match, MatchAdmin)
admin.site.register(Game, GameAdmin)
admin.site.register(School)
admin.site.register(Player, PlayerAdmin)
