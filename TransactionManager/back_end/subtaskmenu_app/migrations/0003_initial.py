# Generated by Django 4.2.4 on 2023-08-28 06:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subtaskmenu_app', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subtaskmenu',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menusubtasks', to=settings.AUTH_USER_MODEL),
        ),
    ]
