const API_URL = "https://api.spacexdata.com/v4/rockets/";
const rocketContainer = document.querySelector(".rocket");

async function getRockets() {
    try {
        const rocketResponse = await fetch(API_URL)
        const rocketResult = await rocketResponse.json();
        rocketContainer.innerHTML = ``;
        clearInterval(dots);

        for (i = 0; i < rocketResult.length; i++) {
            const rocket = rocketResult[i];
            let image = rocket.flickr_images[1];
            const name = rocket.name;
            const id = rocket.id;
            const type = rocket.type;
            rocketContainer.innerHTML +=
                `
            <div class="rocket--display relative">
                <a href="rocket-details.html?id=${id}">
                    <img class="rocket--group" src="${image}" alt="SpaceX ${name} ${type}" referrerpolicy="no-referrer">    
                    <span class="rocket--blurb">${name}</span>               
                </a>
            </div>
        `
        }
    }
    catch (err) {
        console.log(err);
    }
};

getRockets();