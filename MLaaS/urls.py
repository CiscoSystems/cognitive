from django.conf.urls import patterns, include, url
from MLApp import views, urls

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name="home"),
    url(r'^whiteboard$', views.whiteboard, name="whiteboard"),
    url(r'^api/v1/',include(urls)),
)
