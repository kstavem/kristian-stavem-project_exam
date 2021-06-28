const rocketContainer = document.querySelector(".rocket");
const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const rocketID = params.get("id");
const API_URL = "https://api.spacexdata.com/v4/rockets/" + rocketID;
const rocketArray = [];

// Basic math function to get a number between x and y. Used to get a number between 0 and the image array length further down.
function randomImage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function rocketHTML(rocket) {
    rocketContainer.innerHTML +=
        `
            <div class="launch--container narrow">
                <h2 class="launch--name">Rocket: ${rocket.name}</h2>
                    <div class="flex flex__col">
                        <img src="${rocket.flickr_images[randomImage(0, rocket.flickr_images.length)]}" class="rocket--image">
                        <div class="rocket--info">
                            <p>${rocket.description}</p>
                            <p>It had its first flight on <strong>${rocket.first_flight}</strong>, and has a ${rocket.success_rate_pct}% success rate.</p>
                            <p><strong>Height: </strong>${rocket.height.meters} meters (${rocket.height.feet} feet).</p>
                            <p><strong>Diameter: </strong>${rocket.diameter.meters} meters (${rocket.diameter.feet} feet.)</p>
                            <p><strong>Weight: </strong>~${Math.floor(rocket.mass.kg / 1000)} tons.</p>
                            <p><strong>Engines: </strong>${rocket.engines.number} ${rocket.engines.type} engines producing
                               ${rocket.first_stage.thrust_sea_level.kN} kN thrust at sea level.</p>
                            <p>Read more on the ${rocket.name} <a href="${rocket.wikipedia}">wiki</a></p>
                        </div>
                    </div>
            </div>
        `
};

async function getRocket() {
    try {
        const rocketResponse = await fetch(API_URL)
        const rocketResult = await rocketResponse.json();
        rocketContainer.innerHTML = "";
        console.log(rocketResult);
        rocketHTML(rocketResult);

    }
    catch (err) {
        console.log(err);
    }
};

getRocket();