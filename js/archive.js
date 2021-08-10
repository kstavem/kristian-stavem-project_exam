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
    };

    if (mm < 10) {
        mm = "0" + mm;
    };

    const myDate = yyyy + "-" + mm + "-" + dd;
    return myDate;
};


// Function that builds the .launches HTML.
// It takes two arguments, objects received from the API-calls.
function spaceHTML(launch, rocket) {
    const dateLocal = launchDate(launch.date_local);
    const patch = launch.links.patch.small;
    let success = launch.success;
    let successText = `successful`;
    if (success == false) {
        successText = `unsuccessful`;
    } else if (success == null) {
        success = false;
        successText = `delayed`;
    }
    const youtubeId = launch.links.youtube_id;
    const youtube = `https://www.youtube.com/watch?v=` + youtubeId;
    let watchVideo = ", watch the video below.";
    if (!youtubeId) {
        watchVideo = ``;
    }
    let article = launch.links.article;
    let readMore = ` <a href="${article}" target="_blank">Read more on <em>Spaceflight Now</em></a>.`
    if (!article) {
        readMore = ``;
    }
    let fate = `<strong class="${success.toString()}">${successText}</strong>${watchVideo}${readMore}`;

    let patchImg = `<img src="${patch}" alt="official launch patch of the ${launch.name} launch" class="launch--patch block auto"  referrerpolicy="no-referrer">`;
    if (!patch) {
        patchImg = "";
    }

    if (!launch.details) {
        launch.details = "No details of this launch recorded yet, check back later for additional information.";
    }

    launchList.innerHTML +=
        `
        <div class="width-100">
            <div class="launch--container narrow">
                <h2 class="launch--name">Mission: ${launch.name}</h2>                                 
                <div class="flex flex__center flex--col__md">
                    <div>
                        <p class="launch--details">${launch.details}</p>
                        ${patchImg}
                    </div>
                    <div class="launch--info">
                        <p><strong>Rocket: </strong><a href="rocket-details.html?id=${rocket.id}">${rocket.name}</a></p>
                        <p><strong>Launch number: </strong>${launch.flight_number}</p>
                        <p><strong>Date: </strong>${dateLocal}</p>
                        <p class="mb-3">Launch was ${fate}</p>                        
                        <a href="${youtube}" class="block" target="_blank">
                            <img src="assets/images/yt_logo_rgb_light.png" class="youtube">
                        </a>                                                  
                    </div>                   
                </div>                          
            </div>
        </div>
    `
};

//Adds buttons to load more content or go back to top.
function loadMore() {
    launchList.innerHTML += `<div class="width-100">
                                <div class="launch--container narrow centered">
                                    <a class="button inlineblock loadmore loadclick">Load more</a>
                                    <a href="#" class="button inlineblock loadmore">To top</a>
                                </div>
                             </div>`;
};

function myPing() {
    const myEvent = new Event("ping-pong");
    document.body.dispatchEvent(myEvent);
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
        const launchResponse = await fetch(API_URL + "launches");
        const launchResult = await launchResponse.json();
        launchResult.reverse();
        clearInterval(dots);
        launchList.innerHTML = ``;
        let count = 1;
        for (let i = 0; i < launchResult.length; i++) {
            const rocketID = launchResult[i].rocket;
            const myRocket = await getRocket(rocketID);
            if (!launchResult[i].upcoming) {
                getRocket(rocketID);
                spaceHTML(launchResult[i], myRocket);
                count++;
            };
            if (count % 10 == 0) {
                loadMore();
            };
        }
    }
    catch (err) {
        console.log(err);
    };
};

function showMore() {
    let displayContainer = document.querySelectorAll(".nodisplay");
    for (i = 0; i < 11; i++) {
        displayContainer[i].classList.remove("nodisplay");
    };
};

document.body.addEventListener("ping-pong", function () {
    const moreButtons = document.querySelectorAll(".loadclick");
    moreButtons.forEach(function (button) {
        button.addEventListener("click", showMore);
    });
    let widthContainer = document.querySelectorAll(".width-100");
    for (i = 10; i < widthContainer.length; i++) {
        widthContainer[i].classList.add("nodisplay");
    };
});

getLaunch().then(myPing);
