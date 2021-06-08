const rocketContainer = document.querySelector(".rocket");
const launchList = document.querySelector(".launches");
const API_URL = "https://api.spacexdata.com/v4/";


//Functions to unravel ISO 8601 date and time formatting.
// ld is the dot-notation for local or utc time in the launch-JSON.

function launchDate(ld) {
    const launchDate = new Date(ld);
    const yyyy = launchDate.getFullYear();
    let mm = launchDate.getMonth() + 1;
    let dd = launchDate.getDate();

    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }

    const myDate = yyyy + "-" + mm + "-" + dd;
    return myDate;
};

// timezone is either "en-GB" or "en-US" to decide which time format to apply (12hr vs 24hr clock etc).
// I initially had these two functions combined into one, but I wanted to display the date and launchwindow time
// on different elements in the HTML, and didnt want to clutter the js by having launcdate() building the HTML.
function launchTime(ld, timezone) {
    const launchDate = new Date(ld);
    let myTime = "";
    if (timezone == "en-US") {
        myTime = launchDate.toLocaleTimeString(timezone,
            { timeStyle: "short", hourt12: true });
    } else if (timezone == "en-GB") {
        myTime = launchDate.toLocaleTimeString(timezone,
            { timeStyle: "long", timeZone: "UTC", hour12: false });
    }
    console.log(myTime);
    return myTime;
};

// Function that builds the .launches HTML.
// It takes two arguments, objects received from the API-calls.
function spaceHTML(launch, rocket) {
    launchList.innerHTML +=
        `
        <div class="width-100">
            <div class="launch--container narrow">
                <h2 class="launch--name">Mission: ${launch.name}</h2>                                    
                <div class="flex flex__col">
                    <p>${launch.details}</p>
                    <div class="rocket--info">
                        <p><strong>Rocket: </strong><a class="rocket__link" href="#">${rocket.name}</a></p>
                        <p><strong>Launch number: </strong>${launch.flight_number}
                        <div class="timezone--container"> 
                            <div class="nodisplay launch__local">                                          
                                <p><strong>Date: </strong>${launchDate(launch.date_local)}</p>
                                <p><strong>Launch window: </strong>${launchTime(launch.date_local, "en-US")}</p>
                            </div>
                            <div class="launch__utc">
                                <p><strong>Date: </strong>${launchDate(launch.date_utc)}</p>
                                <p><strong>Launch window: </strong>${launchTime(launch.date_utc, "en-GB")}</p>
                            </div>
                            <form class="radio--group">
                                <input type="radio" id="utctime" name="timezone">
                                <label for="utctime">UTC</label>
                                <input type="radio" id="localtime" name="timezone" checked>
                                <label for="localtime">Local</label>
                            </form>
                        </div>                   
                    </div>
                </div>
                            
            </div>
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

const event = new Event("doc-ready-ish");
document.body.dispatchEvent(event);





