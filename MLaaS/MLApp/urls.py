from django.conf.urls import patterns,url
import views
urlpatterns = patterns('',
    url(r'^users/$', views.user_list, name="user_list"),
    #url(r'^users/(?P<user_id>[0-9]+)$', 'user_detail', name="user_detail"),
    #url(r'^experiments/$', 'experiment_list', name="experiment_list"),
    #url(r'^experiments/(?P<exp_id>[0-9]+)$', 'experiment_detail', name="experiment_detail"),
    #url(r'^components/$', 'component_list', name="component_list"),
    #url(r'^components/(?P<comp_id>[0-9]+)$', 'component_detail', name="component_detail"),
)
