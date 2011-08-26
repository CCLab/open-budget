from django.contrib import admin
from openbudget.budget_site.models import Shorts, Page, Article

class PageAdmin( admin.ModelAdmin ):
    prepopulated_fields = { "slug" : ( "title", ) }

    class Media:
        js = ('/mymedia/js/tiny_mce/tiny_mce.js',
              '/mymedia/js/textareas.js',)

class ArticleAdmin ( admin.ModelAdmin ):
    prepopulated_fields = { "slug" : ( "title", ) }

    class Media:
        js = ('/mymedia/js/tiny_mce/tiny_mce.js',
              '/mymedia/js/textareas.js',)

class ShortsAdmin( admin.ModelAdmin ):
    
    class Media:
        js = ('/mymedia/js/tiny_mce/tiny_mce.js',
              '/mymedia/js/textareas.js',) 


admin.site.register( Shorts, ShortsAdmin )
admin.site.register( Page, PageAdmin )
admin.site.register( Article, ArticleAdmin )
