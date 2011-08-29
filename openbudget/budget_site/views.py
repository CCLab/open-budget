# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.template import loader, Context
from django.core.exceptions import ObjectDoesNotExist
from operator import attrgetter
from openbudget.budget_site.models import Page, Article

def main( request ):
    t = loader.get_template( "main.html" )
    c = Context( { 'name': "name z Django" } )    

    return HttpResponse( t.render( c ) )

    
def page( request, slug_name ):
    
    try:
        article = Article.objects.get( slug = slug_name )
        t = loader.get_template( "article.html" )
        c = Context( { 'article': article,
                       'slug': slug_name } )  
        return HttpResponse( t.render( c ) )                
        
    except Article.DoesNotExist:
        try:
            page = Page.objects.get( slug = slug_name )
            shorts_list = sorted( page.short.all(), key=attrgetter('index') )
            t = loader.get_template( "page.html" )
            c = Context( { 'page_title' : page.title,
                           'shorts_list': shorts_list,
                           'slug': slug_name  } )  
            return HttpResponse( t.render( c ) )           
        except Page.DoesNotExist:        
            return HttpResponse( "Blad nie ma takiego artykulu ani strony o slug =" + slug_name )
    
        
    return HttpResponse( 'strona o adresie:' + slug_name + ' zostala znaleziona' )
