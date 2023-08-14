from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Property

class property_model_test(TestCase):

    def test01_create_property_instance(self):
        new_property = Property(
            street="1775 Lejeune Rd",
            city="Quantico",
            state="VA",
            zip=22134,
            well=True,
            septic=True,
            hoa=True
        )
        try:
            new_property.full_clean()
            self.assertIsNotNone(new_property)
        except ValidationError as e:
            self.fail()
