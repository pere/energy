$('.modal').modal({
        opacity: 0.8,
        onCloseEnd: function() {
            $('.country_li.main_li')
                .attr('data-tooltip', function() {
                    return '<div class="init_instructions">Use the lateral navigation bar to start visualizing data</div>';

                })
                .tooltip({
                    delay: 50,
                    delayOut: 50000,
                    position: 'right',
                    html: true
                });


            setTimeout(function() {
                $(".country_li.main_li").tooltip("open");
                var container = $(".init_instructions").parents().closest('.material-tooltip')

                //container.hide();

                setTimeout(function() {
                    container.css('top', container.position().top - ($(".country_li.main_li").height() / 2));
                    container.show();

                    $('.sidenav').on('mouseover', function() {
                        $(this).removeAttr('data-tooltip');
                        container.remove()
                        $('.sidenav').unbind('mouseover')
                    })

                }, 100)
            }, 400)
        }
    })
    // Callback for Modal close});
    // $('.country_popup').on('mouseover mouseenter mouseleave mouseup mousedown', function() {
    //     return false
    // });

$('.icon_info').hide();
$('.icon_info').trigger('click');

$('.legend_dropdown_button.dropdown-trigger,.rank_legend_dropdown_button.dropdown-trigger').dropdown({
    inDuration: 300,
    constrainWidth: false,
    closeOnClick: false,
    onOpenEnd: function(el) {

        $(el).find('i').addClass('on');
        if ($(el).hasClass('rank_legend_dropdown_button'))
            $('.rank_legend_control').show();

    },
    onCloseEnd: function(el) {
        $(el).find('i').removeClass('on');
    },
    // container: '#layers_menu',
    outDuration: 225,
    hover: false, // Activate on hover,
    stopPropagation: true,
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'right',
    //alignLeft: false
    // function(el) {
    //     if ($(el).hasClass('rank_legend_dropdown_button'))
    //         return 'left' // Displays dropdown with edge aligned to the left of button
    //     else
    //         return 'left'

    // }
});

$('.legend_dropdown_button.dropdown-trigger')
    .attr('data-tooltip', function() {
        return 'Show/hide index legend';
    })
    .tooltip({
        delay: 50,
        delayOut: 50000,
        position: 'bottom',
        html: true
    });



// setTimeout(function() {
//     var container = $(".init_instructions").parents().closest('.material-tooltip')
//     console.warn(container.position())

//     setTimeout(function() {
//         container.css('top', container.position().top - ($(".country_li.main_li").height() / 2))
//     }, 2000)

// }, 800)


$('.rank_legend_dropdown_button.dropdown-trigger')
    .attr('data-tooltip', function() {
        return 'Show/hide index ranking scale';

    })
    .tooltip({
        delay: 50,
        delayOut: 50000,
        position: 'bottom',
        html: true
    })

$('.dropdown-trigger').hide();



$('#slide-out').sidenav({

    edge: 'left', // Choose the horizontal origin
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpenEnd: function(el) {
        $('.sidenav-trigger').addClass('on');
        console.log(el)
            //calc(85%) !important
            //if ($('.country_info').is(':visible'))
            // if ($('#matrix_wrapper').is(':visible')) {
            //     alert('vis')
            //     $('#slide-out').attr('height', '65%!important')
            // }
            // else {
            //     $('#slide-out').attr('height', 'auto!important')
            // }

    },

    onCloseEnd: function(el) {}, // A function to be called when sideNav is closed
})

$('#slide-out').sidenav('open');


$('.sidenav-trigger').on('click', function(e) {
        if ($(this).hasClass('on')) {
            e.preventDefault()
            $('#slide-out').sidenav('close').removeClass('sidenav_on');
            $(this).removeClass('on')
            return false
        }
    })
    .attr('data-tooltip', function() {
        return 'Show/hide lateral sidebar';
    })
    .tooltip({
        delay: 50,
        delayOut: 50000,
        position: 'bottom',
        html: true
    });

$('.collapsible').collapsible({
    onCloseEnd: function() {
        if ($('.country_info').is(':visible') == false) {
            $('.country_li').css('min-height', '0px')
        }
    }
})


