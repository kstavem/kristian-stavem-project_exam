const burgerMenu = document.querySelector("#nav--burger");
const widthCheck = window.matchMedia("(min-width: 1025px)");
const navButton = document.querySelector(".nav--button");
const hiddenMenu = document.querySelector(".nav--toggle");
const header = document.querySelector("header");

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

// Loader text, interval gets cleared when a function changes the enveloping divs (api-responses);
const loaderArray = [
    "Calculating trajectory", "Fueling boosters", "Comforting astronauts",
    "Preparing for launch", "Packing parachute", "Connecting to Matrix",
    "Performing science", "Mimicking satelite", "T minus 3-2-1",
    "Go for launch", "Houston we've...", "Detecting lifeforms",
    "To Minmus and back!", "Scanning intelligence", "One small step",
    "Making sense", "Keep looking up", "Black hole blues",
    "Pale blue dot", "Lonely out in space", "Contact light",
    "Gravity hurts", "Collecting kerbals", "Fuel: 02%",
    "Avoding black hole", "Building pyramids", "Absorbing radiation",
    "Measuring tachyons",
];
const loaderDots = document.querySelector("#dots");
const loaderText = document.querySelector("#loadertext");

function randomNumber(myArray) {
    return Math.floor(Math.random() * myArray.length);
};

function myDots() {
    if (loaderDots.innerHTML.length >= 3) {
        loaderDots.innerHTML = `.`;
    } else {
        loaderDots.innerHTML += `.`
    };
};

let dots;
const arrayNumber = randomNumber(loaderArray);
if (loaderText) {
    dots = setInterval(myDots, 1000);
    loaderText.innerHTML = `${loaderArray[arrayNumber]}`;
};


