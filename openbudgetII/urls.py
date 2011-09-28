from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'openbudgetII.views.home', name='home'),
    # url(r'^openbudgetII/', include('openbudgetII.foo.urls')),

    # url path for ckeditor
    url(r'^ckeditor/', include('ckeditor.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
