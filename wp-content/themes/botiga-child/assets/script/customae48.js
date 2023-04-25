jQuery(document).ready(function() {

    /*top menu toggle*/
    jQuery('.menu-btn').click(function(){
        jQuery('.header-nav').toggleClass('vis');
        jQuery('body').toggleClass('oh');
        jQuery(this).toggleClass('close');
    });

    /*end top menu toggle*/

    jQuery('.header-nav__item_subnav').click(function(){
        jQuery(this).toggleClass('open');
    });

    jQuery(".header-lang").click(function () {
        jQuery(this).text(function(i, text){
            return text === "ru" ? "en" : "ru";
        })
    });

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
    /*scroll to top*/
    var scrollTop = jQuery(".scroll-top");
    jQuery(window).scroll(function() {
        var topPos = jQuery(this).scrollTop();
        if (topPos > 700) {
            jQuery(scrollTop).addClass('vis');
        } else {
            jQuery(scrollTop).removeClass('vis');
        }
    });
    jQuery(scrollTop).click(function() {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    /*end scroll to top*/
});








