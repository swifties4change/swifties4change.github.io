(function (Drupal, $, window, once) {
  'use strict';

  Drupal.behaviors.accordions = {
    _isInvokedByDocumentReady: true,
    attach: function (context, settings) {
      if (this._isInvokedByDocumentReady) {
        $(once('accordion', '.base__accordions .accordion-title', context)).click(function () {
          var height = $(this).next('div').prop('scrollHeight') + 40;
          $(this).toggleClass('open');
          $(this).siblings().removeClass('open');
          $(this).siblings('div').css('max-height', 0);
          if ($(this).hasClass('open')) {
            $(this).next('div').css('max-height', height);
          }
          else {
            $(this).next('div').css('max-height', 0);
          }
        });
        // On enter for accessibility
        $(once('accordion', '.base__accordions .accordion-title', context)).keypress(function (e) {
          if (e.which == 32) {
            var height = $(this).next('div').prop('scrollHeight') + 40;
            $(this).toggleClass('open');
            $(this).siblings().removeClass('open');
            $(this).siblings('div').css('max-height', 0);
            if ($(this).hasClass('open')) {
              $(this).next('div').css('max-height', height);
            }
            else {
              $(this).next('div').css('max-height', 0);
            }
            return false;//to fix the scrolling down on space bar key press
          }
        });
      }

    }
  };
}(Drupal, jQuery, this, once));
