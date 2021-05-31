const burgerMenu = document.querySelector("#nav-toggler");
const widthCheck = window.matchMedia("(min-width: 1025px)");

widthCheck.addEventListener("change", (e) => {
    if (e.matches) {
        burgerMenu.checked = false;
    }
});
