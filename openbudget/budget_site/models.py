from django.db import models
from django.contrib import admin


class Shorts( models.Model ):
    title = models.CharField( max_length = 150 )
    body = models.TextField()
    index = models.IntegerField()   

    def __unicode__( self ):
        return self.title
        
        
class ShortsInLine( admin.TabularInline ):
    model = Shorts
    raw_id_fields = ("title",)


class ShortAdmin( admin.ModelAdmin ):
    list_display = ( 'title', )


class Page( models.Model ):
    title = models.CharField( max_length = 150 )
    url_title = models.CharField( max_length = 80 )
    short = models.ManyToManyField( Shorts )




class PageAdmin( admin.ModelAdmin ):
    list_display = ( 'title', 'url_title',  )
#    inlines = [
#        Page.short,
#    ]
 
class Article( models.Model ):
    title = models.CharField( max_length = 150 )
    url_title = models.CharField( max_length = 80 )
    body = models.TextField()
    
admin.site.register( Shorts, ShortAdmin )
admin.site.register( Page, PageAdmin )
admin.site.register( Article )    
