from django.core.exceptions import ValidationError
import re

def validate_name(name):
    error_message = "Improper name format"
    regex = r'^[a-z ,.\'-]+$' #characters allowed: a-z, spaces, periods, apostrophe, dashes, case-insensitive
    good_name = re.match(regex, name, re.IGNORECASE)

    if good_name:
        return name
    else:
        raise ValidationError(error_message, params={'name':name})

def validate_phone(phone):
    error_message = "improper phone format"
    regex = r'^.?[0-9]{3}.?.?[0-9]{3}.?[0-9]{4}$' #a very liberal requirement.  As long as there is a set or 3-3-4 digits together, it doesn't matter what separates them
    good_phone = re.match(regex, phone)

    if good_phone:
        return phone
    else:
        raise ValidationError(error_message, params={'phone':phone})

def zip_validator(zip):
    error_message = "improper zip format"
    regex = r'^\d{5}(-\d{4})?$' #takes either a 5-digit zip or a 9-digit, separated by a dash or space
    good_zip = re.match(regex, zip)

    if good_zip:
        return zip
    else:
        raise ValidationError(error_message, params={'zip':zip})