from django.db import models

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

    def __str__(self):
        return f"{self.title}"