$('.light_mode').on('click', function(e) {

    if ($(this).hasClass('nightlight')) {
        $(this).removeClass('nightlight').addClass('daylight');
        $('.mapboxgl-map').css("background-color", "rgb(161, 180, 193)");
        // map.setPaintProperty('gaul_0_simple', 'fill-color', '#dae0e4');
        // map.setPaintProperty('gaul_0_simple', 'fill-outline-color', '#a1b4c1');
        // map.setPaintProperty('gaul_0_simple', 'fill-opacity', 0.8);
    } else {
        $(this).removeClass('daylight').addClass('nightlight');
        $('.mapboxgl-map').css("background-color", "rgb(4, 22, 32)");
    }
})


$('.other_description,.matrix_description').css('visibility', 'hidden')

$('.indicators_list > div').each(function() {
    $(this).on('mouseover', function() {

        // $('.matrix_indicator_select,.other_indicator_select ').removeClass('on');
        console.log($(this).attr('class'))

        if ($(this).hasClass('matrix_indicator_select')) {
            // $('.matrix_description').css('visibility', 'visible');
            // $(this).removeClass('off').addClass('on');


            // $('.other_description').css('visibility', 'hidden')
        } else {
            // $('.matrix_description').css('visibility', 'hidden')
            // $('.other_description').css('visibility', 'visible')
            // $(this).removeClass('off').addClass('on');
        }
    }).on('click', function() {
        $('.matrix_indicator_select,.other_indicator_select ').removeClass('on');

        if ($(this).hasClass('matrix_indicator_select')) {
            $('.matrix_description').css('visibility', 'visible');
            $(this).addClass('on').removeClass('off');
            $('.mapboxgl-ctrl-bottom-right').show();

            $('#matrix_wrapper').show();

            // //    $('#slide-out').sidenav('close');
            app.update_by_index('main_index_class');
            //app.generate_data('main_index_class');
            // $('.other_description').css('visibility', 'hidden')
        } else {
            $('.matrix_description').css('visibility', 'hidden');
            $('.mapboxgl-ctrl-bottom-right').hide();

            $(this).addClass('on').removeClass('off');
            $('#matrix_wrapper').hide();
            app.setup_lollipop_graph();
            app.lollipop_graph('main_index_val');
            $('.other_description').css('visibility', 'visible')
        }
    })
});


$('.overlay_layers_collection .main.collection-item').on('click', function(e) {
    var collection_item = $(this);
    if (collection_item.hasClass('main'))
        e.stopPropagation();

    var target = $(e.target);
    console.log(collection_item)
    var data_layer = collection_item.attr('data-layer');

    console.log('layer ' + data_layer);

    //switch layers_correspondence_new in mapbox_init.js!!!!!
    switch (data_layer) {
        case 'countries':
            var layers = ['gaul_0_simple', 'gaul_0_fixed'];
            break;
        case 'basins_6':
            var layers = ['basins_6_adm_0'];
            break;
        case 'basins_5':
            var layers = ['basins_5_adm_0_fill'];
            break;
        case 'gaul_1':
            var layers = ['gaul_1', 'gaul_1_simple'];
            break;
        default:
            break;
    }
    /*
    DO DATA_LAYER IN HTML CORRESPONDENT TO THESE ONES
    var layers_correspondence = {
        'countries': ['gaul_0_simple', 'gaul_0_fixed', 'gaul_0_simplified_highlighted', 'gaul_0_fixed_highlighted'],
        'gaul_1': ['gaul_1', 'gaul1_simple'],
        'basins_6': ['basins_6_adm_0'],
        'basins_5': ['basins_5_adm_0_fill']
    };
    */


    if (target.hasClass('show_hide_layer')) {
        var data_layer = collection_item.attr('data-layer');

        if (target.hasClass('on') == false) {
            target.toggleClass('on');
            //   show_hide_layers('show', data_layer)
        } else {
            target.toggleClass('on');

            // layers.forEach(function(l) {
            //     l.setPaintProperty(d, "fill-color", '');
            // })
            //    show_hide_layers('hide', data_layer);
        }
    }
})