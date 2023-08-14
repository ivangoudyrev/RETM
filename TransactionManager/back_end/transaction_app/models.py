from django.db import models
from djmoney.models.fields import MoneyField
from datetime import datetime, timedelta

from agent_app.models import Agent
from client_app.models import Client
from inspector_app.models import Inspector
from lender_app.models import Lender
from title_app.models import Title
from property_app.models import Property
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

    # This function will be used to calculate number of normal or business days from an input date
    @staticmethod
    def add_days(from_date_str, number_of_days, business_days=True):
        # if from_date_str == "":
            # return ""
        # date_format = '%Y-%m-%d'
        # from_date_obj = datetime.strptime(from_date_str, date_format)
        # to_date = from_date_obj
        to_date = from_date_str
        if business_days:
            while number_of_days:
                to_date += timedelta(1)
                if to_date.weekday() < 5: # i.e. is not saturday or sunday
                    number_of_days -= 1
            return to_date
        else:
            to_date += timedelta(number_of_days)
            return to_date

    # This function will set calculated date dependencies
    def save(self, *args, **kwargs):
        self.closing_date = self.add_days(
            from_date_str=self.ratify_date, 
            number_of_days=30, 
            business_days=False
        )
        self.emd_deadline = self.add_days(
            from_date_str=self.ratify_date, 
            # number_of_days=self.emd_days, 
            number_of_days=5,
            business_days=self.emd_business_days
        )
        self.inspection_deadline = self.add_days(
            from_date_str=self.ratify_date, 
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