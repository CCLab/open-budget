# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.template import loader, Context
from django.core.exceptions import ObjectDoesNotExist
from operator import attrgetter
from openbudget.budget_site.models import Page, Article

import simplejson as json


def main( request ):
    t = loader.get_template( "main.html" )
    c = Context( { 'name': "name z Django" } )

    return HttpResponse( t.render( c ) )

def en_page( request, slug_name ):
    article = Article.objects.get( slug = slug_name )
    t = loader.get_template( "en_article.html" )
    c = Context( {  'article': article,
                    'slug': slug_name } )

    return HttpResponse( t.render( c ))

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


def get_data( request ):
    from urllib import urlopen
    level = request.GET.get( 'level', 'a' )
    idef = request.GET.get( 'idef', None )
    host = 'http://cecyf.megivps.pl/api/json/dataset/0/view/1/issue/2011/'
    fields = '/?fields=idef,v_nation,name,type'

    if level != 'a':
        prev = chr( ord( level ) - 1 )
        url = host + prev + '/' + idef + '/' + level + fields
    else:
        url = host + level + fields

    data = json.loads( urlopen( url ).read() )
    data = [ d for d in data['data'] if d['idef'] != '9999' ]

    return HttpResponse( json.dumps( data ))


def get_parent( request ):
    from urllib import urlopen
    idef = request.GET.get( 'idef', None )
    host = 'http://cecyf.megivps.pl/api/json/dataset/0/view/1/issue/2011/'
    fields = '/?fields=idef,name,type'

    if idef == None:
        return HttpResponse( "No parent idef provided!" )

    data = json.loads( urlopen( host + idef + fields ).read() )

    return HttpResponse( json.dumps( data['data'][0] ))
