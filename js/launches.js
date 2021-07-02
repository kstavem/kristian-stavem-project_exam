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
    return myTime;
};


// Function that builds the .launches HTML.
// It takes two arguments, objects received from the API-calls.
function spaceHTML(launch, rocket) {
    const dateLocal = launchDate(launch.date_local);
    const timeLocal = launchTime(launch.date_local, "en-US");
    const dateUtc = launchDate(launch.date_utc);
    const timeUtc = launchTime(launch.date_utc, "en-GB");
    const patch = launch.links.patch.small;
    let patchImg = `<img src="${patch}" alt="official launch patch of the ${launch.name} launch" class="launch--patch"  referrerpolicy="no - referrer">`;
    if (!patch) {
        patchImg = "";
    }


    if (!launch.details) {
        launch.details = "No details about this launch as of yet. Please check back closer to the launch window for more details!";
    }

    launchList.innerHTML +=
        `
        <div class="width-100">
            <div class="launch--container narrow">
                <h2 class="launch--name">Mission: ${launch.name}</h2>                                 
                <div class="flex flex__center flex__col">
                    <div>
                        <p>${launch.details}</p>
                        ${patchImg}
                    </div>
                    <div class="launch--info">
                        <p><strong>Rocket: </strong><a href="rocket-details.html?id=${rocket.id}">${rocket.name}</a></p>
                        <p><strong>Launch number: </strong>${launch.flight_number}
                        <div class="timezone--container"> 
                            <div class="launch__local">                                          
                                <p><strong>Date: </strong>${dateLocal}</p>
                                <p><strong>Launch window start: </strong><span class="launch--time">${timeLocal}</span></p>
                            </div>
                            <div class="nodisplay launch__utc">
                                <p><strong>Date: </strong>${dateUtc}</p>
                                <p><strong>Launch window start: </strong><span class="launch--time">${timeUtc}</span></p>
                            </div>
                            <form class="radio--group"> 
                                <p><strong>Timezone: </strong></p>                                                       
                                <label class="localtime label__highlight">Local<input type="radio" name="timezone" checked></label>
                                <label class="utctime">UTC<input type="radio" name="timezone"></label>    
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

            const rocketID = launchResult[i].rocket;
            const myRocket = await getRocket(rocketID);
            getRocket(rocketID);
            console.log(launchResult[i]);
            console.log(myRocket);
            spaceHTML(launchResult[i], myRocket);

        }
    }
    catch (err) {
        console.log(err);
    }
};

// Event created, and listened for in script.js to delay running code dependant on the dynamic HTML/CSS created by getLaunch();
function documentReady() {
    const myEvent = new Event("doc-ready-ish");
    document.body.dispatchEvent(myEvent);
};

getLaunch().then(documentReady);





