(function () {
var i, j;
var width = 900;
var height = 580;

var admin;
var blue_color = "#5ab5ff";
var current_admin;
var info;
var list_01 = $('#list_01 > ol');
var list_02 = $('#list_02 > ol');
var list_03 = $('#list_03 > ol');
var m_inx = 1, o_inx = 1;
var ministry = 0, other = 0;
var paper = Raphael( 'paper', width, height );

var perc_function, perc_admin;
var a_len = admins.length;
var r = ( width - 20 ) / a_len / 2;
var R = ( width - 20 ) / ( a_len - 17 ) / 2;
var tmp_set;
var total = 397504708;


paper
    .text( 10, 13, "Ministerstwa" )
    .attr({
        fill: "#8b8b8b",
        "font-size": "16px",
        "font-family":"Arial, sans-serif",
        "text-anchor": "start"
    });

paper
    .text( 10, 63, "Inni dysponenci" )
    .attr({
        fill: "#8b8b8b",
        "font-size": "16px",
        "font-family":"Arial, sans-serif",
        "text-anchor": "start"
    });


info = paper
        .text( width / 2, 145, "Najedź myszką nad dowolną kulkę,\nby zobaczyć szczegóły finansów dysponentów\n(Układ alfabetyczny)" )
        .attr({
            fill: "#ababab",
            "font-size": "18px",
            "font-family":"Arial, sans-serif",
            "text-anchor": "middle"
        });

for( i = 0 ; i < a_len; ++i ) {
    admin = admins[i];
    is_ministry = admin['name'].indexOf( 'Ministerstwo' ) !== -1 ? true : false;

    perc_budget = (100 * admin['v_total'] / total ).toFixed( 1 );
    if( perc_budget < 1 ) {
        perc_budget = "< 1%";
    }
    else {
        perc_budget += "%";
    }

    if( is_ministry ) {
        $('<li>'+admin['name']+'</li>').appendTo(list_01);
    }
    else {
        if( i < 37) {
            $('<li>'+admin['name']+'</li>').appendTo(list_02);
        }
        else {
            $('<li>'+admin['name']+'</li>').appendTo(list_03);
        }
    }



    admin['graph'] = paper.set();
    admin['graph'].push(
        paper
            .circle( 10 + r + ( is_ministry ? ministry : other ),
                     is_ministry ? 35 : 85, R )
            .attr({
                fill: blue_color,
                stroke: "none"
            }),

        paper
            .text( 10 + r + ( is_ministry ? ministry : other ),
                     is_ministry ? 35 : 85, is_ministry ? i-15 : i < 33 ? i+18 : i+1 )
            .attr({
                "text-anchor": "middle",
                fill: "#ffffff",
                "font-family":"Arial, sans-serif",
                "font-size": "12px"
            }),

        paper
            .text( 215, 120, admin['name'] )
            .attr({
                "text-anchor": "start",
                fill: "#5b5b5b",
                "font-family":"Arial, sans-serif",
                "font-size": "16px"
            })
            .hide(),

        paper
            .text( 250, 144, Tools.money( admin['v_total'] ))
            .attr({
                "text-anchor": "end",
                fill: "#5b5b5b",
                "font-family":"Arial, sans-serif",
                "font-size": "12px"
            })
            .hide(),

        paper
            .text( 250, 164, 'w tym:' )
            .attr({
                "text-anchor": "end",
                fill: "#8b8b8b",
                "font-family":"Arial, sans-serif",
                "font-size": "12px"
            })
            .hide(),

        paper
            .circle( 320, 144, r )
            .attr({
                fill: "#3972a1",
                stroke: "#3972a1",
                "stroke-width": "4px"
            })
            .hide(),

        paper
            .text( 370, 144, perc_budget )
            .attr({
                "text-anchor": "end",
                fill: "#5b5b5b",
                "font-family":"Arial, sans-serif",
                "font-size": "12px"
            })
            .hide(),

        paper
            .text( 380, 144, "BUDŻETU ZADANIOWEGO" )
            .attr({
                "text-anchor": "start",
                fill: "#5b5b5b",
                "font-family":"Arial, sans-serif",
                "font-size": "12px"
            })
            .hide()
    );

    if( is_ministry ) {
        ministry += 2 * R;
        m_inx += 1;
    }
    else {
        other += 2 * R;
        o_inx += 1;
    }
/*
    tmp_set = paper.set();
    for( j = 0 ; j < admin['functions'].length; ++j ) {
        func = find_function( admin['functions'][j]['name'] );

        current_admin = Tools.filter( function ( e ) {
            return e['name'] === admin['name'];
        }, func['admins'] )[0];

        perc_function = ( 100 * admin['functions'][j]['v_total'] / func['value'] ).toFixed( 1 );
        if( perc_function < 1 ) {
            perc_function = "< 1%";
        }
        else {
            perc_function += "%";
        }

        perc_admin = ( 100 * current_admin['value'] / admin['v_total'] ).toFixed( 1 );
        if( perc_admin < 1 ) {
            perc_admin = "< 1%";
        }
        else {
            perc_admin += "%";
        }


        tmp_set.push(
            paper
                .text( 250, 180 + ( j * r*2 )+(j*5), Tools.money( current_admin['value'] ))
                .attr({
                    "text-anchor": "end",
                    "font-family":"Arial, sans-serif",
                    fill: "#3b3b3b"
                }),

            paper
                .text( 295, 180 + ( j * r*2 )+(j*5), '(' + perc_admin + ')' )
                .attr({
                    "text-anchor": "end",
                    "font-family":"Arial, sans-serif",
                    fill: "#6b6b6b"
                }),

            paper
                .circle( 320, 180 + ( j * r*2 )+(j*5), r )
                .attr({
                    fill: "#9e0b57",
                    stroke: "none"
                }),

            paper
                .text( 340, 180 + ( j * r*2 )+(j*5), 'Jest to' )
                .attr({
                    "text-anchor": "start",
                    "font-family":"Arial, sans-serif",
                    fill: "#6b6b6b"
                }),

            paper
                .text( 410, 180 + ( j * r*2 )+(j*5), perc_function )
                .attr({
                    "text-anchor": "end",
                    "font-family":"Arial, sans-serif",
                    fill: "#3b3b3b"
                }),

            paper
                .text( 420, 180 + ( j * r*2 )+(j*5), 'funkcji' )
                .attr({
                    "text-anchor": "start",
                    "font-family":"Arial, sans-serif",
                    fill: "#6b6b6b"
                }),

            paper
                .text( 460, 180 + ( j * r*2 )+(j*5), '"' + func['name'] + '"' )
                .attr({
                    "text-anchor": "start",
                    "font-family":"Arial, sans-serif",
                    fill: "#3b3b3b"
                })
        );
    }

    admin['graph'].push( tmp_set.hide() );
*/
    (function (admin) {
        var graph = admin['graph'];
        var tmp_set;

        graph
            .hover(
                function ( event ) {
                    info.hide();

                    graph[0].attr({
                        "cursor": "pointer",
                        fill: "#3972a1",
                        stroke: "#3972a1",
                        "stroke-width": "4px"
                    })
                    .toFront();

                    graph[1]
                        .show()
                        .toFront()
                        .attr({
                            "cursor": "pointer"
                        });
                    graph[2].show();
                    graph[3].show();
                    graph[4].show();
                    graph[5].show();
                    graph[6].show();
                    graph[7].show();

                    $('#lists').hide();

                    tmp_set = paper.set();
                    for( j = 0 ; j < admin['functions'].length; ++j ) {
                        func = find_function( admin['functions'][j]['name'] );

                        current_admin = Tools.filter( function ( e ) {
                            return e['name'] === admin['name'];
                        }, func['admins'] )[0];

                        perc_function = ( 100 * admin['functions'][j]['v_total'] / func['value'] ).toFixed( 1 );
                        if( perc_function < 1 ) {
                            perc_function = "< 1%";
                        }
                        else {
                            perc_function += "%";
                        }

                        perc_admin = ( 100 * current_admin['value'] / admin['v_total'] ).toFixed( 1 );
                        if( perc_admin < 1 ) {
                            perc_admin = "< 1%";
                        }
                        else {
                            perc_admin += "%";
                        }


                        tmp_set.push(
                            paper
                                .text( 250, 180 + ( j * r*2 )+(j*5), Tools.money( current_admin['value'] ))
                                .attr({
                                    "text-anchor": "end",
                                    "font-family":"Arial, sans-serif",
                                    fill: "#3b3b3b"
                                }),

                            paper
                                .text( 295, 180 + ( j * r*2 )+(j*5), '(' + perc_admin + ')' )
                                .attr({
                                    "text-anchor": "end",
                                    "font-family":"Arial, sans-serif",
                                    fill: "#6b6b6b"
                                }),

                            paper
                                .circle( 320, 180 + ( j * r*2 )+(j*5), r )
                                .attr({
                                    fill: "#9e0b57",
                                    stroke: "none"
                                }),

                            paper
                                .text( 340, 180 + ( j * r*2 )+(j*5), 'Jest to' )
                                .attr({
                                    "text-anchor": "start",
                                    "font-family":"Arial, sans-serif",
                                    fill: "#6b6b6b"
                                }),

                            paper
                                .text( 410, 180 + ( j * r*2 )+(j*5), perc_function )
                                .attr({
                                    "text-anchor": "end",
                                    "font-family":"Arial, sans-serif",
                                    fill: "#3b3b3b"
                                }),

                            paper
                                .text( 420, 180 + ( j * r*2 )+(j*5), 'funkcji' )
                                .attr({
                                    "text-anchor": "start",
                                    "font-family":"Arial, sans-serif",
                                    fill: "#6b6b6b"
                                }),

                            paper
                                .text( 460, 180 + ( j * r*2 )+(j*5), '"' + func['name'] + '"' )
                                .attr({
                                    "text-anchor": "start",
                                    "font-family":"Arial, sans-serif",
                                    fill: "#3b3b3b"
                                })
                        );
                    }

                    admin['graph'].push( tmp_set );
                },
                function ( event ) {
                    info.show();
                    tmp_set.remove();

                    graph[0].attr({
                        stroke: "none",
                        fill: blue_color
                    });
//                        .toBack();

//                        graph[1].hide();
                        graph[2].hide();
                        graph[3].hide();
                        graph[4].hide();
                        graph[5].hide();
                        graph[6].hide();
                        graph[7].hide();

                        $('#lists').show();
                    }
                );

        })(admin);
    }

    function find_function( name ) {
        var i;

        for( i = 0; i < functions.length; ++i ) {
           if( functions[i]['name'] === name ) {
               return functions[i];
           }
        }

        throw new Error( "Nie ma takiej funkcji" );
    }


    function clear_screen() {
        var i;
        for( i = 0; i < admins.length; ++i ) {
            while( admins[i]['graph'].length > 2 ) {
                admins[i]['graph'].pop().remove();
            }
        }
    }
})();
