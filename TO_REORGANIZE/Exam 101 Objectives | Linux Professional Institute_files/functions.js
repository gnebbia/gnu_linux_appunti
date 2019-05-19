(function($) {    
    $(window).load(function(){
        if(jQuery('body').hasClass('node-type-japan-individual')){
            if(jQuery(window).width() > 767){
                jQuery('.node-type-japan-individual .japan-section-item').each(function(){
                    var maxHeight = 0;
                    var section = this;
                    jQuery(section).find('.box.sync .inner-box').each(function(){
                        if(jQuery(this).innerHeight() > maxHeight){
                            maxHeight = jQuery(this).innerHeight();
                        }
                    });
                    jQuery(section).find('.box.sync .inner-box').innerHeight(maxHeight);
                    
                    maxHeight = 0;
                    jQuery(section).find('.box.sync-dual .inner-box').each(function(){
                        if(jQuery(this).innerHeight() > maxHeight){
                            maxHeight = jQuery(this).innerHeight();
                        }
                    });
    
                    jQuery(section).find('.box.sync-dual .inner-box').innerHeight(maxHeight);
                });
            }
        }
    })
    
    $(document).ready(function() {
        
        if(jQuery('body').hasClass('page-search')){
            $(document).on('keypress',function(e) {
                if(e.which == 13) {
                    return false;
                }
            });
        }
        
        var current_lang = document.getElementsByTagName('html')[0].getAttribute('lang');
        if(current_lang == 'ja'){
            jQuery('a[href="http://www.vue.com/lpi"]').attr('href','https://www.pearsonvue.co.jp/Clients/LPI.aspx')
        }

        // if (!$('body').hasClass("node-type-course") && !$('body').hasClass("page-node-82")) {
           $('#header').addClass("Fixed");
           $('body').addClass('header-fix');
            $(window).scroll(function() {
                if ($(window).scrollTop() > 0) {
                        $('body').addClass('scrolled');
                    }
                    else {
                        $('body').removeClass('scrolled');
                    }
            });
        // }

        $('.desktop-menu .navbar-nav > li').each(function(e){
            if( $('a',$(this)).hasClass('level2') ){
                /*var li2 = $('.subcategories > .container > ul > li', $(this));
                for(var i = 0; i < 3; i+=3) {
                    li2.slice(i, i+3).wrapAll("<div class='column'></div>");
                }*/
            }else{
                var li = $('.subcategories > .container > ul > li', $(this));
                var total_li = li.length;
                if(total_li > 6 && total_li < 20){
                    var inc_li = Math.ceil(total_li/2);
                    for(var i = 0; i < total_li; i+=inc_li) {
                      li.slice(i, i+inc_li).wrapAll("<div class='column'></div>");
                    }
                } else if (total_li <= 7) {
                    $('.subcategories', $(this)).addClass('oneColumn');
                }
            }
            
        });
        

        var li3 = $('#important-skills .graph-legend li');
        for(var i = 0; i < li3.length; i+=3) {
          li3.slice(i, i+3).wrapAll("<div class='column'></div>");
        }


        var news_form = $('#newsletter .page-form .form-item');
        for(var i = 0; i < news_form.length; i+=3) {
          news_form.slice(i, i+3).wrapAll("<div class='column'></div>");
        }

        // $('.navbar-nav > li').each(function(){  
        //     $(this).on('mouseover', function(){
        //         $(this).children('.subcategories').stop(true).slideDown();
        //     }).on('mouseleave', function(){
        //         $(this).children('.subcategories').stop(true).slideUp();
        //     });

        //     $(this).children('.subcategories').on('mouseenter', function(){
        //         $(this).stop(true).clearQueue().show();
        //     }).on('mouseleave', function() {
        //         $(this).slideUp();
        //     });

        // });

         /*$('.desktop-menu .navbar-nav > li > a').on('click', function(){
            $(this).next('.subcategories').stop(true).slideToggle();
            $(this).parent('li').toggleClass('openMenu');
            
            $('.navbar-nav > li > a').not($(this)).each(function(){
               $(this).next('.subcategories').stop(true).slideUp();
               $(this).parent('li').removeClass('openMenu');
            });
            return false;
          });   */



        $('#mobile-menu .navbar-nav > li > a').click(function (event) {
               event.preventDefault();
               event.stopPropagation();
               return false;
        });

        $("#mobile-menu").mmenu();


        API = $("#mobile-menu").data("mmenu");
        
        $("#hamburger").click(function () {
            API.open();
        });        

        $("#hamburger").click(function () {
            API.close();
        });
        
        $('.no-click-menu').on('click', function(e){
           if($(this).prev().hasClass('mm-next')){
               $(this).prev().trigger('click');
           }
           event.preventDefault();
           event.stopPropagation();
           return false;
        });

        //var stHeight = $('.slick-track').height();
        //$('.slick-slide').css('height',stHeight + 'px' );

         $('#linux-professional .container > div').matchHeight();
        $('#get-involved .row > div').matchHeight();
        $('.percentages-detailes .row > div').matchHeight();
        $('.projects-slider .project').matchHeight();
        $('#training-program .row > div').matchHeight();
        $('.boxes .row > div').matchHeight();
        $('#events .box-articles .article').matchHeight();
        
        
        $('#text-image .container > div').matchHeight();
        $('#get-news .container > div').matchHeight();
        

        $('.projects-slider').slick({
              dots: true,
              infinite: true,
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 1,
              nextArrow: '<i class="right-arrow"></i>',
              prevArrow: '<i class="left-arrow"></i>',
              responsive: [
                {
                  breakpoint: 920,
                  settings: {
                    slidesToShow: 2,
                    dots: false,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    dots: false,
                  }
                }
              ]
        });

        
           var $carousel = $('.corporate-logos');
           function showSliderScreen($widthScreen) {
               
               if ($widthScreen < 1440) {
                   if (!$carousel.hasClass('slick-initialized')) {
                       $carousel.slick({
                          dots: false,
                          infinite: true,
                          speed: 300,
                          slidesToShow: 8,
                          slidesToScroll: 1,
                          nextArrow: '<i class="right-arrow"></i>',
                          prevArrow: '<i class="left-arrow"></i>',
                          responsive: [
                          {
                              breakpoint: 1420,
                              settings: {
                                slidesToShow: 7
                              }
                            },
                          {
                              breakpoint: 1280,
                              settings: {
                                slidesToShow: 6
                              }
                            },
                          {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 5
                              }
                            },
                            {
                              breakpoint: 920,
                              settings: {
                                slidesToShow: 4
                              }
                            },
                            {
                              breakpoint: 768,
                              settings: {
                                slidesToShow: 3
                              }
                            },
                            {
                              breakpoint: 580,
                              settings: {
                                slidesToShow: 2
                              }
                            },
                            {
                              breakpoint: 480,
                              settings: {
                                slidesToShow: 1
                              }
                            }
                          ]
                    });
                }

               } else {
                   if ($carousel.hasClass('slick-initialized')) {
                       $carousel.slick("unslick");
                   }
                }   
           }

           var widthScreen = $(window).width();
           $(window).ready(showSliderScreen(widthScreen)).resize(
               function () {
                   var widthScreen = $(window).width();
                   showSliderScreen(widthScreen);
               }
           );


           var $carousel1 = $('.percentages-detailes .row').not('.automatic');
           function showSliderScreen1($widthScreen1) {
               
               if ($widthScreen1 < 1440) {
                   if (!$carousel1.hasClass('slick-initialized')) {
                       $carousel1.slick({
                          dots: false,
                          infinite: true,
                          speed: 300,
                          slidesToShow: 3,
                          slidesToScroll: 1,
                          nextArrow: '<i class="right-arrow"></i>',
                          prevArrow: '<i class="left-arrow"></i>',
                          responsive: [
                          {
                              breakpoint: 1420,
                              settings: {
                                slidesToShow: 3
                              }
                            },
                          {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 2
                              }
                            },
                            {
                              breakpoint: 580,
                              settings: {
                                slidesToShow: 1
                              }
                            }
                          ]
                    });
                }

               } else {
                   if ($carousel1.hasClass('slick-initialized')) {
                       $carousel1.slick("unslick");
                   }
                }   
           }

           var widthScreen1 = $(window).width();
           $(window).ready(showSliderScreen1(widthScreen1)).resize(
               function () {
                   var widthScreen1 = $(window).width();
                   showSliderScreen1(widthScreen1);
               }
           );


           var $carousel2 = $('#quotes-boxes .row, .boxes .row');
           function showSliderScreen2($widthScreen2) {
               
               if ($widthScreen2 < 1440) {
                   if (!$carousel2.hasClass('slick-initialized')) {
                       $carousel2.slick({
                          dots: false,
                          infinite: true,
                          speed: 300,
                          slidesToShow: 3,
                          slidesToScroll: 1,
                          nextArrow: '<i class="right-arrow"></i>',
                          prevArrow: '<i class="left-arrow"></i>',
                          responsive: [
                          {
                              breakpoint: 1420,
                              settings: {
                                slidesToShow: 3
                              }
                            },
                          {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 2
                              }
                            },
                            {
                              breakpoint: 580,
                              settings: {
                                slidesToShow: 1
                              }
                            }
                          ]
                    });
                }

               } else {
                   if ($carousel2.hasClass('slick-initialized')) {
                       $carousel2.slick("unslick");
                   }
                }   
           }

           var widthScreen2 = $(window).width();
            
           $(window).ready(showSliderScreen2(widthScreen2)).resize(
               function () {
                   var widthScreen2 = $(window).width();
                   showSliderScreen2(widthScreen2);
               }
           );
   
   
           /* Header slider */
           var $carouselheader = $('.header-slider');
           function showSliderScreen3($widthScreen3) {
               
                   if (!$carouselheader.hasClass('slick-initialized')) {
                       $carouselheader.slick({
                          autoplay:true,
                          autoplaySpeed:4000,
                          dots: true,
                          infinite: true,
                          speed: 500,
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          nextArrow: '<i class="right-arrow"></i>',
                          prevArrow: '<i class="left-arrow"></i>',
                          responsive: [
                          {
                              breakpoint: 1420,
                              settings: {
                                slidesToShow: 1
                              }
                            },
                          {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 1
                              }
                            },
                            {
                              breakpoint: 580,
                              settings: {
                                slidesToShow: 1
                              }
                            }
                          ]
                    });
                }
           }

           var $widthScreen3 = $(window).width();
            
           $(window).ready(showSliderScreen3($widthScreen3)).resize(
               function () {
                   var $widthScreen3 = $(window).width();
                   showSliderScreen3($widthScreen3);
               }
           );
           /* //Header slider */

           
           var containerWidth = $("#page-banner .container").width();
           $("#page-banner .container .text-content").css("width", containerWidth/2);

           $( window ).resize(function() {
              var containerWidth = $("#page-banner .container").width();
              $("#page-banner .container .text-content").css("width", containerWidth/2);
           });


          $('.slick-slider').on('setPosition', function () {
            $(this).find('.slick-slide').height('auto');
            var slickTrack = $(this).find('.slick-track');
            var slickTrackHeight = $(slickTrack).height();
            $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
          });

         $( window ).resize(function() {
             $('.slick-slider').on('setPosition', function () {
              $(this).find('.slick-slide').height('auto');
              var slickTrack = $(this).find('.slick-track');
              var slickTrackHeight = $(slickTrack).height();
              $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
            });
         });

         $(".questions-box .question").click(function(){
            $(this).parent('.item').toggleClass("open");
         });

         $(".tabs:not('.fixed') a").click(function(e) {
            $(".tabs li").removeClass('current');
            $(this).parent().addClass('current');
             
            e.preventDefault();
            var tab = $(this).attr("href");
            var scroll_height = $(tab).offset().top - $('.tabs').height() - $('#header').height();
            
            $('html, body').animate({
              scrollTop: scroll_height
            }, 1000);
         });

         $(".tabs.fixed a").click(function(e) {
            $(".tabs.fixed li").removeClass('currentTab');
            $('.tabs.fixed li').removeClass("shown");
            $(this).parent().addClass('currentTab');
             
            e.preventDefault();
            var tab = $(this).attr("href");
            var scroll_height = $(tab).offset().top - $('.tabs.fixed').height() - $('#header').height();
            
            $('html, body').animate({
              scrollTop: scroll_height
            }, 1000);
          });

         $(document).on('click','.tabs.fixed li .arrows',function(){
            $('.tabs.fixed li').addClass('shown');
        });
         
         if ($('.tabs').length > 0) {
             var total = $('.tabs ul li').length/2;
             if(total > 0){
                var width_percent = 100/total + '%';
                $('.tabs ul li').css('width',width_percent);
             }
             
            // Cache selectors
            var lastId,
                topMenu = $(".tabs ul"),
                topMenuHeight = topMenu.outerHeight()+200,
                // All list items
                menuItems = topMenu.find("a"),
                // Anchors corresponding to menu items
                scrollItems = menuItems.map(function(){
                  var item = $($(this).attr("href"));
                  if (item.length) { return item; }
                });
             
             $(window).scroll(function(){
                // Get container scroll position
                var fromTop = $(this).scrollTop()+topMenuHeight;

                // Get id of current scroll item
                var cur = scrollItems.map(function(){
                  if ($(this).offset().top < fromTop)
                    return this;
                });
                // Get the id of the current element
                cur = cur[cur.length-1];
                var id = cur && cur.length ? cur[0].id : "";

                if (lastId !== id) {
                    lastId = id;
                    // Set/remove active class
                    menuItems
                      .parent().removeClass("current")
                      .end().filter("[href='#"+id+"']").parent().addClass("current");
                }                   
             });
         }
         
         /*
         $(".tabs a").click(function(event) {
            event.preventDefault();
            $('.tabs li').removeClass("current");
            $(this).parent('li').addClass("current");
            var tab = $(this).attr("href");
            $(".tab-content").not(tab).css("display", "none");
            $(tab).fadeIn();
            $('html, body').animate({
              scrollTop: $(".tabs").offset().top
          }, 1000);
        });
         */

        /*if ($('#getting-started-popup').length > 0) {
          $.magnificPopup.open({items: {src: '#getting-started-popup'},type: 'inline'}, 0);
          $(document).on('click', '.popup-modal-dismiss', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
          });
        }*/

        
        if($('.webform-component-boolean').length > 0){
            var label = $('.webform-component-boolean label');
            $('.webform-component-boolean input').after(label);
        }

        if ($('.language-trigger').length > 0) {
          $('.language-trigger').on('click',function(e){
              e.preventDefault();
             $('.language-block').slideToggle(); 
             return false;
          });
          
          var distance = $(window).width() - ($('.language-trigger').offset().left + $('.language-trigger').width()) - 67;
          $('.language-block').css('right',distance); 
        }
        
        /* Sticky tabs */
        if ($('body').hasClass("node-type-course") || $('body').hasClass("node-type-tab")) {
            var min_height = $('section.tabs').offset().top;
            
            $(window).scroll(function() {
                if ($(window).scrollTop() > min_height) {
                    $('body').addClass('tabsFixed');
                    $('.tabs.fixed').stop(true).slideDown();
                }
                else {
                    $('body').removeClass('tabsFixed');
                    $('.tabs.fixed').stop(true).hide();
                    $('.fixed-button-section').stop(true).slideUp();
                }
               
            }); 
            
            $( window ).resize(function() {
                var min_height = $('section.tabs').offset().top;
                $(window).scroll(function() {
                    if ($(window).scrollTop() > min_height) {
                        $('body').addClass('tabsFixed');
                        $('.tabs.fixed').stop(true).slideDown();
                        $('.fixed-button-section').stop(true).slideDown();
                    }
                    else {
                        $('body').removeClass('tabsFixed');
                        $('.tabs.fixed').stop(true).hide();
                        $('.fixed-button-section').stop(true).slideUp();
                    }
                }); 
            });
            
            
            /* When accessing tab pages with hash scroll higher because of the tabs */
            if(window.location.hash) {
                var hash = '#'+window.location.hash.substring(1);
                var scroll_height = $(hash).offset().top - $('.tabs').height() - $('#header').height() + 125;

                $('html, body').animate({
                  scrollTop: scroll_height
                }, 1000);
            }
            
        }
        /* //Sticky tabs */

        $('.no-click').on('click',function(e){
            e.preventDefault();
            return false;
        });
        
        if($('.webform-client-form input[name="submitted[i_agree]"]', $(this)).length > 0){
            $('.webform-client-form input[name="submitted[i_agree]"]',$(this)).prop('required',true);
        }


        $(".scrollLink").click(function(e) {
            e.preventDefault();
            var tab = $(this).attr("href");
            var scroll_height = $(tab).offset().top - $('#header').height() - $(tab).height() + 25;
            
            $('html, body').animate({
              scrollTop: scroll_height
            }, 1000);
         });

    });


})(jQuery);

$( window ).resize(function() {
  if ($('.language-trigger').length > 0) {
    var distance = $(window).width() - ($('.language-trigger').offset().left + $('.language-trigger').width()) - 67;
    $('.language-block').css('right',distance);
  }
});

function searchChangeFakeFilter(element){

    if(jQuery(element).val() == 'info'){
        jQuery('#edit-field-type-value-op').val('empty');
    } else {
        jQuery('#edit-field-type-value-op').val('or');
        jQuery('#edit-field-type-value').val(jQuery(element).val());
    }
    
    jQuery('#edit-submit-search:last-child').click();
}