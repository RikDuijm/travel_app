# Generated by Django 3.0.8 on 2020-08-14 11:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('customers', '0005_auto_20200814_1143'),
    ]

    operations = [
        migrations.AddField(
            model_name='touroperator',
            name='test',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='touroperator',
            name='touroperator',
            field=models.CharField(max_length=30),
        ),
    ]
