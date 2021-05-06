$(document).ready(function() {
    $(".hamburger-menu").click(function() {
        $(".hamburger-menu").toggleClass("pressed");
        $(".side-navigation").toggleClass("hidden");
    });

    var $doc = $('html, body');
    $('a').click(function() {
        $doc.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 100
        }, 500);
    });
});