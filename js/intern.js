window.onscroll = function () {
    myFunction()
};

var Gallery = new Swiper('.gallery-swiper', {
    nextButton: '.gallery-swiper .button-next',
    prevButton: '.gallery-swiper .button-previous',
    slidesPerView: 1,
    centeredSlides: false,
    grabCursor: true,
    preloadImages: true,
    lazyLoading: true,
    spaceBetween: 2
});

if (Gallery.container.length > 0) {
    Gallery.on('slideChangeStart', function () {
        $(".slide-indicator strong").html((parseInt($(".swiper-slide-active").attr("slide-index")) + 1));
        ga('send', {
            'hitType': 'pageview',
            'page': '/detail-foto/' + Gallery.activeIndex
        });
    });
};

$(document).ready(function () {
    var TotalSlide = $(".swiper-slide").length;
    var Indicator = '<strong>' + (parseInt($(".swiper-slide-active").attr("slide-index")) + 1) + '</strong> / ' + TotalSlide + ' foto';
    $(".indicator").html(TotalSlide + " foto");
    $(".slide-indicator").html(Indicator);
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
        dots: false,
        loop: true,
        autoHeight: true,
        responsiveRefreshRate: 200,
        navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            margin: 10,
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

var sidebar = document.getElementById('sidebar');
Stickyfill.add(sidebar);


$(document).ready(function () {

    "use strict";

    // $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    // $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    // $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\">Navigation</a>");
    // $(".menu > ul > li").hover(function (e) {
    //     if ($(window).width() > 943) {
    //         $(this).children("ul").stop(true, false).fadeToggle(150);
    //         e.preventDefault();
    //     }
    // });
    // $(".menu > ul > li").click(function () {
    //     if ($(window).width() <= 943) {
    //         $(this).children("ul").fadeToggle(150);
    //     }
    // });
    // $(".menu-mobile").click(function (e) {
    //     $(".menu > ul").toggleClass('show-on-mobile');
    //     e.preventDefault();
    // });

    // $(function () {
    //     var pageGladis = $("#load-more-btn").attr('next-page');
    //     $("#load-more-btn").attr('href', '#');
    //     $("#load-more-loading").hide();
    //     $('#load-more-btn').click(function (event) {
    //         event.preventDefault();
    //         var button = $(this).val();
    //         $.ajax({
    //             url: 'http://nama-domain/galeri/' + pageGladis,
    //             dataType: 'html',
    //             beforeSend: function () {
    //                 $("#load-more-loading").show();
    //                 $("#load-more-btn").hide();
    //             },
    //             success: function (data)
    //             {
    //                 $("#load-more-loading").hide();
    //                 $("#load-more-btn").show();
    //                 var placement = $('.section-media').last();
    //                 placement.append(data);
    //                 pageGladis = parseInt(pageGladis) + 1;
    //                 $("#load-more-btn").attr('next-page', pageGladis);
    //                 if (data == false) {
    //                     $("#load-more-btn").hide();
    //                 }
    //             }
    //         });
    //         return false;
    //     });
    // });
})(jQuery);