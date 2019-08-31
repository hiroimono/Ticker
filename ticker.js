(function() {
  var headlines = document.getElementById("headlines");
  var links = headlines.getElementsByTagName("a");
  var left = headlines.offsetLeft;
  var move;
  var moveHeadlines = function() {
    left--;
    if (left < -links[0].offsetWidth) {
      var first_Child = links[0];
      headlines.removeChild(first_Child);
      headlines.appendChild(first_Child);
      left = 4;
      links = headlines.getElementsByTagName("a");
    }
    headlines.style.transform = "translateX(" + left + "px)";
    move = requestAnimationFrame(moveHeadlines);
  };
  moveHeadlines();
  headlines.addEventListener("mouseenter", function() {
    cancelAnimationFrame(move);
  });
  headlines.addEventListener("mouseleave", function() {
    requestAnimationFrame(moveHeadlines);
  });
})();
