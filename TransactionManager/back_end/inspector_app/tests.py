from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Inspector

class inspector_model_test(TestCase):

    def test01_create_inspector_instance(self):
        new_inspector = Inspector(
            first_name="Michael",
            mid_init="A.",
            last_name="Ehrmantraut",
            phone="(202) 555-2432",
            email="mike@yahoo.com",
            company="Los Pollos Locos",
        )
        try:
            new_inspector.full_clean()
            self.assertIsNotNone(new_inspector)
        except ValidationError as e:
            self.fail()
