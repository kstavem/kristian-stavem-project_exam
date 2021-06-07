const launchTime = document.querySelector(".launch--time");

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
    console.log(myDate);

    const time = new Date(ld).toLocaleTimeString('en-US',
        { timeStyle: 'long', hour12: true });
    console.log(time);
};

launchDate("2021-09-14T20:00:00-04:00");

