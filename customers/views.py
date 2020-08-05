from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.contrib import auth, messages
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.db.models import Q  # for searches on several fields of model
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import UserLoginForm, UserRegistrationForm, CustomerForm
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.


# def index(request):
#     """ Display the customer's page"""

#     template = 'login.html'
#     context = {}

#     return render(request, template, context)


@ensure_csrf_cookie
def index(request):
    """Return a login page"""
    if request.user.is_authenticated:
        return render(request, 'touroperator.html', {})
    if request.method == "POST":
        login_form = UserLoginForm(request.POST)
        # if request method is equal to POST then create an instance
        # of the user login form, so a new login form will be created
        # with the data posted from the form on the UI check if data is valid.
        if login_form.is_valid():
            # this will authenticate the user, whether or not this user has
            # provided the username and password
            user = auth.authenticate(username=request.POST['username'],
                                     password=request.POST['password'])
            if user:
                # Then the authenticate function will return a user object.
                # If there's a user,  we'll log him in.
                auth.login(user=user, request=request)
                return render(request, 'touroperator.html', {})
            else:
                login_form.add_error(None,
                                     "Your username or password is incorrect.")
    else:
        login_form = UserLoginForm()
    return render(request, 'login.html', {'login_form': login_form})


@login_required 
def touroperator(request):
    """Return a login page"""
    return render(request, 'touroperator.html', {})


@ensure_csrf_cookie
def registration(request):
    """Render the registration page"""
    if request.user.is_authenticated:
        # User is already registered, so no point to be on registration page.
        return redirect(reverse('index'))

    if request.method == "POST":
        # Check of the method is post. If so instantiate the registration and
        # customer forms, using the values of the request post method.
        registration_form = UserRegistrationForm(request.POST)
        # request.Files to upload customer pic.
        customer_form = CustomerForm(request.POST, request.FILES)
        # If registration form is valid, safe it
        if registration_form.is_valid() and customer_form.is_valid():
            user = registration_form.save(commit=False)
            # To add the user to this customer, use commit=False to not
            # safe the customer to database right away.
            customer = customer_form.save(commit=False)
            # Refers to models.user and makes sure that one user only
            # has one customer
            user.is_active = False
            user.save()

            customer.user = user
            customer.save()
            current_site = get_current_site(request)
            mail_subject = 'Activate your account.'
            message = render_to_string('acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),  # .decode(),
                'token': account_activation_token.make_token(user),
            })
            print('email')
            to_email = registration_form.cleaned_data.get('email')
            email = EmailMessage(
                        mail_subject, message, to=[to_email]
            )
            email.send()
            return HttpResponse('Please confirm your email address to complete the registration')
            # user = auth.authenticate(username=request.POST['username'],
            #                          password=request.POST['password1'])
            # if user:
            #     auth.login(user=user, request=request)
            #     # Send message to user that he has registered
            #     # successfully or not.
            #     messages.success(request,
            #                      "You have successfully registered and are logged in.")
            #     return render(request, 'touroperator.html', {})
            #     # redirect(reverse('touroperator'))

            # else:
            #     messages.error(request,
            #                    "Unable to register your account at this time")
    else:
        # Else statement in case it's a get method. An empty registration form
        # is instantiated.
        registration_form = UserRegistrationForm()
        customer_form = CustomerForm()

    return render(request, 'registration.html', {
        "registration_form": registration_form,
        "customer_form": customer_form})


@login_required 
def logout(request):
    """Log the user out"""
    auth.logout(request)
    messages.success(request, "You have successfully been logged out")
    return redirect(reverse('index'))


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')

