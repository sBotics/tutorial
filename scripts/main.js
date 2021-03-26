$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const language = urlParams.get('lang');
    
    $( ".hamburger-menu" ).click(function() {
        $( ".hamburger-menu" ).toggleClass( "pressed" );
        $( ".side-navigation" ).toggleClass( "hidden" );
    });
    $( "a" ).each(function() {
        var href= $(this).attr("href");
        if(href[0] != '#')
            $(this).attr("href", href + "?lang=" + language);
    });
    switch(language) {
        case "pt-br":
            $( ".EN" ).addClass( "d-none" );
            break;
        default:
            $( ".PT-BR" ).addClass( "d-none" );
    }
});