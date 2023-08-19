from django.db import models
from validator.validator import validate_name, validate_phone
from contactslist_app.models import Contactslist

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
        # unique=True, 
        blank=False, 
        null=False
    )
    contactslist_id = models.ForeignKey(
        Contactslist,
        on_delete=models.CASCADE,
        related_name="clients"
    )
    notes = models.TextField(
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"