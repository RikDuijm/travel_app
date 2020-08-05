from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

gender_choices = (
    ('optional', 'does it mattter?'),
    ('male', 'male'),
    ('female', 'female'),
)


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    repeat_email = models.EmailField(max_length=99, blank=False)
    gender = models.CharField(max_length=10,
                              choices=gender_choices,
                              default='who cares?')
    age = models.IntegerField(blank=False)

    def __str__(self):
        return f"{self.user.username}'s Profile"
