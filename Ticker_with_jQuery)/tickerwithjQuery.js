(function() {
    var headlines = $("#headlines");
    console.log(headlines);

    var links = $(".headline");
    console.log(links);

    var left = headlines.offset().left;
    console.log(left);

    var move;

    var moveHeadlines = function() {
        left--;
        if (left < -links.eq(0).outerWidth(true)) {
            var first_Child = links.eq(0);
            headlines.find(':first-child').remove();
            headlines.prepend(first_Child);
            left = 4;
            links = $(".headline");
        }
        headlines.css("transform", "translateX(" + left + "px)");
        move = requestAnimationFrame(moveHeadlines);
    };
    moveHeadlines();
    headlines.on("mouseenter", function() {
        cancelAnimationFrame(move);
    });
    headlines.on("mouseleave", function() {
        requestAnimationFrame(moveHeadlines);
    });
})();
