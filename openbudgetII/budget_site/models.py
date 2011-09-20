from django.db import models

class Article( models.Model ):
    title = models.CharField( max_length = 200 )
    slug = models.CharField( max_length = 200, unique = True )
    summary = models.TextField()
    body = models.TextField()

    def __unicode__( self ):
        return self.title

class Group( models.Model ):
    title = models.CharField( max_length = 200 )
    slug = models.CharField( max_length = 200, unique = True )
    articles = models.ManyToManyField( 'Article' )

    def __unicode__( self ):
        return self.title

class Page( models.Model ):
    title = models.CharField( max_length = 200 )
    slug = models.CharField( max_length = 200, unique = True )
    summary = models.TextField()
    groups = models.ManyToManyField( 'Group' )    

    def __unicode__( self ):
        return self.title


#class Menu( models.Model ):
#    content = models.ManyToManyField( 'Page', 'Article')
