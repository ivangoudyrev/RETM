# Generated by Django 4.2.4 on 2023-08-15 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inspector_app', '0003_alter_inspector_contactslist_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspector',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
