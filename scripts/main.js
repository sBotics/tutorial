const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get('lang');

// languages
var PT_BR;
var EN;

$.getJSON("https://sbotics.github.io/tutorial/content/pt-br.json", function(json){
    PT_BR = json;
});
$.getJSON("https://sbotics.github.io/tutorial/content/en.json", function(json){
    EN = json;
});

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
    $( ".text" ).each(function() {
        var location = $(this).html().split(':');
        switch(language) {
            case "pt-br":
                $(this).html(PT_BR[location[0]][location[1]]);
                break;
            default:
                $(this).html(EN[location[0]][location[1]]);
        }
    });
});