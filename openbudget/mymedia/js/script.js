(function () {
    var i;
    var height = 350;
    var width = 939;
    var circles = [];
    var paper = Raphael( 'notepad', width, height );
    var bread_crumb = [];

    create_table();
    make_bubbles( paper, get_data( rows ), 'v_total', [ width, 30, height ] );

    // G E T   D A T A
    function get_data( source, parent ) {
        var parent = parent || null;

        return Tools.filter( function ( element ) {
            return element['parent'] === parent;
        }, source );
    }

    // R E D R A W
    function redraw( parent ) {
        var geometry = [ width, 30, height ];

        paper.clear();
        make_bubbles( paper, get_data( rows, parent ), 'v_total', geometry );
    }

    // M A K E   B U B B L E S
    function make_bubbles( canvas, data, key, geometry ) {
        var raw_data = data;
        var data = Tools.normalize_data( raw_data, key );
        var width = geometry[0] || 900;
        var offset = geometry[1] || 0;
        var height = geometry[2] || 600;
        var ratio = 0;
        var radii = [];
        var max_radius = 0.0;
        var min_radius = 2.0;
        var max_line, min_line;
        var modifier;
        var vis_objects = [];        
        var x, y;
        var ball_color = "#5ab5ff";
        var handle_color = "#aaa";
        var handle_over_color = "#666";

        // white background
        canvas
            .rect( 0, 0, width, height )
            .attr({ 
                fill: "#fff",
                stroke: "none"
            });

        // fill the radii array and find max/min values
        for( i = 0; i < data.length; ++i ) {
            radii.push( Math.sqrt( data[i] / Math.PI ));
            max_radius = max_radius < radii[i] ? radii[i] : max_radius;
            min_radius = min_radius > radii[i] ? radii[i] : min_radius;
        }
        
        
        function calculate_ratio( ratio, min_radius, previous ) {
            // find a proper ratio for the balls size
            var mini = min_radius;
            var min_radius = Infinity;
            var current;
            
            var ratio = ( width - offset ) / ( Tools.get_sum(radii) * 2 );
            if( max_radius * ratio > 100 ) {
                ratio = 100 / max_radius;
            }
            current = ratio * mini;

            // if the smallest ball has radius less then 3 px
            // recalculate everything
            if( current < 3 && Math.abs( previous - current ) > 0.01 ) {
                for( i = 0; i < radii.length; ++i ) {
                    radii[i] = Tools.remap( radii[i], mini, max_radius, 3/ratio, max_radius );
                    min_radius = min_radius > radii[i] ? radii[i] : min_radius;                    
                }
                return calculate_ratio( ratio, min_radius, current );
            }
            else {
                return ratio;
            }
        }
        ratio = calculate_ratio( ratio, min_radius, Infinity );

        // initialize offset to center the visualization
        offset = width / 2;
        for( i = 0; i < radii.length; ++i ) {
            offset -= radii[i] * ratio;
        }


        // M A I N   V I S U A L I Z A T I O N   L O O P
        for( i = 0; i < data.length; ++i ) {
            // ball geometry
            radius = radii[i] * ratio;
            x = offset + radius;
            y = height / 2;

            // odd/even
            modifier = (i % 2 == 0) ? 0 : 10;

            // vis object
            vis_objects.push({
                graph: canvas.set(),
                x: x,
                y: y,
                r: radius,
                label: null,
                name: raw_data[i]['name'],
                value: raw_data[i]['v_total'],
                leaf: raw_data[i]['leaf'],
                idef: raw_data[i]['idef'],
                id: i+1
            });

            // vis graph
            vis_objects[i]['graph']
                .push(
                    canvas
                        .circle( x, y, radius )
                        .attr({
                            fill: ball_color,
                            stroke: "none"
                        })
                );
            
            if( vis_objects[i]['value'] === 0 ) {
                vis_objects[i]['graph'][0]
                    .attr({ 
                        fill: "#fff", 
                        stroke: ball_color 
                    });             
            }

            if( radius > 10 ) {
                vis_objects[i]['graph']
                    .push(
                        canvas
                            .text( x, y, (i+1) )
                            .attr({
                                fill: "#fff",
                                "text-anchor": "middle"
                            })
                    );
            }
            
            vis_objects[i]['graph'].translate( 0, 35 );
            
            
            // event listenery
            (function ( vis_object, i ) {
                var name = vis_object['name'];
                var text_len = name.length;
                var tmp_name = "";
                var words = name.split( " " );
                var x = vis_object['x'];

                var i;
                var counter = 0;
                
                for( i = 0; i < words.length; ++i ) {
                    if( counter > 80 ) {
                        counter = 0;
                        tmp_name += '\n';
                    }
                    
                    tmp_name += words[i] + " ";
                    counter += words[i].length;
                }


                vis_object['graph']
                    .mouseover( function (event) {
                        var bbox;
                        var x_position = 0;
                        var y_position = 0;
                                        
                        vis_object['label'] = canvas.set();
                        vis_object['label'].push(
                            canvas
                                .text( width / 2, -100, tmp_name )
                                .attr({
                                    "text-anchor": "start",
                                    "font-size": "11px"                            
                                }),
                            canvas
                                .text( width / 2, -100, Tools.money( vis_object['value'] ) )
                                .attr({
                                    "text-anchor": "start",
                                    "font-size": "11px",
                                    "font-weight": "bold"                  
                                }),
                            canvas
                                .path( "M 0 -100 l 0 0" )
                        );                                
                        
                        bbox = vis_object['label'][0].getBBox();
                        x_position = ( width / 2 ) - ( bbox.width / 2 );
                        y_position = 10 + ( bbox.height / 2 );
                        
                        vis_object['label']
                            .attr({
                                x: parseInt( x_position, 10 ),
                                y: parseInt( y_position, 10 )
                            });
                        vis_object['label'][1]
                            .attr({
                                x: parseInt( x_position, 10 ),
                                y: parseInt( y_position, 10 ) * 2 + 4
                            });                        

                        vis_object['label'][2]
                            .attr({
                                path: [["M", x_position, 12+bbox.height],
                                       ["l", bbox.width, 0 ]],
                                stroke: "#ccc",
                                "stroke-width": "1px"
                            });                        

                        if( vis_object['r'] <= 10 ) {
                            vis_object['tooltip'] = canvas.set();
                            vis_object['tooltip'].push(
                                canvas
                                    .path([
                                        ["M", x-7, vis_object['y']-7],
                                        ["l", 14, 0],
                                        // top-right
                                        ["a", 3, 3, -90, 0, 1, 3, 3],
                                        ["l", 0, 8],
                                        // bottom-right
                                        ["a", 3, 3, 0, 0, 1, -3, 3],
                                        ["l", -4, 0],
                                        // tip
                                        ["l", -3, 4],                                        
                                        ["l", -3, -4],                                        
                                        ["l", -4, 0],                                        
                                        // bottom-left
                                        ["a", 3, 3, 90, 0, 1, -3, -3],
                                        ["l", 0, -8],
                                        // top-left
                                        ["a", 3, 3, 180, 0, 1, 3, -3]                                                                  
                                    ])
                                    .attr({
                                        stroke: "#ccc",
                                        fill: "#7c7c7c"
                                    }),
                                    
                                canvas
                                    .text( x, vis_object['y'], vis_object['id'] )
                                    .attr({
                                        "text-anchor": "middle",
                                        fill: "#fff"
                                    })
                            )
                            .toFront()
                            .translate( 0, 10 );
                        }                            
                        
                        if( vis_object['leaf'] !== true && vis_object['value'] !== 0 ) {
                            vis_object['graph'].attr({
                                cursor: "pointer"
                            });
                            vis_object['graph'][0].attr({
                                fill: "#9e0b57"
                            });                        
                        }
                    })
                    .mouseout( function (event) {
                        vis_object['label'].remove();                    
                        if( vis_object['tooltip'] ) {
                            vis_object['tooltip'].remove();
                        }
                        if( vis_object['value'] !== 0 ) {
                            vis_object['graph'][0].attr({
                                fill: ball_color
                            });                        
                        }
                    })
                    .click( function (event) {
                        if( vis_object['leaf'] !== true ) {
                            redraw( vis_object['idef'] );
                        }
                    });

            })( vis_objects[i], i );

            offset += ( radius * 2 ) ;
        }


        // B R E A D   C R U M B
        var parent_id = raw_data[0]['parent'];
        var parent_parent_id = null;
        var parent_name;
        var parent_type;
        if( parent_id !== null ) {
            var parents = Tools.filter( function (element) {
                return element['idef'] === raw_data[0]['parent'];
            }, rows );
            parent_name = parents[0]['name'];
            parent_parent_id = parents[0]['parent'];
            parent_type = Tools.toTitleCase( parents[0]['type'] );
        }
        else {
            parent_name = "Budżet zadaniowy 2011";
        }

        update_bread_crumb({
            name: parent_name,
            idef: parent_id,
            type: parent_type
        });
        draw_bread_crumb( bread_crumb );
        update_table( raw_data );
        return circles;
    }


    function update_bread_crumb( new_crumb ) {
        var i;
        var found = false;

        // remove unuseful crumbs
        for( i = 0; i < bread_crumb.length; ++i ) {
            if( bread_crumb[i]['idef'] === new_crumb['idef'] ) {
                bread_crumb = bread_crumb.slice( 0, i+1 );
                found = true;
                break;
            }
        }

        // or add a new crumb
        if( found === false ) {
            bread_crumb.push( new_crumb );
        }
    } 


    function draw_bread_crumb( bread_crumb ) {
        var html = [];
        var i;

        for( i = 0; i < bread_crumb.length; ++i ) {
            // add an active crumb number one
            if( bread_crumb.length > 1 && i === 0 ) {
                html.push( '<div id="', bread_crumb[i]['idef'], '">' );
                html.push( bread_crumb[i]['name'] );
                html.push( '</div><br />' );
            }
            // or some inactive brumb
            else if( i === bread_crumb.length - 1 ) {
                // if the last one
                html.push( '<div id="', bread_crumb[i]['idef'] );
                html.push( '" class="inactive">' );
                if( bread_crumb[i]['idef'] ) {
                    html.push( '<span class="numerek">' );                
                    html.push( bread_crumb[i]['type'].replace(/-/g, '.'), ' ' );                    
                    html.push( '</span> - ' );                    
                }
                html.push( bread_crumb[i]['name'] );
                html.push( '</div><br />' );
            }
            // or finally all the normal crumbs go here
            else {
                html.push( '<div id="', bread_crumb[i]['idef'], '">' );
                if( bread_crumb[i]['idef'] ) {
                    html.push( '<span class="numerek">' );
                    html.push( bread_crumb[i]['type'].replace(/-/g, '.'), ' ' );                    
                    html.push( '</span> - ' );
                }
                html.push( bread_crumb[i]['name'] );
                html.push( '</div><br />' );
            }
        }

        // clear and container and append a newly cereated bread crumb
        $('#bread-crumb').html('');
        $('#bread-crumb').append( $( html.join('') ));        

        // event listener redrawing the visualization
        $('#bread-crumb > div').click( function() {
            redraw( $(this).attr('id') );
        });
    }

    
    function create_table() {
        // create a header with empty table body
        var html = [ '<table><thead><tr>' ];
        html.push( '<td class="idef">Lp.</td>' );
        html.push( '<td class="type">Typ</td>' );
        html.push( '<td class="name">Nazwa</td>' );
        html.push( '<td class="eu value">Środki europejskie</td>' );
        html.push( '<td class="pl value">Środki własne RP</td>' );
        html.push( '<td class="total value">Suma</td>' );
        html.push( '</tr></thead><tbody></tbody></table>' );
    
        $('#table').append( $( html.join('') ));
    }


    function update_table( data ) {
        var html = [];
        var i = 0;

        for( i = 0; i < data.length; ++i ) {
            html.push( '<tr class="', (i % 2 === 0 ? 'even' : 'odd'), '">' );
            html.push( '<td class="idef">', (i+1) ,'.</td>' );
            
            html.push( '<td class="type">' );
            html.push( Tools.toTitleCase(data[i]['type']) ,'</td>' );
            
            html.push( '<td class="name">', data[i]['name'], '</td>' );
            
            html.push( '<td class="eu value">' );
            html.push( Tools.money(data[i]['v_eu']) ,'</td>' );
            
            html.push( '<td class="pl value">' );
            html.push( Tools.money(data[i]['v_nation']) ,'</td>' );
            
            html.push( '<td class="total value">' );
            html.push( Tools.money(data[i]['v_total']) ,'</td>' );
            html.push( '</tr>' );
        }
        
        // clear and container and append a new table body        
        $('tbody').html('');
        $('tbody').append( $( html.join('') ));
    }
})();
