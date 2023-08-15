# Generated by Django 4.2.4 on 2023-08-15 02:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contactslist_app', '0001_initial'),
        ('agent_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='agent',
            name='contactslist_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='agent', to='contactslist_app.contactslist'),
            preserve_default=False,
        ),
    ]
