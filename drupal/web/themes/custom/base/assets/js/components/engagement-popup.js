(function (Drupal, Cookies) {
  'use strict';

  Drupal.behaviors.engagement_popup = {
    idAttribute: 'data-engagement-popup',
    engagementPopup: function($popup){
      const config = {
        id: $popup.getAttribute(this.idAttribute),
        scrollDepth: parseInt($popup.getAttribute('data-scroll-depth')),
        timeOnPage: parseInt($popup.getAttribute('data-time-on-page')) * 1000,
        cookieExpiry: parseInt($popup.getAttribute('data-cookie-expiry')),
      };
      const cookieKey = `engagement-popup-${config.id}`;
      let closeCookie = Cookies.get(cookieKey);
      if (closeCookie) {
        return;
      }
      const $closeButton = $popup.querySelector('.close');
      const $form = $popup.querySelector('form');

      const closeHandler = function(){
        $popup.classList.remove('active');
        Cookies.set(cookieKey, 'closed', {
          expires: config.cookieExpiry
        });
        closeCookie = true;
      };
      const checkIfShouldOpen = function(cb){
        return function(){
          if (closeCookie) {
            return;
          }
          if ($popup.classList.contains('active')) {
            return;
          }
          cb.apply(this, arguments);
        };
      };

      if ($closeButton) {
        $closeButton.addEventListener('click', function(){
          closeHandler();
        });
      }

      if ($form) {
        $form.addEventListener('submit', closeHandler);
      }

      document.addEventListener('scroll', checkIfShouldOpen(function(){
        const body = document.body
        const html = document.documentElement;
        const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const triggerPercentage = config.scrollDepth;
        const percentage = (document.documentElement.scrollTop / (height - window.innerHeight)) * 100;
        if (percentage > triggerPercentage) {
          $popup.classList.add('active');
        }
      }));

      setTimeout(checkIfShouldOpen(function(){
        $popup.classList.add('active');
      }), config.timeOnPage);
    },
    attach: function ($context, settings) {
      if ($context.hasAttribute(this.idAttribute)) {
        this.engagementPopup($context)
      } else {
        $context.querySelectorAll(`[${this.idAttribute}]`).forEach(this.engagementPopup);
      }
    }
  };

}(Drupal, Cookies));
