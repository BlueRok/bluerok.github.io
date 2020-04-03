var loadPartsDir = "/-loadParts/"
var imagesDir = "/-images/"
var isTouchScreenDevice
var parseBoolean
var autoScrollTimer
$(function () {
    isTouchScreenDevice = ('ontouchstart' in window) || ('onmsgesturechange' in window)
    parseBoolean = function (value) {
        return value == "true"
    }

    var header = $("header")
    header.load(loadPartsDir + "header.html")
    header.on("focus", "a", function () {
        if (header.children("#hamburger").is(":visible")) {
            $(this).trigger("blur")
        }
    })
    header.on("click", "a", function () {
        if (header.children("#hamburger").is(":visible")) {
            function propagateHeightChange(elem, height) {
                if (elem.is("ul")) {
                    var heightStr = elem.css("height")
                    elem.css("height", (parseInt(heightStr.substr(0, heightStr.length - 2)) + height) + "px")
                    propagateHeightChange(elem.parent().parent(), height)
                }
            }
            if ($(this).parent().hasClass("active")) {
                var ul = $(this).parent().children("ul")
                var heightStr = ul.css("height")
                propagateHeightChange(ul, -parseInt(heightStr.substr(0, heightStr.length - 2)))
                $(this).parent().find("li").removeClass("active")
                $(this).parent().find("ul").css("height", "0px")
            } else {
                var ul = $(this).parent().children("ul")
                var lis = ul.children()
                var heightStr = lis.find("a").css("height")
                propagateHeightChange(ul, lis.length * parseInt(heightStr.substr(0, heightStr.length - 2)))
            }
            $(this).parent().toggleClass("active")
            $(this).trigger("blur")
        }
    })
    header.on("change", "#navToggle", function () {
        if ($(this).is(":checked")) {
            var ul = header.find("nav").children("ul")
            var lis = ul.children()
            var heightStr = $(lis[0]).css("height")
            ul.css("height", lis.length * parseInt(heightStr.substr(0, heightStr.length - 2)) + "px")

        } else {
            header.find("li").removeClass("active")
            header.find("ul").css("height", "0px")
        }
    })

    $("footer").load(loadPartsDir + "footer.html");

    var hamburgerBeenVisible = false
    $(window).resize(function () {
        if (!(header.children("#hamburger").is(":visible"))) {
            header.find("li").removeClass("active")
            header.find("ul").css("height", "")
            var navToggle = header.children("#navToggle")
            if (hamburgerBeenVisible == true) {
                var uls = header.find("nav > ul ul")
                var ogDisplay = $(uls[0]).css("display")
                uls.css("display", "none").delay(1).queue(function () {
                    $(this).css("display", ogDisplay)
                })
            }
            navToggle.prop("checked", false)
            hamburgerBeenVisible = false
        } else {
            hamburgerBeenVisible = true
        }
    })
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

    autoScrollTimer = function (targetY) {
        var startingY = window.pageYOffset;
        scroller = setInterval(function () {
            autoScroll(startingY, targetY)
        }, 1);
    }
});
