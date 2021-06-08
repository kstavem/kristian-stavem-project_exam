const localParagraphs = document.querySelector(".launch__local");
const localRadio = document.querySelector("#localtime")
const utcParagraphs = document.querySelector(".launch__utc");
const utcRadio = document.querySelector("#utctime");
const radioButtons = document.querySelector(".radio--group")

function radioLabel() {
    if (utcRadio.checked) {
        localParagraphs.classList.add("nodisplay");
        utcParagraphs.classList.remove("nodisplay");

    } else {
        localParagraphs.classList.remove("nodisplay");
        utcParagraphs.classList.add("nodisplay");
    }
};

radioButtons.addEventListener("click", radioLabel);


