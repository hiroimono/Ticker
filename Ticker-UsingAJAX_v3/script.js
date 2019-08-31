(function() {

    $.ajax({
        url: '/data.json',
        method: 'GET',
        success: function(response) {
            var links = $('a');
            for (var i = 0; i < response.length; i++) {
                links.eq(i).attr('href', response[i].url);
                links.eq(i).html(response[i].text);
            }
            for(var k = response.length; k < 2*response.length; k++){
                links.eq(k).attr('href', response[k-6].url);
                links.eq(k).html(response[k-6].text);
            }

        },
        error: function(err) {
            console.log('err: ', err);
        }
    });

    ticker('ticker1', -1);
    ticker('ticker2', 1);

    function ticker(id, step) {
        var ticker = document.getElementById(id);
        var headlines = ticker.querySelector('.headlines');
        var links = headlines.getElementsByTagName('A');
        var curX = headlines.offsetLeft;
        var headlinesWidth = headlines.offsetWidth;
        var tickerWidth = ticker.offsetWidth;
        var linkWidth = step < 0 ? links[0].offsetWidth : links[links.length - 1].offsetWidth;
        var animId;

        headlines.addEventListener('mouseenter', function(e) {
            cancelAnimationFrame(animId);
        });

        headlines.addEventListener('mouseleave', function() {
            moveHeadlines();
        });

        moveHeadlines();

        function moveHeadlines() {
            curX += step;
            if (step < 0 && curX < -linkWidth) {
                curX += linkWidth;
                headlines.appendChild(links[0]);
                linkWidth = links[0].offsetWidth;
            }
            if (step > 0 && curX + headlinesWidth > tickerWidth + linkWidth) {
                curX -= linkWidth;
                headlines.insertBefore(links[links.length - 1], links[0]);
                linkWidth = links[links.length - 1].offsetWidth;
            }
            headlines.style.left = curX + 'px';
            animId = requestAnimationFrame(moveHeadlines);
        }
    }
})();
