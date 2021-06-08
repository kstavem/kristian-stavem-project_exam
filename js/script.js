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


const localParagraphs = document.querySelector(".launch__local");
const localRadio = document.querySelector("#localtime")
const utcParagraphs = document.querySelector(".launch__utc");
const utcRadio = document.querySelector("#utctime");
const radioButtons = document.querySelector(".radio--group")

// Depending on which radio button is checked, displays a div with date/launch window in the selected timezone. Local is US east.
function radioLabel() {
    if (utcRadio.checked) {
        localParagraphs.classList.add("nodisplay");
        utcParagraphs.classList.remove("nodisplay");

    } else {
        localParagraphs.classList.remove("nodisplay");
        utcParagraphs.classList.add("nodisplay");
    }
};

document.body.addEventListener('doc-ready-ish', function () {
    const radioButtons = document.querySelector(".radio--group")
    radioButtons.addEventListener("click", radioLabel);
})