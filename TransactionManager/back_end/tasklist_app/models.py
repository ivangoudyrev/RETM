from django.db import models
from transaction_app.models import Transaction
from taskmenu_app.models import Taskmenu
from subtaskmenu_app.models import Subtaskmenu

from django.db.models.signals import post_save
from django.dispatch import receiver

class Tasklist(models.Model):
    transaction_id = models.OneToOneField(
        Transaction,
        on_delete=models.CASCADE,
        related_name='tasklist',
    )

    def __str__(self):
        return f"Task List for {self.transaction_id}"

@receiver(post_save, sender=Tasklist)
def copy_default_tasks(sender, instance, created, **kwargs):
    if created:
        default_tasks = Taskmenu.objects.all()

        # First pass: Create all Task objects and populate the task_mapping
        task_mapping = {}
        for task_item in default_tasks:
            new_task = instance.tasks.create(
                title=task_item.title,
                details=task_item.details,
                tasklist_id=instance,
                essential=True,
                notes="",
            )
            task_mapping[task_item.id] = new_task

        # Second pass: Create Subtask objects using the task_mapping for connected_task_id
        for task_item in default_tasks:
            new_task = task_mapping[task_item.id]
            default_subtasks = Subtaskmenu.objects.filter(task_id=task_item)
            for subtask_item in default_subtasks:
                connected_task = None
                if subtask_item.connected_task_id:
                    connected_task = task_mapping.get(subtask_item.connected_task_id.id)

                new_task.subtasks.create(
                    type=subtask_item.type,
                    title=subtask_item.title,
                    details=subtask_item.details,
                    task_id=new_task,
                    connected_task_id=connected_task,
                )