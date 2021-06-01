const burgerMenu = document.querySelector("#nav--burger");
const widthCheck = window.matchMedia("(min-width: 1025px)");
const navButton = document.querySelector(".nav--button");
const hiddenMenu = document.querySelector(".nav--toggle");

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
