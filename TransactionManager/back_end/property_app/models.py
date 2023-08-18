from django.db import models
from validator.validator import zip_validator
from user_app.models import User

class Property(models.Model):
    street = models.CharField(
        max_length=200, 
    )
    city = models.CharField(
        max_length=200,
    )
    state = models.CharField(
        max_length=2,
    )
    zip = models.CharField(
        validators=[zip_validator],
    )
    well = models.BooleanField(
        default=False
    )
    septic = models.BooleanField(
        default=False
    )
    hoa = models.BooleanField(
        default=False
    )
    user_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='properties'
    )

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip}"    