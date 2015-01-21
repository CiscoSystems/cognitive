"""
Django settings for MLaaS project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '09iat*t%$*l7$3d0)_0*x0*cx356q+il96ivgp15hr!qr5y7-8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True
TEMPLATE_DIRS = (
    os.path.join(BASE_DIR+'/MLaaS/MLApp', 'templates'),
)

TEMPLATE_LOADERS = (
    
        'hamlpy.template.loaders.HamlPyFilesystemLoader',
        'hamlpy.template.loaders.HamlPyAppDirectoriesLoader'
    
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
    'rest_framework',
    'MLaaS.MLApp',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'MLaaS.urls'

WSGI_APPLICATION = 'MLaaS.wsgi.application'


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


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR+'/MLaaS/MLApp', "static"),
)

# STATICFILES_FINDERS = (
#     'djangobower.finders.BowerFinder',
# )

# BOWER_COMPONENTS_ROOT = os.path.join(BASE_DIR+'/MLaaS/MLApp/static', 'bower_components')

# BOWER_INSTALLED_APPS = (
#     'bootstrap-material-design',
# )

# 'local' for local processing; 'storm' for storm processing
CLUSTER_TYPE = 'local'

#Settings required if cluster type is storm. Specify Redis host and Port

DRPC_HOST = 'bd-1-3'
REDIS_HOST = "bd-1-3"
REDIS_PORT = "6379"
