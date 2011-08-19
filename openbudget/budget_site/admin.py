from django.contrib import admin
from openbudget.budget_site.models import Shorts, Page, Article

class PageAdmin( admin.ModelAdmin ):
    prepopulated_fields = { "slug" : ( "title", ) }

class ArticleAdmin ( admin.ModelAdmin ):
    prepopulated_fields = { "slug" : ( "title", ) }

admin.site.register( Shorts )
admin.site.register( Page, PageAdmin )
admin.site.register( Article, ArticleAdmin )
