# Generated by Django 4.2.4 on 2023-08-14 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Taskmenu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=4)),
                ('title', models.CharField(max_length=100)),
                ('details', models.TextField(blank=True, null=True)),
            ],
        ),
    ]