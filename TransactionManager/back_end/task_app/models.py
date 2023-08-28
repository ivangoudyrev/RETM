from django.db import models
# from tasklist_app.models import Tasklist
from transaction_app.models import Transaction
from user_app.models import User

# Create your models here.
class Task(models.Model):
    type = models.CharField(max_length=4)
    title = models.CharField(max_length=100)
    details = models.TextField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    complete = models.BooleanField(default=False)
    essential = models.BooleanField(default=False)
    notes = models.TextField(null=True, blank=True)
    # tasklist_id = models.ForeignKey(
    #     Tasklist,
    #     on_delete=models.CASCADE,
    #     related_name='tasklist'
    # )
    user_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tasks"
    )
    transaction_id = models.ForeignKey(
        Transaction,
        on_delete=models.CASCADE,
        related_name='tasks'
    )

    def __str__(self):
        return f"{self.title} {self.tasklist_id}"

    def save(self, *args, **kwargs):
        if self.due_date is None:
            self.due_date = self.transaction_id.ratify_date
        super(Task,self).save(*args, **kwargs)