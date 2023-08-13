from django.db import models
from validator.validator import validate_name, validate_phone

class Client(models.Model):
    first_name = models.CharField(
        max_length=255, 
        blank=False,
        null=False,
        validators=[validate_name]
    )
    mid_init = models.CharField(
        max_length=255, 
        blank=True,
        null=True,
        validators=[validate_name]
    )
    last_name = models.CharField(
        max_length=255, 
        blank=False,
        null=False,
        validators=[validate_name]
    )
    phone = models.CharField(
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
