(function (Drupal, $, window) {
  'use strict';

  Drupal.behaviors.testimonials = {
    attach: function (context, settings) {
      $(once('testimonials', '.base__testimonials .slider', context)).each(function(){
        let $slider = $(this);
        if (typeof $slider.slick !== 'undefined') {
          $slider.slick({
            slidesToShow: 1,
            slidesToScroll:1,
            adaptiveHeight: true,
            arrows: false,
            dots: true,
            rows: 0,
          });
          let slider_count = $('.base__testimonials', $slider).length;
          if (slider_count === 1) {
            $('.slick-dots', $slider).hide();
          }
        }
      });

    }
  };
}(Drupal, jQuery, this));
