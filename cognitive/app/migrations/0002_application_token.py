# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.hashers import make_password
from oauth2_provider.settings import oauth2_settings
from django.db import migrations


def seed_data(apps, schema_editor):
    user_model = apps.get_model('app', 'User')
    admin_user = user_model.objects.create(
        password=make_password('admin'), is_superuser=1, is_staff=1,
        username='admin', email='admin@admin.admin')

    application_model = apps.get_model('oauth2_provider', 'Application')
    application_model.objects.create(
        name='cognitive',
        user_id=admin_user.id,
        client_id='UuGiXEm6FVAqeZr0tra1OEXv2WI8BhZPRbLKOSnY',
        client_type='confidential',
        authorization_grant_type='password',
        client_secret='1rpAxKup939rfvuIj1vN4KRS7HafHw02gFIrKNloCTzPxeoBEKtYdu703P0XEpv6sUWNj4ZIQIRthxaT1WRJzlkxNqXcqjItNGxJuyhPTqMVkJRrdv4wjCS6HLRQAzeW'
    )


class Migration(migrations.Migration):
    dependencies = [
        ('app', '0001_initial'),
        #  Without following line: django.db.utils.OperationalError: no such table: oauth2_provider_application
        migrations.swappable_dependency(oauth2_settings.APPLICATION_MODEL),
    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
