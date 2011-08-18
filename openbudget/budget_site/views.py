# Create your views here.

def main( request ):
    return HttpResponse( 'Strona glowna' )

def page( request, page_name ):
    #ModelName = Shorts.title 
    t = loader.get_template( "base.html" )
 #  t = Template('Witaj, {{name}}')
    c = Context( { 'name': page_name } )
    return HttpResponse( t.render( c ) )

