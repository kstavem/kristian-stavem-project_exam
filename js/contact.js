const fullName = document.querySelector("#fullname");
const age = document.querySelector("#age");
const address = document.querySelector("#address");
const email = document.querySelector("#email");
const button = document.querySelector("button");
let errorArray = [];
let ageArray = [];

function checkLength(name, len) {
    if (name.value.trim().length > len) {
        name.labels[0].classList = "true"
        return true;
    } else {
        name.labels[0].classList = "false";
        errorArray.push(`${name.placeholder} needs to be at least ${len + 1} letters`);
        return false;
    }
};

function checkAge(age, min, max) {
    const regEx = /^\d+$/;
    const match = regEx.test(age.value);

    if (!match) {
        age.labels[0].classList = "false";
        errorArray.push(`Select a whole number as your age`);
        return false;
    };

    if ((age.value >= min) && (age.value <= max)) {
        age.labels[0].classList = "true";
        ageArray.push(`You seem like the ideal candidate for our missions! We will be in touch shortly.`);
        return true;
    };

    if (age.value < min) {
        age.labels[0].classList = "true";
        ageArray.push(`Sadly we don't accept underage applicants, please apply again in ${min - age.value} years.`);
        return true;
    };

    if (age.value > max) {
        age.labels[0].classList = "true";
        ageArray.push(`Unfortunately you are ${age.value - max} years above the maximum age recommended for exploring space. Please return if you conquer the space-time continuum!`);
        return true;
    }
};

function checkEmail(emailaddress) {
    const regEx = /\S+@\S+\.\S+/;
    const match = regEx.test(emailaddress.value);
    if (match) {
        email.labels[0].classList = "true";
        return match;
    } else {
        email.labels[0].classList = "false";
        errorArray.push(`Please enter a valid email`)
        return match;
    }
};

function validateForm() {
    let messageContainer = document.querySelector(".form--message");
    messageContainer.innerHTML = ``;
    errorArray = [];
    ageArray = [];
    const validName = checkLength(fullName, 3);
    const validAge = checkAge(age, 18, 80);
    const validAddress = checkLength(address, 14);
    const validEmail = checkEmail(email);

    if ((validName) && (validAge) && (validAddress) && (validEmail)) {
        const name = fullName.value;
        messageContainer.classList.remove("nodisplay");
        messageContainer.style.border = "2px solid green";
        messageContainer.style.backgroundColor = "rgba(0, 255, 0, .1)";
        messageContainer.innerHTML = `
                                        <p class="spaceblue">Thank you, ${name}, for applying to the SpaceX Astronaut Selection Program</p>
                                        <hr>
                                        <p class="spaceblue">${ageArray[0]}</p>
                                     `;
    } else {
        messageContainer.classList.remove("nodisplay");
        messageContainer.style.border = "2px solid red";
        messageContainer.style.backgroundColor = "rgba(255, 0, 0, .1)";
        for (i = 0; i < errorArray.length; i++) {
            messageContainer.innerHTML += `<p class="spaceblue">${errorArray[i]}</p>`;
        }
    }
};

button.addEventListener("click", function (event) {
    event.preventDefault();
    validateForm();
});