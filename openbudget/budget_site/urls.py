from django.conf.urls.defaults import *
from openbudget.budget_site.views import *
from openbudget import settings

urlpatterns = patterns( '',
    # static files
    (r'^media/(?P<path>.*)$', 'django.views.static.serve',
                             {'document_root': settings.MEDIA_ROOT}),

    # ajax url for getting data and parents info from raw salad
    (r'^get_data/$', get_data ),
    (r'^get_parent/$', get_parent ),

    # english version
    (r'^en/(?P<slug_name>[\w-]+)/$', en_page ),
    # pages
    (r'(?P<slug_name>[\w-]+)/$', page ),
    # main page
    (r'^$', main ),

)

if settings.DEBUG:
   urlpatterns += patterns('',
       (r'^mymedia/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root':     settings.MEDIA_ROOT}),
   )

