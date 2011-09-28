from django.db import models


# Parent model for Page and Article models. Use by Menu model
class MenuItem( models.Model ):
    title = models.CharField( max_length = 200 )
    slug = models.CharField( max_length = 200, unique = True )
    
    def __unicode__( self ):
        return self.title

class Article( MenuItem ):
    summary = models.TextField()
    body = models.TextField()

class Page( MenuItem ):
    summary = models.TextField()
    groups = models.ManyToManyField( 'Group' )    

class Group( models.Model ):
    title = models.CharField( max_length = 200 )
    slug = models.CharField( max_length = 200, unique = True )
    articles = models.ManyToManyField( 'Article' )

    def __unicode__( self ):
        return self.title

class Menu( models.Model ):
    content = models.ManyToManyField( 'MenuItem' )
