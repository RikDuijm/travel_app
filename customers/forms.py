from django import forms
from django.contrib.auth.models import User  # import the user model provided by Django
from django.contrib.auth.forms import UserCreationForm  # this is a base form that Django provides/ gives user names and emails
from django.core.exceptions import ValidationError  # import ValidationError
from .models import Customer


class UserLoginForm(forms.Form):
    """Form to be used to log users in"""
    username = forms.CharField(label="Please enter your Username")
    password = forms.CharField(label="Please enter your Password", widget=forms.PasswordInput)


class UserRegistrationForm(UserCreationForm):
    """Form used to register a new user"""
    password1 = forms.CharField(
            label="Password",
            widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password Confirmation",  # label is visable for user
        widget=forms.PasswordInput)

    class Meta:
        """An inner class  or meta class will provide some information about the form.
        Specify the model that we want store information in and to specify the fields that we're going to expose."""
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        if User.objects.filter(email=email).exclude(username=username):
            raise forms.ValidationError(u'Email address must be unique')
        return email

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if not password1 or not password2:
            raise ValidationError("Please confirm your password")
        if password1 != password2:
            raise ValidationError("Passwords must match")
        return password2


class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['touroperator', 'first_name', 'last_name', 'repeat_email', 'age',
                  'number_of_persons', 'destinations'
                  ]
