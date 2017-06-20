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

/*--------------------------------------------------------------*/

var validForename, validSurname, validEmail, confirmedEmail, validMessage;  

function checkForm() {
    var sendEmail = document.getElementsByName("sendEmail")[0];
    if (validForename && validSurname && validEmail && confirmedEmail && validMessage) {
        sendEmail.disabled = false;
    } else {
        sendEmail.disabled = true;
    }
}

function validateForename() {
    var forename = document.getElementsByName("forename")[0], Lforename = document.getElementsByName("Lforename")[0];
    if (forename.value != "") {
        Lforename.style.color = "green";
        validForename = true;
    } else {
        Lforename.style.color = "red";
        validForename = false;
    }
    checkForm();
}

function validateSurname() {
    var surname = document.getElementsByName("surname")[0], Lsurname = document.getElementsByName("Lsurname")[0];
    if (surname.value != "") {
        Lsurname.style.color = "green";
        validSurname = true;
    } else {
        Lsurname.style.color = "red";
        validSurname = false;
    }
    checkForm();
}

function validateEmail() {
    var emailAddress = document.getElementsByName("emailAddress")[0], LemailAddress = document.getElementsByName("LemailAddress")[0];
    if (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(emailAddress.value)) {
        LemailAddress.style.color = "green";
        validEmail = true;
    } else {
        LemailAddress.style.color = "red";
        validEmail = false;
    }
    checkForm();
}

function confirmEmail() {
    var emailAddress = document.getElementsByName("emailAddress")[0], confirmEmailAddress = document.getElementsByName("confirmEmailAddress")[0], LconfirmEmailAddress = document.getElementsByName("LconfirmEmailAddress")[0];
    if (confirmEmailAddress.value == emailAddress.value) {
        LconfirmEmailAddress.style.color = "green";
        confirmedEmail = true;
    } else {
        LconfirmEmailAddress.style.color = "red";
        confirmedEmail = false;
    }
    checkForm();
}

function validateMessage() {
    var message = document.getElementsByName("message")[0], Lmessage = document.getElementsByName("Lmessage")[0];
    if (message.value != "") {
        Lmessage.style.color = "green";
        validMessage = true;
    } else {
        Lmessage.style.color = "red";
        validMessage = false;
    }
    checkForm();
}

/*-------------------------------------------------------------*/

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
window.onscroll = function() {shrinkHeader()};

/*--------------------------------------------------------------*/
function productDescription(product_name) {
    var xhr_file = new XMLHttpRequest();
    xhr_file.open("HEAD", "products/" + product_name + "/" + product_name + ".zip", true);
    xhr_file.onreadystatechange = function(){
      if (xhr_file.readyState == 4 && xhr_file.status == 200) {
            document.getElementsByName(product_name + "_size")[0].innerHTML = "<strong>Size:</strong> " + (xhr_file.getResponseHeader('Content-Length') / (1024 * 1024)).toFixed(2) + " mb";
      }
    };
    xhr_file.send(null);
    var xhr_version = new XMLHttpRequest();
    xhr_version.open("GET", "products/" + product_name + "/" + "VERSION.txt", true);
    xhr_version.onreadystatechange = function(){
      if (xhr_version.readyState == 4 && xhr_version.status == 200) {
            document.getElementsByName(product_name + "_version")[0].innerHTML = "<strong>Version:</strong> " + xhr_version.responseText;
      }
    };
    xhr_version.send(null);
}

function productReadDownloads(product_name) {
    var xhr_downloads = new XMLHttpRequest();
    xhr_downloads.open("GET", "products/" + product_name + "/" + "DOWNLOADS.txt", true);
    xhr_downloads.onreadystatechange = function(){
      if (xhr_downloads.readyState == 4 && xhr_downloads.status == 200) {
            document.getElementsByName(product_name + "_downloads")[0].innerHTML = "<strong>Downloads:</strong> " + xhr_downloads.responseText;
      }
    };
    xhr_downloads.send(null);
}

function productDownload(product_name) {
    alert(product_name.replace("_", " ") + " will now start downloading.\nPlease read INSTALL.txt or the installation instructions at the bottom of the page.");
    autoScrollTimer(Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - document.documentElement.clientHeight);
    productWriteDownloads(product_name);
    productReadDownloads(product_name);
}

function productWriteDownloads(product_name) {
    var xhr_updateDownloads = new XMLHttpRequest();
    xhr_updateDownloads.open("POST", "products/" + product_name + "/" + "DOWNLOADS.txt", true);
    var value1 = document.getElementsByName(product_name + "_downloads")[0].innerHTML;
    var value2 = value1.replace("<strong>Downloads:</strong> ", "");
    var value3 = (parseInt(value2) + 1);
    var value = value3.toString();
    xhr_updateDownloads.send(value);
}

/*-----------------------------------------------------------*/

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
    scroller = setInterval(function(){autoScroll(startingY, targetY)}, 1);
}