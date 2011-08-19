from django.db import models

class Shorts( models.Model ):
    title = models.CharField( max_length = 150 )
    body = models.TextField()
    index = models.IntegerField()   

    def __unicode__( self ):
        return self.title

class Page( models.Model ):
    title = models.CharField( max_length = 150 )
    slug = models.SlugField(max_length=150, unique=True )
    short = models.ManyToManyField( Shorts )

    def __unicode__( self ):
        return self.title 

class Article( models.Model ):
    title = models.CharField( max_length = 150 )
    slug = models.SlugField(max_length=150, unique=True )
    body = models.TextField()
    
    def __unicode__( self ):
        return self.title
