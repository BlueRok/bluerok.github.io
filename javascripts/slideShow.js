$(function () {
    var $sliderContainer = $(".sliderContainer"), $slidesContainer = $sliderContainer.find(".slidesContainer"), $slides, $bubblesContainer = $sliderContainer.find(".bubblesContainer"), $bubbles, $bubbleSelectedBackground, $bubbleSelectedBorder, interval, maxWidth = 854, minWidth = 534, width = maxWidth, animationSpeedSlide = 750, animationSpeedTitle = 500, animationSpeedTagline = 750, animationSpeedHide = 500, currentTime = 0, pause = 7000, currentSlide = 1;
    function changeSlide(nextSlide) {
        if (!$slidesContainer.is(':animated')) {
            stopSlider();
            currentTime = 0;
            $(".slideTimer").css("width", width / pause * currentTime);
            if (currentSlide === 1) {
                $slides.eq($slides.length - 1).find(".side").find(".slideInfo").find("*").stop(true, true).hide(animationSpeedHide);
                $slides.eq($slides.length - 1).find(".bottom").find(".slideInfo").find("*").stop(true, true).slideUp(animationSpeedHide);
            }
            $slides.eq(currentSlide - 1).find(".side").find(".slideInfo").find("*").stop(true, true).hide(animationSpeedHide);
            $slides.eq(currentSlide - 1).find(".bottom").find(".slideInfo").find("*").stop(true, true).slideUp(animationSpeedHide);
            $slidesContainer.animate({"marginLeft" : "-" + (width * (nextSlide - 1))}, animationSpeedSlide, function () {
                if (nextSlide === $slides.length) {
                    $slidesContainer.css("margin-left", 0);
                    currentSlide = 1;
                } else {
                    $slidesContainer.css("margin-left", parseInt("-" + (width * (nextSlide - 1))));
                    currentSlide = nextSlide;
                }
                if (currentSlide === 1) {
                    showSlideInfo(".side", $slides.length - 1, 0);
                    showSlideInfo(".bottom", $slides.length - 1, 0);
                }
                showSlideInfo(".side", currentSlide - 1, 0);
                showSlideInfo(".bottom", currentSlide - 1, 0);
                if (!$sliderContainer.is(":hover")) {
                    startSlider();
                }
            });
            $bubbles.css("background", "");
            $bubbles.css("border", "");
            var bubbleSelectedIndex = nextSlide - 1;
            if (nextSlide === $slides.length) {
                bubbleSelectedIndex = 0;
            }
            $bubbles[bubbleSelectedIndex].style.background = $bubbleSelectedBackground;
            $bubbles[bubbleSelectedIndex].style.border = $bubbleSelectedBorder;
        }
    }
    function initSlider() {
        $sliderContainer.css("width", 100 + "%");
        if ($sliderContainer.css("width").replace("px", "") > maxWidth) {
            $sliderContainer.css("width", maxWidth);
        } else if ($sliderContainer.css("width").replace("px", "") < minWidth) {
            $sliderContainer.css("width", minWidth);
        }
        width = $sliderContainer.css("width").replace("px", "");
        $sliderContainer.css("height", width * 0.626);
    }
    function startSlider() {
        stopSlider();
        initSlider();
        interval = setInterval(function () {
            currentTime+=10;
            if (currentTime >= pause) {
                changeSlide(currentSlide + 1);
                currentTime = 0;
            }
            $(".slideTimer").css("width", width / pause * currentTime);
        }, 10);
    }
    function stopSlider() {
        clearInterval(interval);
    }
    function showSlideInfo(type, index, delay) {
        if (type === ".side" || type === ".bottom") {
            $slides.eq(index).find(type).find(".slideInfoTitle").delay(delay).slideDown(animationSpeedTitle);
            if (type === ".side") {
               $slides.eq(index).find(type).find(".slideInfoTagline").delay(delay + animationSpeedTitle).fadeIn(animationSpeedTagline);
            }
        }
    }
    
    $(".sliderArrowLeft").on("click", function () {
        var nextSlide = currentSlide - 1;
        if (nextSlide === 0) {
            $slidesContainer.css("margin-left", parseInt("-" + (width * ($slides.length - 1))));
            nextSlide = $slides.length - 1;
        }
        changeSlide(nextSlide);
    });
    $(".sliderArrowRight").on("click", function () {
        changeSlide(currentSlide + 1);
    });
    $(window).resize(function() {
        var marginLeftPercentage = $slidesContainer.css("margin-left").replace("px", "") / width;
        initSlider();
        $slidesContainer.css("margin-left", width * marginLeftPercentage);
    });
    
    for (var i = 0;i < $slidesContainer.find(".slide").length;i++) {
        var bubble = "<div class=\"bubble\""
        if (i === 0) {
            bubble += " style=\"background: rgb(229, 229, 229); border: 1px solid blue;\"";
        }
        bubble += " data-number=\"" + (i + 1) + "\"></div>";
        $bubblesContainer.append(bubble);
    }
    $bubbles = $bubblesContainer.find(".bubble");
    $bubbles.on("click", function () {
        var index = parseInt($(this).attr("data-number"));
        if (index != currentSlide) {
            changeSlide(index);
        }
    });
    $bubbleSelectedBackground = $bubbles[0].style.background;
    $bubbleSelectedBorder = $bubbles[0].style.border;
    
    var slideTagName = $slidesContainer.find(".slide")[0].tagName.toLowerCase;
    var firstSlide = "<" + slideTagName + " class=\"slide\">" + $slidesContainer.find(".slide")[0].innerHTML + "</" + slideTagName + ">";
    $slidesContainer.append(firstSlide);
    $slides = $slidesContainer.find(".slide");
    $slidesContainer.css("width", $slides.length * 100 + "%");
    $slides.css("width", 100 / $slides.length + "%");
    $slides.find(".slideInfo").find("*").hide();
    
    $sliderContainer.hover(function() {
        stopSlider();
    }, function() {
        startSlider();
    });
    
    initSlider();
    startSlider();
    showSlideInfo(".side", 0, 500);
    showSlideInfo(".side", $slides.length - 1, 500);
    showSlideInfo(".bottom", 0, 500);
    showSlideInfo(".bottom", $slides.length - 1, 500);
});