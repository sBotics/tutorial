$(document).ready(function () {
  $(".hamburger-menu").click(function () {
    $(".hamburger-menu").toggleClass("pressed");
    $(".side-navigation").toggleClass("hidden");
  });

  // propagates the chosen language to other anchors in the page
  // $("a").each(function () {
  //   var href = $(this).attr("href");
  //   if (href[0] != "#") $(this).attr("href", href + "?lang=" + language);
  // });
});
