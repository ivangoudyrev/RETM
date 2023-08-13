from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Agent

class agent_model_test(TestCase):

    def test01_create_agent_instance(self):
        new_agent = Agent(
            first_name="Lalo",
            mid_init="",
            last_name="Salamanca",
            phone="(703)555 2432",
            email="lalo2000@cartel.org",
            company="Regalo Helado",
        )
        try:
            new_agent.full_clean()
            self.assertIsNotNone(new_agent)
        except ValidationError as e:
            self.fail()
