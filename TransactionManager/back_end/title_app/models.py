from django.db import models
from validator.validator import validate_name, validate_phone
from contactslist_app.models import Contactslist

class Title(models.Model):
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
        unique=True,
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
    company = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    contactslist_id = models.ForeignKey(
        Contactslist,
        on_delete=models.CASCADE,
        related_name="titles"
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.company}"