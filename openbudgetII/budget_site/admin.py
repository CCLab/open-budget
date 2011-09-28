from django.contrib import admin
from django import forms
from ckeditor.widgets import CKEditorWidget
from openbudgetII.budget_site.models import Article, Group, Page, Menu

class ArticleAdminForm(forms.ModelForm):
    body = forms.CharField( 
        widget = CKEditorWidget( config_name = 'body' )
    )
    summary = forms.CharField( 
        widget = CKEditorWidget( config_name = 'summary' )
    )

    class Meta:
        model = Article

class ArticleAdmin( admin.ModelAdmin ):
    form = ArticleAdminForm
    prepopulated_fields = { 'slug' : ( 'title', ) }

class GroupAdmin ( admin.ModelAdmin ):
    prepopulated_fields = { 'slug' : ( 'title', ) }
    filter_horizontal = ( 'articles', )

class PageAdmin ( admin.ModelAdmin ):
    prepopulated_fields = { 'slug' : ( 'title', ) }
    filter_horizontal = ( 'groups', )

class MenuAdmin ( admin.ModelAdmin ): 
    filter_horizontal = ( 'content', )   

admin.site.register( Article, ArticleAdmin )
admin.site.register( Group, GroupAdmin )
admin.site.register( Page, PageAdmin )
admin.site.register( Menu, MenuAdmin )
