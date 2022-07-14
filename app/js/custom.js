$(document).ready(function() {

    /*top menu toggle*/
    $('.menu-btn').click(function(){
        $('.header-nav').toggleClass('vis');
        $('body').toggleClass('oh');
        $(this).toggleClass('close');
    });

    /*end top menu toggle*/

    $('.header-nav__item_subnav').click(function(){
        $(this).toggleClass('open');
    });

    $(".header-lang").click(function () {
        $(this).text(function(i, text){
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
    var scrollTop = $(".scroll-top");
    $(window).scroll(function() {
        var topPos = $(this).scrollTop();
        if (topPos > 700) {
            $(scrollTop).addClass('vis');
        } else {
            $(scrollTop).removeClass('vis');
        }
    });
    $(scrollTop).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    /*end scroll to top*/
});








