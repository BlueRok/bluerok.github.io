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