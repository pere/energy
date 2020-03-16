// alert(app_data.all_data.length)
// for (var _i = 0; app_data.all_data.length - 1; _i++) {
//     // var _this = app_data.all_data[i];
//     // console.log(_this)
//     console.log(_i)
// }

app.lollipop_graph = function() {
    app_state.matrix_indicators = false;
    app_state.lollipop_indicators = true;
    app.country_popup.remove();

    $('.dropdown-trigger').hide();

    var description_height = $('.lollipop_legend_description').height();

    $('.tooltip').remove();
    $('.tooltip .rect_popup').hide();
    $('.animated-icon').fadeOut();
    // d3.selectAll("#map path").transition()
    //     .duration(600)
    //     .attr('fill', function(d) {
    //         return '#72a3b0';
    //     })

    // setTimeout(function() {
    //     $('#lollipop_wrapper').hide();
    // }, 3000)
    console.info(app_data.all_data)
    if ($('#lollipop_graph svg').length > 0)
        $('#lollipop_graph svg').remove();

    $('.tooltip').hide();
    //just used for positioning!
    var mx_w_h = $('#map').height() / 5;
    $('#lollipop_wrapper').height(mx_w_h + $('nav').height());
    //.show();

    //var svg_h = $('#lollipop_wrapper').height();
    var map_w = $('#map').width();

    var diff_h = $('#map').height() - mx_w_h - $('nav').height();
    var diff_w = map_w - (map_w / 4);


    $('#lollipop_wrapper').css('top', diff_h).css('width', diff_w + 'px')
        //half of half map width!!
        .css('margin-left', (map_w / 8))



    $('#lollipop_wrapper').css('display', 'block').show();
    $('#matrix_wrapper').hide();

    //margins from graph inside lollipop_wrapper!
    // var margin = {
    //     top: 15,
    //     right: 5,
    //     bottom: 35,
    //     left: 35
    // },

    var margin = {
        top: 0,
        right: 5,
        bottom: 5,
        left: 5
    };
    width = diff_w - margin.left - margin.right;


    var svg = d3.select("#lollipop_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", mx_w_h + 30 + $('nav').height())
        .append("g")
        .attr("transform",
            "translate(0," + margin.top + ")")



    var tooltip = d3.select("body")
        .append("div")

    .attr("class", "lollipop_tooltip")

    /*
        DATA_val:::

    "main_index_val":20.761,  //main index doesnt count on the graph!
    "env_index_val":0.048,
    "social_index_val":0.059,
    "political_index_val":0.091, -->green #36d23d
    "financial_index_val":0.562  -->blue (#51bff1)
    */

    var colors = ["#ffffff", "#ffc107", "#36d23d", "#51bff1"];

    var lollipop_colors_obj = [{
                index_code: 'env_index_val',
                color: "#87d638",
                text: "Environmental"
            },
            {
                index_code: 'social_index_val',
                color: "#b1bdb3",
                text: "Social"
            },
            {
                index_code: 'political_index_val',
                color: "#366cd2",
                text: "Political"
            },
            {
                index_code: 'financial_index_val',
                color: "#51bff1",
                text: "Financial"
            }
        ]
        /*
            var legendElementWidth = 20;
            var legend_svg = d3.select('.legend_control svg')

            console.groupCollapsed('my Legend description Group');

            //.attr("width", legendElementWidth+170)
            legend_svg.attr("width", 180)
                //.attr("height",legendElementWidth*8)
                .attr("height", 150)

            var legend = legend_svg.selectAll(".legend")
                .data(scale_values, function(d) {
                    console.log(d)
                    return d.value;
                })

            .enter()

            .append("g")
                .attr("class", "legend")

            console.groupEnd();
            legend.append("rect")
                .attr("x", function(d, i) {

                    return 0 * i;
                })
                //.attr("x",0)
                .attr("y", function(d, i) {
                    return legendElementWidth * i;
                })
                .attr("width", legendElementWidth)
                .attr("height", legendElementWidth)
                .style("fill", function(d, i) {

                    return d.color;
                })
                .attr("stroke", "white")
                .attr("value", function(d) {
                    return d.value;
                });

            // var anchorElement = $('.legend rect');
            // anchorElement.attr('data-tooltip', 'New tooltip value');
            // anchorElement.tooltip();

            legend.append("text")
                .attr("class", "Montserrat")
                .html(function(d) {
                    // console.warn(d.legend_text)
                    return d.title; //+'<b>test</b>';
                })
                .attr("x", function(d, i) {
                    return legendElementWidth + 10;
                })
                //.attr("x",0)
                .attr("y", function(d, i) {
                    return ((legendElementWidth * i) + (legendElementWidth / 2) + 7);
                })

            .attr("font-size", "13px")
                .attr("fill", "white");
                */
        /*
            DATA_val:::

        "main_index_val":20.761,  //main index doesnt count on the graph!
        "env_index_val":0.048,
        "social_index_val":0.059,
        "political_index_val":0.091, -->green #36d23d
        "financial_index_val":0.562  -->blue (#51bff1)
        */




    // function get_index_data(name) {
    //     return indexes_info.filter(function(d) {
    //         return d.name == name;
    //     })[0]
    // }
    // function get_scale_data(value) {
    //     return scale_values.filter(function(d) {
    //         return d.value == value;
    //     })[0]
    // }
    var ranks = all_data.map(function(d) {
        return { code: d.code, ranks: d.rank_index }
    });


    // d3.scaleSequentialSqrt([0, 1], d3.interpolateTurbo)

    var rankScale = d3.scaleLinear().domain([1, 38])
        .interpolate(d3.interpolateHcl)
        .range([
            //         d3.rgb('#5c5c63'),
            //reddish
            // d3.rgb('#e91e63'),
            '#ffeb3b',
            '#f71717'
            //d3.rgb('#00bcd4'),

            // //blue
            // '#03a9f4'
            // //yellow '#ffeb3b',


        ]);

    // var rankScale_t = d3.quantize(d3.interpolateHcl("#fafa6e", "#2A4858"), 75)
    //var rankScale = d3.quantize(d3.interpolateHcl("white", "#2A4858"), 75)
    //console.log(rankScale_t)
    //  .range([d3.rgb("#3d9970"), d3.rgb('#ee3f34')]);
    var t = d3.quantize(d3.interpolateHcl("#2A4858", "#484745"), 38);
    console.log(t)
    var code_color_arr = [];
    var length = all_data.length;

    function get_rank_color(code, param) {

        var color;

        all_data.forEach(function(d, i) {

            if (d.code == code) {

                for (var p in d.data_ranks) {
                    // console.log(p)

                    if (param == p) {
                        var this_rank = d.data_ranks[param];

                        color = rankScale(this_rank);
                        if (code_color_arr.length < 5) {
                            if (this_rank == 5)
                                code_color_arr.push({ rank: this_rank, code: code, rank_color: color }) //, title: '< ' + length })
                            if (this_rank == 10)
                                code_color_arr.push({ rank: this_rank, code: code, rank_color: color }) //, title: '> ' + code_color_arr[0].this_rank })
                            if (this_rank == 20)
                                code_color_arr.push({ rank: this_rank, code: code, rank_color: color })
                            if (this_rank == 30)
                                code_color_arr.push({ rank: this_rank, code: code, rank_color: color });
                            if (this_rank == 38)
                                code_color_arr.push({ rank: this_rank, code: code, rank_color: color });
                        }

                    }
                }
            }
        })

        return color;

    }

    var map_paths = d3.selectAll("#map path.country");

    function update_geom_by_rank(param) {
        map_paths
            .transition()
            .duration(1250)
            .delay(function(d, i) {
                return i * 40;
            })
            .attr("delay", function(d, i) {
                return 100 * i
            })

        .attr('fill', function(d) {
                // console.log(d)
                // console.info(get_rank_color(d.properties.code, 'general_rank'))
                console.log(param)
                console.warn(get_rank_color(d.properties.code, param))
                return get_rank_color(d.properties.code, param)

            })
            .attr("stroke", "#fbfdfc")



        var sorted_code_color_arr = code_color_arr.sort(function(a, b) {
            return a.rank - b.rank;
        })

        update_rank_legend(sorted_code_color_arr)


    }

    setTimeout(function() {
        $('#rank_map_select').formSelect();
        $('#rank_map_select').on('change', function(e) {
            console.info($(this))
            var val = $(this).find('option:selected')[0].value;
            console.warn(val)
                /*
                all_data

                data_ranks:
                general_rank: 23
                rank_env: 27
                rank_social: 7
                rank_political: 31
                rank_financial: 12
                */
            switch (val) {
                case 'main':
                    $('.rank_symbol_label').text('Main index');
                    update_geom_by_rank('general_rank');

                    break;
                case 'env':
                    $('.rank_symbol_label').text('Environmental index');
                    update_geom_by_rank('rank_env');

                    break;
                case 'social':
                    $('.rank_symbol_label').text('Social index');
                    update_geom_by_rank('rank_social');

                    break;
                case 'political':
                    $('.rank_symbol_label').text('Political index');
                    update_geom_by_rank('rank_political');

                    break;
                case 'financial':
                    $('.rank_symbol_label').text('Financial index');
                    update_geom_by_rank('rank_financial');

                    break;
                default:
                    break;

            }

        })

    }, 500)

    function update_rank_legend(sorted_code_color_arr) {
        console.log(JSON.stringify(sorted_code_color_arr));



        var svg_width = ($('#map').width() / 4) + 200;

        $('.rank_legend_control').css('right', (svg_width - 200) + 'px');
        $('.rank_legend_control,.rank_legend_control_container,.rank_legend_control_container svg').css('width', svg_width + 'px');
        $('.mapboxgl-ctrl-bottom-right').show();
        var svg = d3.select(".rank_legend_control_container svg.legend_svg")
        var defs = svg.append("defs");
        var gradient = defs.append("linearGradient")
            .attr("id", "svgGradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
        //Append multiple color stops by using D3's data/enter step
        gradient.selectAll("stop")
            // .data(colorScale.range())
            .data(sorted_code_color_arr)
            .enter().append("stop")
            //code_color_arr.push({ rank: this_rank, code: code, rank_color: color }) //, title: '< ' + length })
            .attr("offset", function(d, i) {
                return i / (sorted_code_color_arr.length - 1);
            })
            .attr("stop-color", function(d) {
                return d.rank_color;
            });

        var rect = svg.append("rect")
            .attr('class', 'rect_legend')
            .attr('width', svg_width)
            //.attr('height', $(".rank_legend_control_container").height())
            .attr('height', 15)
            .attr("fill", "url(#svgGradient)")
            //.attr("transform", "translate(2, 0)") // + (10 + legendHeight) + ")")

        var s_domain = sorted_code_color_arr.map(function(d) {
            console.log(d)
            return parseInt(d.rank)
        })

        var xScale = d3.scaleLinear()
            .domain([0, 38])

        .range([1, svg_width])

        var xAxis = d3.axisBottom(xScale); //.tickFormat(function(d) {
        //  var width = 700; //$('.rect_legend').width();

        var legendWidth = svg_width,
            legendHeight = 10;
        //Color Legend container
        var legendsvg = svg.append("g")
            .attr("class", "legendWrapper")

        legendsvg.append("g")
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .attr("class", "axis") //Assign "axis" class
            .attr("transform", "translate(0, " + legendHeight + ")")
            .call(xAxis)
            // d3.selectAll('.tick').on('mouseover', function(d) {
            //     console.log(d)
            // })
        $('.rank_legend_control').show();
    }



    update_geom_by_rank('general_rank');
    // setTimeout(function() {
    //     update_geom_by_rank('rank_social');
    // }, 3000)
    function sort_by_value() {
        return function(a, b) {
            return a.data_class[param] < b.data_class[param] ? 1 : -1;
        }

    }

    app_data.lollipop_data = [];
    all_data.filter(function(d, i) {

        console.log(d)
        var t_data = [];
        var titles_data = [];

        //  var sorted = d.data_val.sort(sort_by_value());
        for (var p in d.data_val) {
            //console.info(p)
            if (p !== 'main_index_val') {


                t_data.push(d.data_val[p])
                titles_data.push(p)
                    //else
            }
        }

        //

        // var popup = '<div class="popup_country_title">' + d.country + '</h3>';
        /*
        "data_ranks":{
"general_rank":1,
"rank_env":12,
"rank_social":14,
"rank_political":14,
"rank_financial":2
},
ORDER IS IMPORTANT, HAS TO BE THE SAME!

DATA_val:::

"main_index_val":20.761,
"env_index_val":0.048,
"social_index_val":0.059,
"political_index_val":0.091,
"financial_index_val":0.562

*/

        var popup = '<div class="popup_country_title">' + d.country + '</div><div>General rank   <span class="general_rank_popup" style="color:' + get_rank_color(d.code, 'general_rank') + '">' + d.data_ranks['general_rank'] + ' / 38</div>';
        popup += '<div class="profile-overview"><table class="responsive-table profile-overview"> <thead> <tr> <td>Environmental</td> <td>Social</td> <td>Political</td> <td>Financial</td> </tr> </thead> <tbody><tr>';
        var i = 0;
        console.log(d)
        for (var index in d.data_ranks) {
            switch (index) {
                case 'general_rank':
                    var title = 'Index';
                    var index_val = d.data_val['main_index_val'];
                    break;
                case 'rank_env':
                    var title = 'Environmental';
                    var index_val = d.data_val['env_index_val'];
                    break;
                case 'rank_social':
                    var title = 'Social';
                    var index_val = d.data_val['social_index_val'];

                    break;
                case 'rank_political':
                    var title = 'Political';
                    var index_val = d.data_val['political_index_val'];
                    break;
                case 'rank_financial':
                    var title = 'Financial';
                    var index_val = d.data_val['financial_index_val'];
                    break;
            }






            //                 <td class="medium general_rank">
            //                     0.51
            //                 </td>
            //                 <td class="medium">
            //                     4/8
            //                 </td>
            //                 <td class="medium">
            //                     23/38
            //                 </td>
            //                 <td class="medium">
            //                     72/126
            //                 </td>
            //                 <td class="medium">
            //                     22/126
            //                 </td>

            //popup += '<div class="index_country_info ' + index + '">'

            if (index !== 'general_rank') {
                i++;
                // popup += '<i style="background:' + lollipop_colors_obj[i - 1].color + '"></i>';
                popup += '<td class="medium general_rank" style="background:' + lollipop_colors_obj[i - 1].color + '">' + d.data_ranks[index] + '/38 <span class="popup_index_val"> ' + index_val + '</span></td>';
            } else {
                // popup += '<td class="medium general_rank">0.51</td>';
            }


            // popup += '<span class="lollipop_' + index + '">' + title + ' </span> rank  (' + d.data_ranks[index] + ' of 38)</div>';
        }

        popup += ' </tr> </tbody> </table> </div>';
        // console.info(popup)

        // console.log(app_data.lollipop_data)
        all_data.filter(function(this_data) {
            return this_data.code == d.code;
        })[0].lollipop_popup = popup;
        app_data.lollipop_data.push({
            country: d.country,
            code: d.code,
            data: t_data,
            lollipop_popup: popup,
            data_titles: titles_data
        });

    });

    console.info(all_data)
    console.info(mx_w_h);

    console.info($('.lollipop_graph svg').height())
    var y = d3.scaleLinear()
        .domain([0, 0.6])
        .range([mx_w_h + description_height, 0]);
    //.range([0, w]);

    var yAxis = svg.append("g")
        .attr("class", "myYaxis")

    var x = d3.scaleBand()
        .range([0, width])
        .domain(app_data.lollipop_data.map(function(d) {
            return d.code;
        }))
        .padding(2);


    var ScaleRadius = d3.scaleLinear()
        .domain([0, 0.6])
        .range([3, 8]);



    svg.append("g")
        .attr("transform", "translate(0," + (mx_w_h + description_height) + ")")
        .classed('x_axis', true)

    .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(0,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr('font-weight', 'normal')
        .style('fill', '#ffffff')


    svg.append("g")
        .call(d3.axisLeft(y))

    var lollipop_rects = svg.selectAll("#lollipop_wrapper rect")
        .data(app_data.lollipop_data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return x(d.code)
        })
        .attr("y", function(d) {
            // return x(d.data[0]);
            return 0;
            // return height
        })
        .attr("width", 25)
        .attr("height", function(d) {
            // return y(d3.max(d.data));
            return mx_w_h + description_height
        })
        .attr("code", function(d) {

            return d.code;
        })
        .attr('class', 'myrect')
        .attr("transform",
            "translate(-12,0)")
        .style('fill', 'white')
        .style('opacity', 0)


    // Lines
    var lines = svg.selectAll(".myline")
        .data(app_data.lollipop_data)
        .enter()
        .append("line")

    console.log(lines)

    lines

        .attr("x1", function(d) {
            return x(d.code);
        })
        .attr("x2", function(d) {
            return x(d.code);
        })
        .attr("y1", function(d) {
            // return x(d.data[0]);
            return y(0);
            // return height
        })
        .attr("y2", function(d) {

            return y(d3.max(d.data));
        })

    .attr("stroke", "white")
        .attr("stroke-width", "0.5px");

    lines.nodes().forEach(function(line, i) {

        var line_d = line.__data__;


        svg.selectAll("mycircle")
            .data(line_d.data)
            .enter()
            .append("circle")
            .attr('code', function(d, i) {

                return line_d.code
            })
            .attr('param', function(d, i) {
                return lollipop_colors_obj[i].index_code;
            })
            .attr('class', 'mycircle')

        .attr("cx", function(d, i) {

                return x(line_d.code);
            })
            .attr("cy", function(d, i) {
                // console.info(i);
                // console.info(lollipop_colors_obj[i].index_code)
                // var c = lollipop_colors_obj[i].index_code;
                // console.log(d3.select(this))
                // d3.select(this).attr('param', c)
                // d['circle_index'] = c;

                // console.warn(d['circle_index'])
                return y(d);
            })
            .transition()
            .duration(700)
            .attr("r", function(d) {
                return 5
                    //ScaleRadius(d)
            })
            .style("fill", function(d, i) {
                return lollipop_colors_obj[i].color
            })
            .style('opacity', 0.7)

    });
    var lollipop_mouseout = function(d) {
        var code = d3.select(this).attr('code');
        // var this_d = data.filter(function(_d) {

        //     return _d.code == code;
        // })[0];
        // $('.lollipop_tooltip').hide();

        d3.selectAll('.myrect').transition()
            .duration(50)
            .style('opacity', 0)

    }

    var lollipop_mouseover = function(d) {
        console.info(d3.select(this))
        var code = d3.select(this).attr('code');

        var _this = '.myrect[code=' + code + ']';
        d3.selectAll(_this).transition()
            .duration(100)
            .style('opacity', 0.3)

        console.warn(code)
            // var param = d3.select(this).attr('param').split('_')[0];

        var this_info = app_data.lollipop_data.filter(function(_d) {
                console.log(_d)
                return _d.code == code;
            })[0]
            /*
             "env_index_val": 0.0306,
                        "social_index_val": 0.0471,
                        "political_index_val": 0.151,
                        "financial_index_val": 0.311
                        */
        console.info(this_info)

        var pos = $(this).position();

        var $html = $.parseHTML(this_info.lollipop_popup);

        tooltip
            .html('<div class="lollipop_popup"></div>')
            .style("left", (pos.left + 40) + "px")
            // .style("top", (pos.top - (d3.select(this).attr('height' / 2))) + "px")
            .style("top", (pos.top - (d3.select(this).attr('height' / 2))) + "px")
            //.style("top", "70px")

        $('.lollipop_popup').empty().append($html);
        $('.lollipop_tooltip').show();

        // $(".lollipop_tooltip").find('.rank_' + param).addClass('lollipop_title_selected');

        console.log('mouseovering same country! no popup')
        if ($('.country_popup[popup_code=' + code + ']').length > 0)
            return false;

        var popup_html = '<div popup_code=' + code + ' class="country_popup rect_popup">' + this_info.lollipop_popup + '</div>'
        console.log(popup_html)

        console.log(app.country_popup)
        console.warn(markers_obj_arr)
        for (var p in markers_obj_arr) {

            if (markers_obj_arr[p].code == code) {
                console.log(markers_obj_arr[p].centroid)
                app.country_popup.setLngLat(markers_obj_arr[p].centroid)
                app.country_popup.setHTML(popup_html)
                    .addTo(map);

                // debugger;
            }
        }







        // d3.select(this).transition().duration(700)
        //     .attr('r', function (d) {
        //         console.info(ScaleRadius(d))
        //         console.info(ScaleRadius(d * 3))
        //         return ScaleRadius(d * 3)
        //     })
        // d3.select(this).attrs(
        //     function (d, i) {
        //         return {
        //             "stroke": '#fff',
        //             'stroke-width': 2,
        //             'stroke-opacity': 1
        //         }
        //     }
        // ).classed('sel_circle', true);
        tooltip.style("opacity", 1)
    }

    svg.selectAll("rect.myrect")
        .on('mouseover', lollipop_mouseover)
        .on('mouseout', lollipop_mouseout)
    lines.on('mouseover', function(d) {
        console.warn(d)
    })
}