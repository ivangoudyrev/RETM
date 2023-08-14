# Generated by Django 4.2.4 on 2023-08-14 19:44

from django.db import migrations, models
import validator.validator


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('state', models.CharField(default='VA')),
                ('zip', models.CharField(validators=[validator.validator.zip_validator])),
                ('well', models.BooleanField(default=False)),
                ('septic', models.BooleanField(default=False)),
                ('hoa', models.BooleanField(default=True)),
            ],
        ),
    ]
