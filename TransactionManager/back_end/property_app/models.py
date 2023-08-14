from django.db import models
from validator.validator import zip_validator

class Property(models.Model):
    street = models.CharField(
        max_length=200, 
    )
    city = models.CharField(
        max_length=200,
    )
    state = models.CharField(
        default="VA",
    )
    zip = models.CharField(
        validators=[zip_validator]
    )
    well = models.BooleanField(
        default=False
    )
    septic = models.BooleanField(
        default=False
    )
    hoa = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip}"    