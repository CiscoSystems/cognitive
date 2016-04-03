# Copyright 2015 Cisco Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.


"""
Django settings for cognitive project.
"""

import os


PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '09iat*t%$*l7$3d0)_0*x0*cx356q+il96ivgp15hr!qr5y7-8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True
TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, 'cognitive/app/templates'),
)

TEMPLATE_LOADERS = (
    'django.template.loaders.eggs.Loader',
)

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'djangobower',
    'compressor',
    # 'corsheaders',
    'oauth2_provider',
    'rest_framework',
    'rest_framework_swagger',
    'cognitive.app',
)

MIDDLEWARE_CLASSES = (
    # 'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'cognitive.urls'

WSGI_APPLICATION = 'cognitive.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(PROJECT_ROOT, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# 'local' for local processing; 'storm' for storm processing
CLUSTER_TYPE = 'local'

# Settings required if cluster type is storm. Specify Redis host and Port

DRPC_HOST = 'bd-1-3'
REDIS_HOST = "bd-1-3"
REDIS_PORT = "6379"

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# STATICFILES_DIRS = [
#     (os.path.join(PROJECT_ROOT + '/cognitive/app', "static")),
# ]

STATIC_ROOT = os.path.join(PROJECT_ROOT + '/cognitive/app', "static")
COMPRESS_ENABLED = True

# Swagger Documentation Setting
SWAGGER_SETTINGS = {
    'exclude_namespaces': [],
    'api_version': '1.0',
    'api_path': '/',
    'enabled_methods': [
        'get',
        'post',
        'put',
        'delete'
    ],
    'api_key': '',
    'is_authenticated': False,
    'is_superuser': False,
    'permission_denied_handler': None,
    'info': {
        'description': 'Cognitive API Documentation',
        'license': 'Apache 2.0',
        'licenseUrl': 'http://www.apache.org/licenses/LICENSE-2.0.html',
        'title': 'Cognitive - Machine Learning as a Service (MLaaS)',
    },
    'doc_expansion': 'none',
}

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.tz',
    'django.contrib.messages.context_processors.messages',
    'django.core.context_processors.request'
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'djangobower.finders.BowerFinder',
    'compressor.finders.CompressorFinder',
)

BOWER_COMPONENTS_ROOT = os.path.join(PROJECT_ROOT, 'components')

BOWER_INSTALLED_APPS = (
    'angular#~1.5.0',
    'angular-bootstrap#~0.13.4',
    'angular-cookies#~1.4.7',
    'angular-material#~1.0.5',
    'angular-material-data-table',
    'angular-material-icons',
    'angular-nvd3',
    'angular-resource',
    'angular-ui-router',
    'bootstrap',
    'd3#3.5.13',
    'font-awesome#4.4.0',
    'jquery',
    'jquery-csv',
    'ng-file-upload',
    'ngDraggable#0.1.8',
    'underscore#~1.8.3',
)

COMPRESS_PRECOMPILERS = (
    ('text/x-scss', 'django_libsass.SassCompiler'),
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.ext.rest_framework.OAuth2Authentication',
    ),
}

OAUTH2_PROVIDER = {
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope', 'groups': 'Access to your groups'}
}

# COGNITIVE_CLIENT_ID = "Gbe1ZEIiHrtVVIojTqRCyV1tNeMMYC5kTMOHuMkQ"
#
# COGNITIVE_CLIENT_SECRET = "cRsoHn8Yh9a138aE3s9WBy8hsyclHEs1SQy4jui2x6BT5KWcmdhrQ7mqOcEk9IsR3QArU5u0FnansVWkCV3wbov5TwK76LGGcxDSftLvYEaTLYrVaxKDqgzMrScwZNKe"
#
# OAUTH_URL = "http://localhost:8000/oauth/token/"

AUTH_USER_MODEL = 'app.User'

