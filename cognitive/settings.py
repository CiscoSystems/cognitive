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

import xstatic.main
import xstatic.pkg.bootstrap
import xstatic.pkg.d3
import xstatic.pkg.font_awesome
import xstatic.pkg.jquery
import xstatic.pkg.jquery_ui

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '09iat*t%$*l7$3d0)_0*x0*cx356q+il96ivgp15hr!qr5y7-8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True
TEMPLATE_DIRS = (
    os.path.join(BASE_DIR + '/cognitive/app', 'templates'),
)

TEMPLATE_LOADERS = (
    'hamlpy.template.loaders.HamlPyFilesystemLoader',
    'hamlpy.template.loaders.HamlPyAppDirectoriesLoader',
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
    # 'djangobower',
    'rest_framework',
    'cognitive.app',
    'rest_framework_swagger',
)

MIDDLEWARE_CLASSES = (
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
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
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


def get_staticfiles_dirs(webroot='/'):
    """Get the value which is for STATICFILES_DIRS option of Django project

    :param webroot: the root url of static files
    :return: the list of file path for static files
    """
    static_files_dirs = [
        ('lib/bootstrap',
         xstatic.main.XStatic(xstatic.pkg.bootstrap, root_url=webroot).base_dir),
        ('lib/d3',
         xstatic.main.XStatic(xstatic.pkg.d3, root_url=webroot).base_dir),
        ('lib/font-awesome',
         xstatic.main.XStatic(xstatic.pkg.font_awesome, root_url=webroot).base_dir),
        ('lib/jquery',
         xstatic.main.XStatic(xstatic.pkg.jquery, root_url=webroot).base_dir),
        ('lib/jquery-ui',
         xstatic.main.XStatic(xstatic.pkg.jquery_ui, root_url=webroot).base_dir)
    ]

    return static_files_dirs


STATICFILES_DIRS = get_staticfiles_dirs()
STATICFILES_DIRS.append((os.path.join(BASE_DIR + '/cognitive/app', "static")))


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