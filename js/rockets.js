const rocketContainer = document.querySelector(".rocket");
const launchList = document.querySelector(".launches");
const launchURL = "https://api.spacexdata.com/v4/launches/upcoming";
let launchArray = [];

async function launchAPI() {
    try {
        const response = await fetch(launchURL);
        const result = await response.json();
        for (i = 0; i < result.length; i++) {
            if (!result[i].details) {
                continue;
            } else {
                launchArray.push(result[i]);
            }
        }
    }
    catch (err) {
        console.log(err);
    };
};

launchAPI();

function buildHTML(data) {
    launchList.innerHTML = "";
    for (i = 0; i < data.length; i++) {
        launchList.innerHTML += `<li><p>${data[i].details}</p></li>`;
    }
};

buildHTML(launchArray);

