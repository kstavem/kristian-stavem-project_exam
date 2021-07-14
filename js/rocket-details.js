const rocketContainer = document.querySelector(".rocket");
const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const rocketID = params.get("id");
const API_URL = "https://api.spacexdata.com/v4/rockets/" + rocketID;

function rocketHTML(rocket) {
    const name = rocket.name;
    let image = rocket.flickr_images;
    const desc = rocket.description;
    const flight = rocket.first_flight;
    const success = rocket.success_rate_pct;
    const meters = rocket.height.meters;
    const feet = rocket.height.feet;
    const tons = Math.floor(rocket.mass.kg);
    const engines = rocket.engines.number;
    const engineType = rocket.engines.type;
    const thrust = rocket.first_stage.thrust_sea_level.kN;
    const wikiLink = rocket.wikipedia;

    rocketContainer.innerHTML +=
        `
            <div class="launch--container narrow">
                <h2 class="rocket--name">Rocket: ${name}</h2>
                <p class="page centered">
                    <a href="rockets.html">Back to rockets</a> &gt; <a href="${document.location.href}">${name}</a>
                </p>
                
                <div class="flex flex--col__md flex__center">   
                    <img src="${image[0]}" alt="SpaceX ${name} rocket" class="rocket--image__small" referrerpolicy="no-referrer">                    
                    <div class="rocket--info">
                        <p>${desc}</p>
                        <p>It had its first flight on <strong>${flight}</strong>, and has a ${success}% success rate.</p>
                        <p><strong>Height: </strong>${meters} meters (${feet} feet).</p>
                        <p><strong>Diameter: </strong>${meters} meters (${feet} feet.)</p>
                        <p><strong>Weight: </strong>~${tons} tons.</p>
                        <p><strong>Engines: </strong>${engines} ${engineType} engines producing
                        ${thrust} kN thrust at sea level.</p>
                        <p>Read more on the ${name} <a href="${wikiLink}">wiki</a></p>
                    </div>
                
                </div>                
            </div>
        `;

    const imageBox = document.querySelector("#rocket--image__array");
    for (var i = 1; i < image.length; i++) {
        imageBox.innerHTML += `<img src="${image[i]}" class="rocket--image" alt="SpaceX ${name} rocket" referrerpolicy="no-referrer">`
    };
    imageBox.innerHTML += ` <p class="page centered">
                                <a href="rockets.html">Back to rockets</a> &gt; <a href="${document.location.href}">${name}</a>
                            </p>`
};

async function getRocket() {
    try {
        const rocketResponse = await fetch(API_URL)
        const rocketResult = await rocketResponse.json();
        rocketContainer.innerHTML = "";
        rocketContainer.classList.remove("launches");
        clearInterval(dots);
        rocketHTML(rocketResult);
    }
    catch (err) {
        console.log(err);
    }
};

getRocket();