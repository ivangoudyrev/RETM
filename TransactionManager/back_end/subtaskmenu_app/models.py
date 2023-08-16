from django.db import models
from taskmenu_app.models import Taskmenu

# Create your models here.
class Subtaskmenu(models.Model):
    title = models.CharField(
        max_length=100
    )
    details = models.TextField(
        null=True,
        blank=True
    )
    essential = models.BooleanField(
        default=True
    )
    task_id = models.ForeignKey(
        Taskmenu,
        on_delete=models.CASCADE,
        related_name='subtasks'
    )
    connected_task_id = models.ForeignKey( #invoked for connected tasks
        Taskmenu,
        on_delete=models.CASCADE,
        related_name='subtask',
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.title} - {self.task_id} - {self.connected_task_id}"