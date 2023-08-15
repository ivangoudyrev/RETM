from django.db import models
from django.contrib.auth.models import AbstractUser
from validator.validator import validate_name, validate_phone

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(
        max_length=255, 
        blank=False,
        null=False,
        validators=[validate_name]
    )
    last_name = models.CharField(
        max_length=255, 
        blank=False,
        null=False,
        validators=[validate_name]
    )
    phone = models.CharField(
        unique=True,
        max_length=255,
        blank=True,
        null=True,
        validators=[validate_phone]
    ) 
    email = models.EmailField(
        unique=True, 
        blank=False, 
        null=False
    )
    company = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
