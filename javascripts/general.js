$(function () {
    $("nav").load("nav.html");
    
    function shrinkHeader() {
        var scrollDistance = window.pageYOffset;
        var header = document.getElementsByTagName("header")[0];
        var maxHeaderHeight = 118.5;
        var h1 = header.getElementsByTagName("h1")[0];
        var maxH1Size = 80;
        var minHeaderHeight = maxHeaderHeight - maxH1Size;
        if (scrollDistance < maxH1Size) {
            if ((maxHeaderHeight - scrollDistance) < 175) {
                header.style.height = (maxHeaderHeight - scrollDistance) + "px";
                h1.style.fontSize = (maxHeaderHeight - scrollDistance - minHeaderHeight) + "px";
                h1.style.lineHeight = (maxHeaderHeight - scrollDistance - minHeaderHeight) + "px";
                h1.style.opacity = (maxHeaderHeight - scrollDistance - minHeaderHeight) / maxH1Size;
                h1.style.visibility = "visible";
            } else {
                header.style.height = (maxHeaderHeight + 56.5) + "px";
                h1.style.fontSize = (maxHeaderHeight + 56.5 - minHeaderHeight) + "px";
                h1.style.lineHeight = (maxHeaderHeight + 56.5 - minHeaderHeight) + "px";
                h1.style.opacity = 1;
                h1.style.visibility = "visible";
            }
        } else {
            header.style.height = minHeaderHeight + "px";
            h1.style.fontSize = "0px";
            h1.style.lineHeight = "0px";
            h1.style.opacity = "0";
            h1.style.visibility = "hidden";
        }
    }
    window.onscroll = function () {
        shrinkHeader()
    };

    var scroller;

    function autoScroll(startingY, targetY) {
        var duration = 300;
        var absoluteSpeed = Math.abs(targetY - startingY) / duration;
        var scrollSpeed = 0;
        if (startingY > targetY) {
            scrollSpeed = -absoluteSpeed;
        } else if (startingY < targetY) {
            scrollSpeed = absoluteSpeed;
        }
        window.scroll(window.pageXOffset, window.pageYOffset + scrollSpeed);
        if (((startingY >= targetY) && (window.pageYOffset <= targetY)) || ((startingY <= targetY) && (window.pageYOffset >= targetY))) {
            clearInterval(scroller);
        }
    }

    function autoScrollTimer(targetY) {
        var startingY = window.pageYOffset;
        scroller = setInterval(function () {
            autoScroll(startingY, targetY)
        }, 1);
    }
});
