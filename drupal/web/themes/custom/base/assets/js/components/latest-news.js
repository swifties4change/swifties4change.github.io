(function (Drupal, $, window) {
    'use strict';

    Drupal.behaviors.newsSlider = {
        attach: function (context, settings) {
        var $jq = jQuery.noConflict();
        jq(once('latest-news', '.latest-news .view-content', context)).each(function () {
                let $newsSlider = $jq(this);
                if (typeof $newsSlider.slick !== 'undefined') {
                    $newsSlider.slick({
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        centerMode: true,
                        responsive: [
                          {
                              breakpoint: 1024,
                              settings: {
                                  slidesToShow: 2,
                                  slidesToScroll: 1,
                              }
                          },
                          {
                              breakpoint: 768,
                              settings: {
                                  slidesToShow: 1,
                                  slidesToScroll: 1,
                              }
                          }
                        ]
                    });
                }
            });
        }
    };
}(Drupal, jQuery, this));
