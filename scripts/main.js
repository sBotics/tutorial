const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get('lang');

$(document).ready(function() {
    $( ".hamburger-menu" ).click(function() {
        $( ".hamburger-menu" ).toggleClass( "pressed" );
        $( ".side-navigation" ).toggleClass( "hidden" );
    });
    
    // propagates the chosen language to other anchors in the page
    $( "a" ).each(function() {
        var href= $(this).attr("href");
        if(href[0] != '#')
            $(this).attr("href", href + "?lang=" + language);
    });

    // changes text to the desired language
    switch(language) {
        case "pt-br":
            $.getJSON("https://sbotics.github.io/tutorial/scripts/pt-br.json", function(json){
                $( ".text" ).each(function() {
                    var location = $(this).html().split(':');
                    $(this).html(json[location[0]][location[1]]);
                });
            });
            break;
        default:
            $.getJSON("https://sbotics.github.io/tutorial/scripts/en.json", function(json){
                $( ".text" ).each(function() {
                    var location = $(this).html().split(':');
                    $(this).html(json[location[0]][location[1]]);
                });
            });
    }
});