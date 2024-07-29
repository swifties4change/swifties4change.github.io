(function ($, Drupal, drupalSettings) {
  "use strict";

  // Check if IE
  function initDIE() {
    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(ua);

    if (isIE) {
      document.documentElement.classList.add('ie');
      $('body').append('<div class="browser-alert"><div class="close"><i class="icon-close"></i></div><h2>This browser is no longer supported.</h2><p>For a better user experience, please use one of the following supported browsers.</p><div class="browser-list"> <a href="https://www.mozilla.org/en-US/firefox/download/thanks/" target="_blank">Firefox</a> <a href="https://www.google.com/chrome/" target="_blank">Chrome</a> <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjqwum3nYLsAhW0gnIEHVTjC2cQjBAwAXoECAEQAg&url=https%3A%2F%2Fsupport.microsoft.com%2Fen-us%2Fhelp%2F4501095%2Fdownload-the-new-microsoft-edge-based-on-chromium&usg=AOvVaw2-zEXx1n93xDJhr8p7lPEi" target="_blank">Edge</a> </div></div>');

      $('.browser-alert .close').click(function () {
        $('.browser-alert').toggleClass('closed');
      });
    }
  }

  //Hero :has polyfill for firefox
  function hasPoly(context) {
    $('.base__hero.has-text', context).parents('.banner').addClass('has-text');
  }

  //Hero :hasimage
  function hasheroImage(context) {
    if (context.querySelector) {
      if (context.querySelector('.base__hero.has-img')) {
        document.querySelector('body').classList.add('has-hero-image')
      }
    }
  }

  // Responsive table wrap
  function tableWrap(context) {
    $('table', context).wrap('<div class="responsive-table"></div>');
  }

  // Various toggles
  function toggleMenu() {

    // Main nav toggles
    $('.nav-toggle').click(function () {
      $('body').toggleClass('nav-open');
      $('body').removeClass('search-open');
    });
    $('.search-toggle').click(function () {
      $('body').toggleClass('search-open');
      $('body').removeClass('nav-open');
      $(".site-search input").focus();
    });
    $('.nav-close').click(function () {
      $('body').removeClass('nav-open');
      $('body').removeClass('search-open');
    })

    // Filter toggle
    $(".filter-toggle").click(function () {
      $("body").toggleClass("filter-open");
    });


    // On enter for accessibility
    $('.nav-toggle').keypress(function (e) {
      if (e.which == 13) {
        $('.nav-toggle').click();
      }
    });
    $('.search-toggle').keypress(function (e) {
      if (e.which == 13) {
        $('.search-toggle').click();
      }
    });
    $('.nav-close').keypress(function (e) {
      if (e.which == 13) {
        $('.nav-close').click();
      }
    });
  }

  // Section toggle for mobile
  function toggleSection() {
    $('.menu-toggle').click(function () {
      var height = $(this).next('div').prop('scrollHeight');
      $(this).toggleClass('open');
      $(this).next('div').css('max-height', 0);
      if ($(this).hasClass('open')) {
        $(this).next('div').css('max-height', height + 35);
      }
      else {
        $(this).next('div').css('max-height', 0);
      }
    });
    $('.parent').click(function () {
      $(this).toggleClass('open');
    });
  }

  //Add class to header when scrolled
  function headerScroll() {
    var $header = $('.header');
    var $headerHeight = $header.outerHeight();

    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= $headerHeight) {
        $("body").addClass("scroll");
      } else {
        $("body").removeClass("scroll");
      }
    });
  }

  // Smooth Scroll
  function initSmoothScroll() {
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 150
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
  }

  // Hide drawer region when empty
  function hideEmptyDrawer() {
    if ($('.site-alert').not('.hidden').length == 0) {
      $('section.drawer').addClass('hidden');
    }
  }

  // Add class to external links
  function externalLinks(context) {
    $('a[href*="//"]:not([href*="' + document.location.hostname + '"])', context).attr("target", "_blank").addClass("external");
  }

  Drupal.behaviors.base = {
    _isInvokedByDocumentReady: true,
    attach: function (context) {
      if (this._isInvokedByDocumentReady) {
        toggleMenu(context);
        toggleSection(context);
        initSmoothScroll(context);
        initDIE(context);
        headerScroll(context);
        hasPoly(context);
        externalLinks(context);
        hideEmptyDrawer(context);
        hasheroImage(context);
        tableWrap(context);
        this._isInvokedByDocumentReady = false;

      }
    }
  };
})(jQuery, Drupal, drupalSettings);
