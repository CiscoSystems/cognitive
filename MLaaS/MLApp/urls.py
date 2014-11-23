from django.conf.urls import patterns, url, include
from rest_framework.routers import DefaultRouter

from view import view_user, view_exp, view_component

router = DefaultRouter()
router.register(r'users', view_user.UserViewSet,'')
router.register(r'experiments', view_exp.ExperimentViewSet,'')


urlpatterns = patterns('',
    #url(r'^', include(router.urls)),
    url(r'^operations/(?P<operation>\w+)/$', view_component.operation_list, name="operation_list" ),
    url(r'^operations/(?P<operation>\w+)/(?P<pk>\d+)$', view_component.operation_detail, name="operation_detail"),
    url(r'^components/$', 'component_list', name="component_list"),
    url(r'^components/(?P<comp_id>[0-9]+)$', 'component_detail', name="component_detail"),
)
