const burgerMenu = document.querySelector("#nav--burger");
const widthCheck = window.matchMedia("(min-width: 1025px)");
const navButton = document.querySelector(".nav--button");
const hiddenMenu = document.querySelector(".nav--toggle");

// Hides the menu if the window is manually re-sized, so both menus wont be active at the same time in certain situations.
widthCheck.addEventListener("change", (e) => {
    if (e.matches) {
        burgerMenu.checked = false;
        hiddenMenu.classList.remove("nav--show");
    }
});

function toggleMenu() {
    hiddenMenu.classList.toggle("nav--show");
};

navButton.addEventListener("click", toggleMenu);

const nav = document.querySelector(".nav--fixed");

// Changes the background of the navigation to solid black when scrolled > the nav height (85px in css)
function navScroll() {
    if (window.scrollY > nav.offsetHeight) {
        nav.classList.add("nav--solid");
        nav.classList.remove("nav--transparent");
    } else {
        nav.classList.add("nav--transparent");
        nav.classList.remove("nav--solid");
    }
};

document.addEventListener("scroll", navScroll);

// Depending on which radio button is checked, displays a div with date/launch window in the selected timezone. Local is US east.
function radioLabel() {
    const localParagraphs = document.querySelectorAll(".launch__local");
    const utcParagraphs = document.querySelectorAll(".launch__utc");
    const utcRadio = document.querySelectorAll(".utctime input");
    const localLabel = document.querySelectorAll(".localtime");
    const utcLabel = document.querySelectorAll(".utctime");

    for (i = 0; i < utcRadio.length; i++) {

        if (utcRadio[i].checked) {
            localParagraphs[i].classList.add("nodisplay");
            utcParagraphs[i].classList.remove("nodisplay");
            utcLabel[i].classList.add("label__highlight");
            localLabel[i].classList.remove("label__highlight");
        } else {
            localParagraphs[i].classList.remove("nodisplay");
            utcParagraphs[i].classList.add("nodisplay");
            utcLabel[i].classList.remove("label__highlight");
            localLabel[i].classList.add("label__highlight");
        }
    }
};

document.body.addEventListener("doc-ready-ish", function () {
    const radioButtons = document.querySelectorAll(".radio--group");
    radioButtons.forEach(function () {
        addEventListener("click", radioLabel)
    });
});