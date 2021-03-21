$(function () {
    var validForename, validSurname, validEmail, confirmedEmail, validMessage;

    var forename = $("#forename")
    var surname = $("#surname")
    var emailAddress = $("#emailAddress")
    var confirmEmailAddress = $("#confirmEmailAddress")
    var message = $("#message")
    var sendEmail = $("#sendEmail")

    forename.on("focus", function () {
        forename.parent().removeClass("valid")
        forename.parent().removeClass("invalid")
    })
    forename.on("focusout", function () {
        if (forename.val() != "") {
            forename.parent().addClass("valid")
            forename.parent().removeClass("invalid")
            validForename = true;
        } else {
            forename.parent().addClass("invalid")
            forename.parent().removeClass("valid")
            validForename = false;
        }
        checkForm();
    })

    surname.on("focus", function () {
        surname.parent().removeClass("valid")
        surname.parent().removeClass("invalid")
    })
    surname.on("focusout", function () {
        if (surname.val() != "") {
            surname.parent().addClass("valid")
            surname.parent().removeClass("invalid")
            validSurname = true;
        } else {
            surname.parent().addClass("invalid")
            surname.parent().removeClass("valid")
            validSurname = false;
        }
        checkForm();
    })

    emailAddress.on("focus", function () {
        emailAddress.parent().removeClass("valid")
        emailAddress.parent().removeClass("invalid")
    })
    emailAddress.on("focusout", function () {
        if (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(emailAddress.val())) {
            emailAddress.parent().addClass("valid")
            emailAddress.parent().removeClass("invalid")
            validEmail = true;
        } else {
            emailAddress.parent().addClass("invalid")
            emailAddress.parent().removeClass("valid")
            validEmail = false;
        }
        checkForm();
    })

    confirmEmailAddress.on("focus", function () {
        confirmEmailAddress.parent().removeClass("valid")
        confirmEmailAddress.parent().removeClass("invalid")
    })
    confirmEmailAddress.on("focusout", function () {
        if (confirmEmailAddress.val() === emailAddress.val()) {
            confirmEmailAddress.parent().addClass("valid")
            confirmEmailAddress.parent().removeClass("invalid")
            confirmedEmail = true;
        } else {
            confirmEmailAddress.parent().addClass("invalid")
            confirmEmailAddress.parent().removeClass("valid")
            confirmedEmail = false;
        }
        checkForm();
    })

    message.on("focus", function () {
        message.parent().removeClass("valid")
        message.parent().removeClass("invalid")
    })
    message.on("focusout", function () {
        if (message.val() != "") {
            message.parent().addClass("valid")
            message.parent().removeClass("invalid")
            validMessage = true;
        } else {
            message.parent().addClass("invalid")
            message.parent().removeClass("valid")
            validMessage = false;
        }
        checkForm();
    })

    function checkForm() {
        if (validForename && validSurname && validEmail && confirmedEmail && validMessage) {
            sendEmail.attr("disabled", false);
        } else {
            sendEmail.attr("disabled", true);
        }
    }
});
