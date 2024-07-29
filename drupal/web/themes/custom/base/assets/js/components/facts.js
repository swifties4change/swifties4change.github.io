(function (Drupal, $, window) {
    'use strict';

    Drupal.behaviors.facts = {
        attach: function (context, settings) {
            $.fn.inViewport = function (cb) {
                return this.each(function (i, el) {
                    function visPx() {
                        let H = $(this).height(),
                            r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
                        return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
                    } visPx();
                    $(window).on("resize scroll", visPx);
                });
            };

            $(".count").inViewport(function (px) { // Make use of the `px` argument!!!
                // if element entered V.port ( px>0 ) and
                // if prop initNumAnim flag is not yet set
                //  = Animate numbers
                if (px > 0 && !this.initNumAnim) {
                    this.initNumAnim = true; // Set flag to true to prevent re-running the same animation
                    $(this).prop('Counter', 0).prop('isDecimal', parseInt($(this).text()) == parseFloat($(this).text())).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 1000,
                        step: function (now) {
                            if ($(this).prop('isDecimal'))
                                $(this).text(parseFloat(now.toFixed(0)).toLocaleString("en-US"));
                            else
                                $(this).text(parseFloat(now.toFixed(1)).toLocaleString("en-US"));
                        }
                    });
                }
            });
        }
    };
}(Drupal, jQuery, this));
