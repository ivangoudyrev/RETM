from django.db import models
from task_app.models import Task

# Create your models here.
class Subtask(models.Model):
  type = models.CharField(max_length=4)
  title = models.CharField(max_length=100)
  details = models.TextField(null=True, blank=True)
  due_date = models.DateTimeField(null=True, blank=True)
  complete = models.BooleanField(
    default=False
  )
  essential = models.BooleanField(
    default=False
  )
  notes = models.TextField(null=True, blank=True)
  task_id = models.ForeignKey(
    Task,
    on_delete=models.CASCADE,
    related_name='subtasks'
  )
  connected_task_id = models.ForeignKey( #invoked for connected tasks
    Task,
    on_delete=models.CASCADE,
    related_name='subtask',
    null=True,
    blank=True
  )

  def __str__(self):
    return f"{self.title} - {self.task_id} - {self.connected_task_id}"