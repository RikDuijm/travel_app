from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('', views.naturandes, name='naturandes'),
    path('customers/registration', views.registration, name='registration'),
    path('customer/touroperator', views.touroperator, name='touroperator'),
    path('customer/logout', views.logout, name='logout'),
    path('customer/login', views.login, name='login'),
    re_path('activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})', views.activate, name='activate'),
]