$(function () {
    var $sliderContainer = $(".slideshow")
    var $slidesContainer = $sliderContainer.find(".slideshow__slidesContainer")
    var $bubblesContainer = $sliderContainer.find(".slideshow__bubblesContainer")
    var $slides
    var $bubbles
    var $slideTimer = $sliderContainer.find(".slideshow__timer")
    var slideDuration = $slideTimer.css("transition-duration")
    slideDuration = parseFloat(slideDuration.substr(0, slideDuration.length - 1)) * 1000
    var slideTransition = $($sliderContainer.find(".slideshow__slidesContainer__slide")[0]).css("transition-duration")
    slideTransition = parseFloat(slideTransition.substr(0, slideTransition.length - 1)) * 1000
    var slideTimeout
    var currentSlide = 0

    $sliderContainer.find(".slideshow__arrowLeft").on("click", function () {
        changeSlide(currentSlide - 1);
    });
    $sliderContainer.find(".slideshow__arrowRight").on("click", function () {
        changeSlide(currentSlide + 1);
    });

    var bubblesHtml = ""
    for (var i = 1; i <= $slidesContainer.find(".slideshow__slidesContainer__slide").length; i++) {
        bubblesHtml += "<input type=\"radio\" name=\"bubble\" id=\"bubble" + i + "\""
        if (i === 1) {
            bubblesHtml += " checked"
        }
        bubblesHtml += "><label for=\"bubble" + i + "\"></label>"
    }
    $bubblesContainer.append(bubblesHtml)
    $slidesContainer.append($slidesContainer.find(".slideshow__slidesContainer__slide")[0].outerHTML);
    $slides = $slidesContainer.find(".slideshow__slidesContainer__slide")

    $bubbles = $bubblesContainer.find("[id^=\"bubble\"]")
    $bubbles.on("change", function () {
        changeSlide($bubbles.index(this))
    })

    function changeSlide(idx) {
        var $slide = $($slides[0])
        if (currentSlide == 0) {
            $slide.css("transition-duration", "0s")
            $slide.css("margin-left", (idx >= currentSlide) ? "0px" : "calc(-" + $bubbles.length + " * " + $slide.css("width") + ")")
            $slides[0].offsetHeight;
            $slide.css("transition-duration", "")
        }
        currentSlide = (idx + $bubbles.length) % $bubbles.length
        $($bubbles[currentSlide]).prop("checked", true);
        $sliderContainer.find("*").css("pointer-events", "none")
        $slides.removeClass("slideshow__slidesContainer__slide--current")
        setTimeout(function () {
            $sliderContainer.find("*").css("pointer-events", "")
            $($slides[currentSlide]).addClass("current")
            $($slides[idx]).addClass("slideshow__slidesContainer__slide--current")

        }, slideTransition)

        $slide.css("margin-left", -Math.max(idx, currentSlide) + "00%")
        $slideTimer.css("transition-duration", "0s")
        $slideTimer.removeClass("full")
        $slides[0].offsetHeight;
        $slideTimer.css("transition-duration", "")
        $slideTimer.addClass("full")
        clearTimeout(slideTimeout)
        slideTimeout = setTimeout(function () {
            changeSlide(currentSlide + 1)
        }, slideDuration)
    }

    changeSlide(0)
});
