(function (Drupal, $, window) {
  'use strict';

  Drupal.behaviors.timeline = {
    attach: function (context, settings) {

      $(once('timeline', '.timeline .items', context)).each(function () {
        let $slider = $(this);

        if (typeof $slider.slick !== 'undefined') {
          $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true,
            rows: 0,
            prevArrow: $slider.next('.arrows').find('.prev-slide'),
            nextArrow: $slider.next('.arrows').find('.next-slide'),
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          });
        }
      });
    }
  };
}(Drupal, jQuery, this));
