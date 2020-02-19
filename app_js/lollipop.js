console.info(app_data.all_data)
app.lollipop_graph = function () {
    $('.tooltip').remove();
    $('.tooltip .rect_popup').hide();
    $('.animated-icon').fadeOut();
    d3.selectAll("#map path").transition()
        .duration(300)
        .attr('fill', function (d) {
            return '#071e2b';
        })
    console.info(app_data.all_data)
    if ($('#lollipop_graph svg').length > 0)
        $('#lollipop_graph svg').remove();

    $('.tooltip').hide();
    //just used for positioning!
    var diff_h = $('#map').height() - 250;
    var diff_w = $('#map').width() - 150;

    $('#lollipop_wrapper').css('top', diff_h).css('width', diff_w + 'px')
    //css('top', diff_h).css('width', diff_w + 'px')
    $('#lollipop_wrapper').css('display', 'block').show();

    //margins from graph inside lollipop_wrapper!
    var margin = {
        top: 15,
        right: 5,
        bottom: 35,
        left: 35
    },
        width = diff_w - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;

    var svg = d3.select("#lollipop_graph")
        .append("svg")

        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")


    var tooltip = d3.select("body")
        .append("div")

        .attr("class", "lollipop_tooltip")

    var colors = ["#e0347c", "#f5621c", "#f7c717", "#6ee282", "#5aa066"];

    var data = [];
    all_data.filter(function (d, i) {

        var t_data = [];
        for (var p in d.data_val) {
            //console.info(p)
            if (p !== 'main_index_val')
                t_data.push(d.data_val[p])
        }
        var popup = '<div class="popup_country_title">' + d.country + '</h3>';
        /*
        "data_ranks":{
"general_rank":1,
"rank_env":12,
"rank_social":14,
"rank_political":14,
"rank_financial":2
},
ORDER IS IMPORTANT, HAS TO BE THE SAME!
"main_index_val":20.761,
"env_index_val":0.048,
"social_index_val":0.059,
"political_index_val":0.091,
"financial_index_val":0.562

*/
        var popup = '<div class="popup_country_title">' + d.country + '</h3>';
        var i = 0;

        for (var index in d.data_ranks) {
            switch (index) {
                case 'general_rank':
                    var title = 'General';
                    break;
                case 'rank_env':
                    var title = 'Environmental';
                    break;
                case 'rank_social':
                    var title = 'Social';

                    break;
                case 'rank_political':
                    var title = 'Political';
                    break;
                case 'rank_financial':
                    var title = 'Financial';
                    break;
            }

            popup += '<div class="index_country_info ' + index + '">'
            if (index !== 'general_rank') {
                i++;
                popup += '<i style="background:' + colors[i] + '"></i>';
            }
            popup += title + ' rank  ' + d.data_ranks[index] + '</div>';
        }
        console.log(popup)
        data.push({
            country: d.country,
            code: d.code,
            data: t_data,
            lollipop_popup: popup
        });

    });
    console.log(data);

    var y = d3.scaleLinear()
        .domain([0, 0.6])
        .range([height, 0]);
    //.range([0, w]);

    var yAxis = svg.append("g")
        .attr("class", "myYaxis")

    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) {
            return d.code;
        }))
        .padding(1);


    var ScaleRadius = d3.scaleLinear()
        .domain([0, 0.6])
        .range([3, 8]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .classed('x_axis', true)

        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(0,0)rotate(-45)")
        .style("text-anchor", "end")

    svg.append("g")
        .call(d3.axisLeft(y))

    // Lines
    var lines = svg.selectAll(".myline")
        .data(data)
        .enter()
        .append("line")

    console.log(lines)

    lines

        .attr("x1", function (d) {
            return x(d.code);
        })
        .attr("x2", function (d) {
            return x(d.code);
        })
        .attr("y1", function (d) {
            // return x(d.data[0]);
            return y(0);
            // return height
        })
        .attr("y2", function (d) {
            return y(d3.max(d.data));
        })

        .attr("stroke", "white")
        .attr("stroke-width", "0.5px");

    lines.nodes().forEach(function (line, i) {

        var line_d = line.__data__;
        console.log(line_d)
        svg.selectAll("mycircle")
            .data(line_d.data)
            .enter()
            .append("circle")
            .attr('code', line_d.code)
            .attr('class', 'mycircle')

            .attr("cx", function (d, i) {

                return x(line_d.code);
            })
            .attr("cy", function (d) {
                return y(d);
            })
            .transition()
            .duration(2000)
            .attr("r", function (d) {
                console.log(d)
                console.info(ScaleRadius(d))
                return ScaleRadius(d)
            })

            .style("fill", function (d, i) {
                return colors[i]
            })

    });

    var lollipop_mouseover = function (d) {
        var code = d3.select(this).attr('code');
        var this_d = data.filter(function (_d) {
            console.log(_d)
            return _d.code == code;
        })[0]
        /*
         "env_index_val": 0.0306,
                    "social_index_val": 0.0471,
                    "political_index_val": 0.151,
                    "financial_index_val": 0.311
                    */
        console.info(this_d)

        var pos = $(this).position();

        var $html = $.parseHTML(this_d.lollipop_popup);


        tooltip
            .html('<div class="lollipop_popup"></div>')
            .style("left", (pos.left + 30) + "px")
            .style("top", (pos.top - 50) + "px")
        $('.lollipop_popup').empty().append($html).show()


        d3.select(this).transition().duration(700)
            .attr('r', function (d) {
                console.info(ScaleRadius(d))
                console.info(ScaleRadius(d * 3))
                return ScaleRadius(d * 3)
            })
        d3.select(this).attrs(
            function (d, i) {
                return {
                    "stroke": '#fff',
                    'stroke-width': 2,
                    'stroke-opacity': 1
                }
            }
        ).classed('sel_circle', true);
        tooltip.style("opacity", 1)
    }

    svg.selectAll(".mycircle").on('mouseover', lollipop_mouseover)
    lines.on('mouseover', function (d) {
        console.warn(d)
    })
}