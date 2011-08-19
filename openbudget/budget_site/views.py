# -*- coding: utf-8 -*-
from django.http import HttpResponse
from openbudget.budget_site.models import Page, Article

def main( request ):
    return HttpResponse( 'Strona glowna!' )
    
def page( request, slug_name ):
    return HttpResponse( 'strona 2 o adresie:' + slug_name)
