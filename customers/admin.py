from django.contrib import admin
from .models import Touroperator, Customer


class CustomerInline(admin.TabularInline):
    model = Customer


class TouroperatorAdmin(admin.ModelAdmin):
    inlines = [
        CustomerInline,
    ]


admin.site.register(Customer)
admin.site.register(Touroperator, TouroperatorAdmin)
