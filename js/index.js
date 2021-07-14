const API_URL = "https://api.spacexdata.com/v4/launches/";
const nextLaunch = document.querySelector("#upcoming");
const nextLaunchDate = document.querySelector("#upcoming__date");
const prevLaunch = document.querySelector("#previous");
const prevLaunchDate = document.querySelector("#previous__date");

//Pretty self explanatory countdown setInterval function, adds a "0" in front of hours/mins/secs if they're down to single digits.
function countdown(launch) {
    setInterval(function () {
        const days = document.querySelector("#days");
        const hours = document.querySelector("#hours");
        const minutes = document.querySelector("#minutes");
        const seconds = document.querySelector("#seconds");
        const now = new Date().getTime();
        const timer = new Date(launch.date_local).getTime() - now;
        let dayTimer = Math.floor(timer / (1000 * 60 * 60 * 24)) + " days";
        let hourTimer = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hourTimer < 10) {
            hourTimer = `0` + hourTimer;
        };
        let minTimer = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
        if (minTimer < 10) {
            minTimer = `0` + minTimer;
        }
        let secTimer = Math.floor((timer % (1000 * 60)) / 1000);
        if (secTimer < 10) {
            secTimer = `0` + secTimer;
        }
        days.innerHTML = dayTimer;
        hours.innerHTML = hourTimer + ":";
        minutes.innerHTML = minTimer + ":";
        seconds.innerHTML = secTimer;
    }, 1000);
}

//The find() method is used to sort the API for the correct response to display:
//In the "next"-section it looks for the first upcoming launch where the time to launch is NOT negative (the API isn't updated every week, so the "next" launch could have a timer of -3 days etc).
//The "prev"-section first reverses the array, to get the most recent launch, however the API also have a few upcoming launches added (probably for auto updating reasons) to the end (or the start, since i reversed it). The find() here looks for the first entry where the launch is NOT ".upcoming", as in it has already launched. Ta-da.
async function blurb() {
    try {
        const nextResponse = await fetch(API_URL + `upcoming`);
        const nextResult = await nextResponse.json();
        const next = nextResult.find(function (due) {
            if (new Date(due.date_local).getTime() - new Date().getTime() > 0) {
                return due.date_local;
            };
        });
        countdown(next);
        const nextDate = new Date(next.date_local).toLocaleDateString(`en-GB`);
        nextLaunch.innerHTML = next.name;
        nextLaunchDate.innerHTML = nextDate;
        const prevResponse = await fetch(API_URL);
        const prevResult = await prevResponse.json();
        const prevResultReverse = prevResult.reverse();
        const prev = prevResultReverse.find(function (launch) {
            return !launch.upcoming;
        });
        const prevDate = new Date(prev.date_local).toLocaleDateString(`en-GB`);
        prevLaunch.innerHTML = prev.name;
        prevLaunchDate.innerHTML = prevDate;
    }
    catch (err) {
        console.log(err);
    }
};

blurb();

