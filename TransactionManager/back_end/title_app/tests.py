from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Title

class title_model_test(TestCase):

    def test01_create_title_instance(self):
        new_title = Title(
            first_name="Steven",
            mid_init="S",
            last_name="Tyler",
            phone="754-123-2345",
            email="sst@email.com",
            company="Rocket Mortgage",
        )
        try:
            new_title.full_clean()
            self.assertIsNotNone(new_title)
        except ValidationError as e:
            self.fail()
