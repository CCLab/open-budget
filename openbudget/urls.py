from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'openbudget.views.home', name='home'),
    # url(r'^openbudget/', include('openbudget.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('openbudget.budget_site.urls')),
    url(r'^tiny_mce/(?P<path>.*)$', 'django.views.static.serve',
                 { 'document_root': '/mymedia/js/tiny_mce/' }),
    url(r'', include('django.contrib.flatpages.urls')),
)
