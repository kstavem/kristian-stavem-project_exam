const rocketContainer = document.querySelector(".rocket");
const launchList = document.querySelector(".launches");
const API_URL = "https://api.spacexdata.com/v4/";


// Function that builds the .launches HTML.
// It takes two arguments, objects received from the API-calls.
function spaceHTML(launch, rocket) {
    launchList.innerHTML += `
                            <div>
                                <p>${launch.date_local}</p>
                                <p>${launch.details}</p>
                                <p>${rocket.name}</p>                                
                            </div>
                            `
};

// API-call function that takes one argument, the ID of the rocket
// The ID is an UUID from the launch-API further down
async function getRocket(id) {
    try {
        const rocketResponse = await fetch(API_URL + `rockets/${id}`)
        const rocketResult = await rocketResponse.json();
        console.log(rocketResult);
        return rocketResult;
    }
    catch (err) {
        console.log(err);
    }
};

// Main function that also calls getRocket and passes in an UUID to get more information to populate the HTML. 
async function getLaunch() {
    try {
        const launchResponse = await fetch(API_URL + "launches/upcoming");
        const launchResult = await launchResponse.json();
        launchList.innerHTML = "";

        for (i = 0; i < launchResult.length; i++) {
            if (!launchResult[i].details) {
                continue;
            } else {
                const rocketID = launchResult[i].rocket;
                const rocketResult = await getRocket(rocketID);
                getRocket(rocketID);
                console.log(launchResult[i]);
                spaceHTML(launchResult[i], rocketResult);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};

getLaunch();






