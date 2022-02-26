$(function () {
    $('input[name="daterange"]').daterangepicker({
        opens: 'center',
        todayHighlight: true,
        format: 'dd/mm/yyyy'
    }, function (start, end, label) {
        console.log("A new date selection was made: " + start
            .format(
                'YYYY-MM-DD') + ' to ' + end.format(
                'YYYY-MM-DD'));
    });
});

$(document).ready(function (c) {
    $('.close-bottom').on('click', function (c) {
        $('.fixed-bottom').slideUp('slow', function (c) {
            $('.fixed-bottom').remove();
        });
    });
});

$(".slide-headline").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 17000,
    autoHeight: true,
    nav: false,
    dots: true,
    navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>']
});

$(".slide-featured").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoHeight: true,
    nav: true,
    dots: true,
    navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>']
});

$(".slide-foto").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoHeight: true,
    nav: true,
    dots: false,
    navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>']
});

$('.slide-vid-pic').owlCarousel({
    stagePadding: 0,
    margin: 15,
    lazyLoad: true,
    nav: true,
    loop: false,
    dots: false,
    navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
        0: {
            items: 1,

        },
        600: {
            items: 4
        },
        1000: {
            items: 4
        }
    }
})

$(document).ready(function () {
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 17000,
        nav: false,
        autoplay: true,
        dots: true,
        loop: true,
        autoHeight: true,
        responsiveRefreshRate: 200,
        responsive: {

            600: {
                dots: true,
            },
            1000: {
                dots: false,
            },
            1200: {
                dots: false,
            }
        },
        navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            margin: 0,
            dots: false,
            nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>'],
            responsiveRefreshRate: 100,

            responsive: {

                600: {
                    items: 3,
                    nav: true,
                },
                1000: {
                    items: 5,
                    loop: false,
                    nav: false,
                },
                1200: {
                    items: 5,
                    loop: false,
                    nav: true,
                }
            },

        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
});

$(window).load(function () {
    $('#myModal').modal('show');
});