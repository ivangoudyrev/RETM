from django.db import models
from user_app.models import User

# Create your models here.
class Taskmenu(models.Model):
    type = models.CharField(
        max_length=4
    )
    title = models.CharField(
        max_length=100
    )
    details = models.TextField(
        null=True,
        blank=True
    )
    essential = models.BooleanField(
        default = True
    )
    user_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='menutasks'
    )

    def __str__(self):
        return f"{self.title}"
