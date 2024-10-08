# Generated by Django 5.0.3 on 2024-04-10 07:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("matches", "0004_remove_team_home_gameresult_delete_gameplayer_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="team",
            name="score",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="game",
            name="match",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="games",
                to="matches.match",
            ),
        ),
    ]
