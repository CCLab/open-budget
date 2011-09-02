from django.conf.urls.defaults import *
from openbudget.budget_site.views import *
from openbudget import settings

urlpatterns = patterns( '',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve',
                             {'document_root': settings.MEDIA_ROOT}),
    (r'^en/(?P<slug_name>[\w-]+)/$', en_page ),
    (r'(?P<slug_name>[\w-]+)/$', page ),
    (r'^$', main ),

)

if settings.DEBUG:
   urlpatterns += patterns('',
       (r'^mymedia/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root':     settings.MEDIA_ROOT}),
   )

