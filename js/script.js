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