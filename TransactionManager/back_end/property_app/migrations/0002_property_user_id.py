# Generated by Django 4.2.4 on 2023-08-15 21:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('property_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='properties', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
