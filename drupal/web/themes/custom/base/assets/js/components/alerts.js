(function (Drupal, $, Cookies) {
  'use strict';

  Drupal.behaviors.alert = {
    attach: function (context, settings) {
      $('[data-alert]', context === document ? context : $(context).parent()).each(function () {
        const $self = $(this);
        const id = $self.attr('data-alert');
        const cookieName = 'alert-' + id;

        const expirationCookieFound = Cookies.get(cookieName);
        if (expirationCookieFound) {
          return;
        }

        $self.addClass('shown');

        //adjust for hero images
        var $drawer = $('.drawer');
        var $drawerOuterHeight = $drawer.outerHeight() + 10;
        var $header = $('.has-hero-image .header');
        var $adminHeader = $('.has-hero-image.header');


        $(window).on("load", function () {
          console.log("on load alert height is " + $drawerOuterHeight)
          $header.css('top', $drawerOuterHeight)
          $adminHeader.css('top', $drawerOuterHeight + 80 + "!important")
          if ($("body").hasClass("toolbar-fixed")) {
            console.log("has toolbar")
            $header.css('top', $drawerOuterHeight + 80)
          }
          else {
            $header.css('top', $drawerOuterHeight)
          }
        });


        // $(window).scroll(function () {
        //   var scroll = $(window).scrollTop();

        //   if (scroll >= $headerHeight) {
        //     $header.css('top', 0)
        //     $adminHeader.css('top', 80)
        //   } else {
        //     var $drawerOuterHeight = $drawer.outerHeight() + 10;
        //     // $header.css('top', $drawerOuterHeight)
        //     $adminHeader.css('top', $drawerOuterHeight + 80)
        //   }
        // });
        $('.alert-close').click(function () {
          var $drawerNewOuterHeight = $drawer.outerHeight() + 10;
          $header.css('top', $drawerNewOuterHeight + 10)
          $adminHeader.css('top', $drawerNewOuterHeight + 80)
        });

        $self.find('.alert-close').click(function () {
          $self.removeClass('shown');
          const expirationMap = {
            '7 days': 7,
            '14 days': 14,
            '30 days': 30,
            // https://developer.chrome.com/blog/cookie-max-age-expires/
            'never': 400,
          };
          const expiryKey = $self.attr('data-expiry');
          if (Object.hasOwn(expirationMap, expiryKey)) {
            Cookies.set(cookieName, 1, { expires: expirationMap[expiryKey] });
          }
        });
      });
    },
  };
}(Drupal, jQuery, Cookies));
