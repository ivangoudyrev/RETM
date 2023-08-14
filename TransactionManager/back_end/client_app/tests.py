from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Client

class name_test(TestCase):

    def test_01_create_client_instance(self):
        new_client = Client(
            first_name = "Ivan",
            mid_init = "O.",
            last_name="Goudyrev",
            phone="760-683-4186",
            email = "ivan.goudyrev@gmail.com"
        )
        try:
            new_client.full_clean()
            self.assertIsNotNone(new_client)
        except ValidationError as e:
            # print("except reached")
            # print(new_client)
            # print(e.message_dict)
            self.fail()

    def test_02_create_client_blank_first_name(self):
        new_client = Client(
            first_name = "",
            mid_init = "O.",
            last_name="Goudyrev",
            phone="760-683-4186",
            email = "ivan.goudyrev@gmail.com"
        )
        try:
            new_client.full_clean()
            self.fail()
        except ValidationError as e:
            # print(e.message_dict)
            self.assertTrue('This field cannot be blank.' in e.message_dict['first_name'])
    
    def test_03_create_client_with_suffixes(self):
        new_client = Client(
            first_name = "Herbert",
            mid_init = "Henry",
            last_name="Van Dyke Jr. III Esq.",
            phone="760-683-4186",
            email = "vandyke14@cox.net"
        )
        try:
            new_client.full_clean()
            self.assertIsNotNone(new_client)
        except ValidationError as e:
            self.fail()

    def test_04_create_client_with_blank_email(self):
        new_client = Client(
            first_name = "Ivan",
            mid_init = "O.",
            last_name="Goudyrev",
            phone="760-683-4186",
            email = "760-683-4186"
        )
        try:
            new_client.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue('Enter a valid email address.' in e.message_dict['email'])