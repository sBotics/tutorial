$(document).ready(function() {
    $(".hamburger-menu").click(function() {
        $(".hamburger-menu").toggleClass("pressed");
        $(".side-navigation").toggleClass("hidden");
    });
    var $doc = $('html, body');
    $('a').click(function() {
        console.log("Aqui Scrooll")
        $doc.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 100
        }, 500);
    });
});