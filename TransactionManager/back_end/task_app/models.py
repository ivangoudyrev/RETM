from django.db import models
from tasklist_app.models import Tasklist

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=100)
    details = models.TextField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    tasklist_id = models.ForeignKey(
        Tasklist,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    complete = models.BooleanField(default=False)
    essential = models.BooleanField(default=False)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} {self.tasklist_id}"