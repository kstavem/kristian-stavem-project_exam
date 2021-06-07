const rocketContainer = document.querySelector(".rocket");
const launchList = document.querySelector(".launches");
const API_URL = "https://api.spacexdata.com/v4/";


//ISO 8601 date and time formatting.
// Takes two arguments:
// ld is the dot-notation for local or utc time in the launch-JSON.
// timezone is either "en-GB" or "en-US" to decide which time format to apply (12hr vs 24hr clock etc).
function launchDate(ld, timezone) {
    const launchDate = new Date(ld);
    const yyyy = launchDate.getFullYear();
    let mm = launchDate.getMonth() + 1;
    let dd = launchDate.getDate();
    let myTime = "";

    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }

    if (timezone == "en-US") {
        myTime = launchDate.toLocaleTimeString(timezone,
            { timeStyle: "short", hourt12: true });
    } else if (timezone == "en-GB") {
        myTime = launchDate.toLocaleTimeString(timezone,
            { timeStyle: "short", timeZone: "UTC", hour12: false });
    }

    const myDate = yyyy + "-" + mm + "-" + dd + " at " + myTime;
    return myDate;
}

// Function that builds the .launches HTML.
// It takes two arguments, objects received from the API-calls.
function spaceHTML(launch, rocket) {
    launchList.innerHTML += `
                            <div>
                                <p class="launchdate"><strong>${launchDate(launch.date_local, "en-US")}</strong></p>
                                <p class="launchdate date--show"><strong>${launchDate(launch.date_utc, "en-GB")}</strong></p>
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
        launchList.innerHTML = ``;

        for (i = 0; i < launchResult.length; i++) {
            if (!launchResult[i].details) {
                continue;
            } else {
                const rocketID = launchResult[i].rocket;
                const myRocket = await getRocket(rocketID);
                getRocket(rocketID);
                console.log(launchResult[i]);
                console.log(myRocket);
                spaceHTML(launchResult[i], myRocket);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};

getLaunch();






