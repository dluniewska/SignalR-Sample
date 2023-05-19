// create connection
let connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updatedTotalViews", (value) => {
    let newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

//invoke hub methods aha send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

//start connection
function fullfilled() {
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}
function rejected(e) {
    console.log("Error with connection to User Hub: " + e);
}
connectionUserCount.start().then(fullfilled, rejected);