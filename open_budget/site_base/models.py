from django.db import models
from django.contrib import admin

class News( models.Model ):
    date = models.DateField()
    title = models.CharField( max_length = 150 )
    body = models.TextField()

class NewsAdmin( admin.ModelAdmin ):
    list_display = ( 'title', 'date' )

    

class Page( models.Model ):
   title = models.CharField(max_length = 150 )

#class PageAdmin( admin.ModelAdmin ):
#    list_display = ( 'title', 'short' )

class Shorts( models.Model ):
    title = models.CharField(max_length = 150 )
    body = models.TextField()
    index = models.IntegerField()
#    page = models.ForeignKey( Page )
    
class ShortsAdmin( admin.ModelAdmin ):
    list_display = ( 'title', 'body', 'index' )




admin.site.register( Shorts, ShortsAdmin )
admin.site.register( News, NewsAdmin )
# TODO
#admin.site.register( Page )

