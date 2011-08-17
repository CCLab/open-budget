from django.conf.urls.defaults import *
from open_budget.site_base.views import * 


urlpatterns = patterns( '',
    (r'^(?P<page_name>\w+)/$', page ),
    (r'^$', main ),  
    #(r'^', include('open_budget.site_base.urls')),
)
