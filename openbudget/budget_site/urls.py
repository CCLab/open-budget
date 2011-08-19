from django.conf.urls.defaults import *
from openbudget.budget_site.views import *

urlpatterns = patterns( '',
    (r'^(?P<slug_name>\w+)/$', page ),
    (r'^$', main ),
)
