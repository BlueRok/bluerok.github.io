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
                uls.css("display", "none")
                uls[0].offsetHeight;
                uls.css("display", "")
            }
            navToggle.prop("checked", false)
            hamburgerBeenVisible = false
        } else {
            hamburgerBeenVisible = true
        }
    })
});

function customAlert(title, text) {
    document.getElementsByClassName('alert__box__header__title')[0].innerHTML = title
    document.getElementsByClassName('alert__box__text')[0].innerHTML = text
    document.getElementsByClassName('alert')[0].classList.add('alert--show')
}
