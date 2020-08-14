from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField


class Touroperator(models.Model):
    touroperator = models.OneToOneField(User, on_delete=models.CASCADE)
    name_contact_person = models.CharField(max_length=30, blank=False)
    telephone = models.CharField(max_length=30, blank=False)
    address = models.CharField(max_length=30, blank=False)
    postal_code = models.CharField(max_length=7, blank=False)
    city = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return f"{self.touroperator.username}"


DESTINATION_CHOICES = (
    ('Lima', 'Lima'),
    ('Arequipa', 'Arequipa'),
    ('Puno', 'Puno'),
    ('Cusco', 'Cusco'),

)


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    touroperator = models.ForeignKey(Touroperator,
                                     null=True,
                                     on_delete=models.CASCADE,
                                     default=1)
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    repeat_email = models.EmailField(max_length=99, blank=False)
    age = models.IntegerField(blank=False)
    number_of_persons = models.IntegerField(blank=False, null=True)
    destinations = MultiSelectField(null=True, choices=DESTINATION_CHOICES)

    def __str__(self):
        return f"{self.user.username}"
