from django.db import models

class Shorts( models.Model ):
    INDEX_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
    )

    title = models.CharField( max_length = 150 )
    body = models.TextField()
    index = models.IntegerField( choices=INDEX_CHOICES )   

    def __unicode__( self ):
        return u'%s     | %s' % ( self.title, self.index )


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
