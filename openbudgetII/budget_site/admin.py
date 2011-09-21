from django.contrib import admin
from openbudgetII.budget_site.models import Article, Group, Page, Menu

class ArticleAdmin( admin.ModelAdmin ):
    prepopulated_fields = { "slug" : ( "title", ) }

class GroupAdmin ( admin.ModelAdmin ):
    prepopulated_fields = { "slug" : ( "title", ) }
    filter_horizontal = ( 'articles', )

class PageAdmin ( admin.ModelAdmin ):
    prepopulated_fields = { "slug" : ( "title", ) }
    filter_horizontal = ( 'groups', )

class MenuAdmin ( admin.ModelAdmin ): 
    filter_horizontal = ( 'content', )   

admin.site.register( Article, ArticleAdmin )
admin.site.register( Group, GroupAdmin )
admin.site.register( Page, PageAdmin )
admin.site.register( Menu, MenuAdmin )
