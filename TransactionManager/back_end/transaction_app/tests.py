from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Transaction
from client_app.models import Client
from property_app.models import Property
from lender_app.models import Lender
from inspector_app.models import Inspector
from agent_app.models import Agent
from title_app.models import Title

class transaction_test(TestCase):
    def setUp(self):
        self.new_client = Client.objects.create(
            first_name = "Rosmary",
            mid_init = "D.",
            last_name="Goudyrev",
            phone="760-683-4781",
            email = "rosmary.goudyrev@gmail.com"  
        )
        self.new_property = Property.objects.create(
            street="1775 Lejeune Rd",
            city="Quantico",
            state="VA",
            zip=22134,
            well=True,
            septic=True,
            hoa=True
        )
        self.new_lender = Lender.objects.create(
            first_name="Saul",
            mid_init="",
            last_name="Goodman",
            phone="757 8159674",
            email="saul@goodman.com",
            company="HHM",
        )
        self.new_inspector = Inspector.objects.create(
            first_name="Michael",
            mid_init="A.",
            last_name="Ehrmantraut",
            phone="(202) 555-2432",
            email="mike@yahoo.com",
            company="Los Pollos Locos",
        )
        self.new_agent = Agent.objects.create(
            first_name="Lalo",
            mid_init="",
            last_name="Salamanca",
            phone="(703)555 2432",
            email="lalo2000@cartel.org",
            company="Regalo Helado",
        )
        self.new_title = Title.objects.create(
            first_name="Steven",
            mid_init="S",
            last_name="Tyler",
            phone="754-123-2345",
            email="sst@email.com",
            company="Rocket Mortgage",
        )


    def test_01_create_transaction_instance(self):
        new_transaction = Transaction.objects.create(
            type = "Buy",
            client_id = self.new_client,
            property_id = self.new_property,
            ratify_date = "2023-08-12",
            # closing_date = "2023-09-12",
            price = 449999.99,
            emd_amt = 10000.50,
            emd_days = 7,
            # emd_deadline = 
            # emd_date = "2023-08-18",
            loan_req = True,
            lender_id = self.new_lender,
            title_id = self.new_title,
            inspection_req = True,
            inspection_days = 5,
            inspector_id = self.new_inspector,
            inspection_date = "2023-08-18",
            # inspection_deadline = ,
            buyer_pest_inspection = False,
            pest_inspector_id = self.new_inspector,
            # pest_inspection_date = 
            # well_septic_inspection = 
            # well_septic_inspection_date = 
            well_inspector_id = self.new_inspector,
            septic_inspector_id = self.new_inspector,
            # hoa_documents_received_date =
            # hoa_contingency_days = 
            # hoa_contingency_date = 
            agent_id = self.new_agent,
            notes = "This is a test transaction"
        )
        try:
            new_transaction.full_clean()
            self.assertEqual(Transaction.objects.count(), 1)
        except ValidationError as e:
            self.fail()
