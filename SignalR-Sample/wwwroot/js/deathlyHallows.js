// create connection
let connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("/hubs/deathlyhallows")
    .withAutomaticReconnect()
    .build();

//connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    let cloakSpan = document.getElementById("cloakCounter");
    let stoneSpan = document.getElementById("stoneCounter");
    let wandSpan = document.getElementById("wandCounter");
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});


//invoke hub methods aka send notification to hub


//start connection
function fullfilled() {
    // second method to get values on first page load
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });
    console.log("Connection to User Hub Successful");
}
function rejected(e) {
    console.log("Error with connection to User Hub: " + e);
}
connectionDeathlyHallows.start().then(fullfilled, rejected);