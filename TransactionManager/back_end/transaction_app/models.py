from django.db import models
from djmoney.models.fields import MoneyField
from datetime import datetime, timedelta

from django.db.models.signals import post_save
from django.dispatch import receiver

from agent_app.models import Agent
from client_app.models import Client
from inspector_app.models import Inspector
from lender_app.models import Lender
from title_app.models import Title
from property_app.models import Property
from user_app.models import User
from taskmenu_app.models import Taskmenu
from subtaskmenu_app.models import Subtaskmenu

from django.core import validators as v

class Transaction(models.Model):
    # Primary Transaction Information
    type = models.CharField(
        max_length=4
    )
    client_id = models.ForeignKey(
        Client, 
        on_delete=models.CASCADE, 
        related_name='transactions',
    )
    property_id = models.ForeignKey(
        Property, 
        on_delete=models.CASCADE, 
        related_name='transactions',
    )
    ratify_date = models.DateTimeField(
        # default=datetime.today(), #should this be pre-populated?
    )
    closing_date = models.DateTimeField(
        null=True,
        blank=True
    ) #ratify_date +30 per function below
    price = MoneyField(
        decimal_places=2,
        default=0,
        default_currency='USD',
        max_digits=11
    )
    
    # Earnest Money Deposit data fields
    emd_amt = models.DecimalField(
        decimal_places=2,
        default=0,
        max_digits=8,
    )
    emd_days = models.PositiveIntegerField(
        default=5,
        validators=[v.MinValueValidator(1), v.MaxValueValidator(10)] #cannot be more than 10 days
    )
    emd_business_days = models.BooleanField(
        default = True
    )
    emd_deadline = models.DateTimeField(
        null=True,
        blank=True
    )
    emd_date = models.DateTimeField(
        null=True,
        blank=True
    ) #ratify_date +emd_days per function below
    # emd_received = models.BooleanField(default=False) #completion should be on Task model

    # Loan fields
    loan_req = models.BooleanField(default=True)
    lender_id = models.ForeignKey(
        Lender, 
        on_delete=models.CASCADE, 
        related_name='transactions',
    )
    # appraisal_complete = models.BooleanField(default=False) #completion should be on Task model
    # clear_to_close = models.BooleanField(default=False) #completion should be on Task model

    # Title company fields
    title_id = models.ForeignKey(
        Title, 
        on_delete=models.CASCADE, 
        related_name='transactions',
    )

    # Inspection fields
    inspection_req = models.BooleanField(default=True)
    inspection_days = models.IntegerField(
        default=3,
        validators=[v.MinValueValidator(1), v.MaxValueValidator(10)] #cannot be more than 10 days
    )
    inspection_business_days = models.BooleanField(
        default = True
    )
    inspector_id = models.ForeignKey(
        Inspector, 
        on_delete=models.CASCADE, 
        related_name='home_inspection_transactions',
        null=True, #set for testing
        blank=True, #set for testing
    )
    inspection_deadline = models.DateTimeField(
        null=True,
        blank=True
    )
    inspection_date = models.DateTimeField(
        null=True, #set for testing
        blank=True, #set for testing
    ) #day of scheduled inspections
    # inspection_complete = models.BooleanField() #completion should be on Task model
    buyer_pest_inspection = models.BooleanField(
        default=False
    )
    pest_inspector_id = models.ForeignKey(
        Inspector, 
        on_delete=models.CASCADE, 
        related_name='pest_inspection_transactions',
        null=True,
        blank=True
    )
    pest_inspection_date = models.DateTimeField(
        null=True,
        blank=True,
    )
    well_inspection = models.BooleanField(
        default=False,
        null=True,
        blank=True
    )
    well_inspection_date = models.DateTimeField(
        null=True,
        blank=True
    )
    well_inspector_id = models.ForeignKey(
        Inspector, 
        on_delete=models.CASCADE, 
        related_name='well_inspection_transactions',
        null=True,
        blank=True
    )
    septic_inspection = models.BooleanField(
        default=False,
        null=True,
        blank=True
    )
    septic_inspection_date = models.DateTimeField(
        null=True,
        blank=True
    )
    septic_inspector_id = models.ForeignKey(
        Inspector, 
        on_delete=models.CASCADE, 
        related_name='septic_inspection_transactions',
        null=True,
        blank=True
    )

    #  HOA Contingency fields
    hoa_documents_received_date = models.DateTimeField(
        null=True,
        blank=True,
    )
    # hoa_violations_cleared = models.BooleanField() #this belongs in the Tasks model
    hoa_documents_contingency_date = models.DateTimeField(
        blank = True,
        null = True,
    )

    # Seller's Agent Info
    agent_id = models.ForeignKey(
        Agent, 
        on_delete=models.CASCADE, 
        related_name='transactions',
    )

    # Miscellaneous Info
    notes = models.TextField(
        null=True,
        blank=True
    )
    closed = models.BooleanField(
        default=False
    )
    archived = models.BooleanField(
        default=False
    )
    user_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='transactions'
    )

    # This function will be used to calculate number of normal or business days from an input date
    @staticmethod
    def add_days(from_date, number_of_days, business_days=True):
        number_of_days_int = int(number_of_days)
        if isinstance(from_date, str):
            datetime_format = '%Y-%m-%dT%H:%M'
            from_date = datetime.strptime(from_date, datetime_format)
        
        # if from_date_str == "":
            # return ""
        # date_format = '%Y-%m-%d'
        # from_date_obj = datetime.strptime(from_date_str, date_format)
        # to_date = from_date_obj
        to_date = from_date
        if business_days:
            while number_of_days_int:
                to_date += timedelta(1)
                if to_date.weekday() < 5: # i.e. is not saturday or sunday
                    number_of_days_int -= 1
            return to_date
        else:
            to_date += timedelta(number_of_days_int)
            return to_date

    # This function will set calculated date dependencies
    def save(self, *args, **kwargs):
        # self.closing_date = self.add_days(
        #     from_date=self.ratify_date, 
        #     number_of_days=30, 
        #     business_days=False
        # )
        self.emd_deadline = self.add_days(
            from_date=self.ratify_date, 
            # number_of_days=self.emd_days, 
            number_of_days=self.emd_days,
            business_days=self.emd_business_days
        )
        self.inspection_deadline = self.add_days(
            from_date=self.ratify_date, 
            number_of_days=self.inspection_days, 
            business_days=self.inspection_business_days
        )
        super().save(*args, **kwargs)
    
    # This function will be called to set a contingency later in the transaction timeframe
    def set_hoa_contingency(self, hoa_documents_received_date):
        hoa_contingency_days = 3
        self.hoa_documents_received_date = hoa_documents_received_date
        self.hoa_documents_contingency_date = self.add_days(from_date_str=self.hoa_documents_received_date, number_of_days=hoa_contingency_days, business_days=True)
        self.save()

    def __str__(self):
        if self.closed:
            return f"{self.property_id} - {self.type} - {self.closing_date}"
        else:
            return f"PENDING: {self.property_id} - {self.type}"

# This function copies a set of default tasks/subtasts from the TaskMenu and SubtaskMenu on Transaction instance creation
@receiver(post_save, sender=Transaction)
def copy_default_tasks(sender, instance, created, **kwargs):
    if created:
        print("Transaction Created!")
        default_tasks = Taskmenu.objects.all()

        # First pass: Create all Task objects and populate the task_mapping
        task_mapping = {}
        for task_item in default_tasks:
            new_task = instance.tasks.create(
                type=task_item.type, 
                title=task_item.title,
                details=task_item.details,
                essential=True,
                transaction_id=instance,
                user_id=instance.user_id,
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
                    # type=subtask_item.type,
                    title=subtask_item.title,
                    details=subtask_item.details,
                    task_id=new_task,
                    connected_task_id=connected_task,
                )