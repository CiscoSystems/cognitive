from django.conf.urls import patterns, url, include
from rest_framework.routers import DefaultRouter

from view import view_user, view_exp, view_operation, view_workflow, view_result

router = DefaultRouter()
router.register(r'users', view_user.UserViewSet,'')
router.register(r'experiments', view_exp.ExperimentViewSet,'')
router.register(r'workflows', view_workflow.WorkFlowViewSet,'')
router.register(r'results', view_result.ResultViewSet,'')
router.register(r'operations/(?P<operation>\w+)', view_operation.OperationViewSet,'')


urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    #url(r'^operation/(?P<operation>\w+)/$', view_component.data_operation_list, name="data_operation_list" ),
    #url(r'^operation/(?P<operation>\w+)/(?P<pk>\d+)$', view_component.data_operation_detail, name="data_operation_detail"),
    #url(r'^component/(?P<component_type>\w+)/(?P<comp_id>\d+)/(?P<operation>\w+)/$', view_component.component_operation_list, name="component_operation_list"),
    #url(r'^component/(?P<component_type>\w+)/(?P<comp_id>\d+)/(?P<operation>\w+)/(?P<pk>\d+)/$', view_component.component_operation_detail, name="component_operation_detail"),
)
