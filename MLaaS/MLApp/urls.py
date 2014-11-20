from django.conf.urls import patterns, url, include
from rest_framework.routers import DefaultRouter

import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet,'')


urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    #url(r'^users/$', views.user_list, name="user_list"),
    #url(r'^users/(?P<user_id>[0-9]+)$', views.user_list, name="user_detail"),
    url(r'^experiments/$', 'experiment_list', name="experiment_list"),
    url(r'^experiments/(?P<exp_id>[0-9]+)$', 'experiment_detail', name="experiment_detail"),
    url(r'^components/$', 'component_list', name="component_list"),
    url(r'^components/(?P<comp_id>[0-9]+)$', 'component_detail', name="component_detail"),
)
