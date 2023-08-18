from django.db import models
from user_app.models import User

# Create your models here.
class Contactslist(models.Model):
    user_id = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='contacts'
    )