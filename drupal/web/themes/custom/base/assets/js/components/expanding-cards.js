(function (Drupal, $, window) {
  'use strict';

  Drupal.behaviors.expandingCards = {
    attach: function (context, settings) {
      $('.expanding-card .expand-toggle').click(function() {
          let height = $(this).parent().find('.expand-content').prop('scrollHeight');
          $(this).toggleClass('open');
          $(this).parent('.expanding-card').toggleClass('expanded');
          if ($(this).hasClass('open')) {
            $(this).prev('div').css('height', height);
          }
          else {
             $(this).prev('div').css('height', 0);
          }
        });
        enquire.register("screen and (max-width:992px)", {

          // OPTIONAL
          // If supplied, triggered when a media query matches.
          match: function () {
            $('.base__expanding-cards .grid').each(function(){
              let $slider = $(this);
              $slider.slick({
                slidesToShow: 1,
                slidesToScroll:1,
                adaptiveHeight: true,
                prevArrow: $slider.prev('.arrows').find('.prev-slide'),
                nextArrow: $slider.prev('.arrows').find('.next-slide'),
              });
            });
          },

          // OPTIONAL
          // If supplied, triggered when the media query transitions
          // *from a matched state to an unmatched state*.
          unmatch: function () {},

          // OPTIONAL
          // If supplied, triggered once, when the handler is registered.
          setup : function() {},

          // OPTIONAL, defaults to false
          // If set to true, defers execution of the setup function
          // until the first time the media query is matched
          deferSetup : true,

          // OPTIONAL
          // If supplied, triggered when handler is unregistered.
          // Place cleanup code here
          destroy : function() {}

      });



    }
  };
}(Drupal, jQuery, this));
