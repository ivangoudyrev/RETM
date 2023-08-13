from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Lender

class lender_model_test(TestCase):

    def test01_create_lender_instance(self):
        new_lender = Lender(
            first_name="Saul",
            mid_init="",
            last_name="Goodman",
            phone="757 8159674",
            email="saul@goodman.com",
            company="HHM",
        )
        try:
            new_lender.full_clean()
            self.assertIsNotNone(new_lender)
        except ValidationError as e:
            self.fail()
