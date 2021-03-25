$(document).ready(function(){
    $( ".hamburger-menu" ).click(function() {
        $( ".hamburger-menu" ).toggleClass( "pressed" );
        $( ".side-navigation" ).toggleClass( "hidden" );
    });
});