# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.template import loader, Context, Template
from open_budget.site_base.models import News, Shorts 



def main( request ):
    return HttpResponse( 'Strona glowna' )

def page( request, page_name ):
    #ModelName = Shorts.title 
    t = loader.get_template( "base.html" )
 #  t = Template('Witaj, {{name}}')
    c = Context( { 'name': page_name } )
    return HttpResponse( t.render( c ) )
#    return HttpResponse('Strona page2 <br> page name = '+ page_name)
