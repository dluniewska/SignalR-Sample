let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

// create connection
let connectionHouse = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("/hubs/houseGroupHub")
    .withAutomaticReconnect()
    .build();

btn_gryffindor.addEventListener("click", function (e) {
    connectionHouse.send("JoinHouse", "Gryffindor")
    e.preventDefault();
})
btn_slytherin.addEventListener("click", function (e) {
    connectionHouse.send("JoinHouse", "Slytherin")
    e.preventDefault();
})
btn_hufflepuff.addEventListener("click", function (e) {
    connectionHouse.send("JoinHouse", "Hufflepuff")
    e.preventDefault();
})
btn_ravenclaw.addEventListener("click", function (e) {
    connectionHouse.send("JoinHouse", "Ravenclaw")
    e.preventDefault();
})

btn_un_gryffindor.addEventListener("click", function (e) {
    connectionHouse.send("LeaveHouse", "Gryffindor")
    e.preventDefault();
})
btn_un_slytherin.addEventListener("click", function (e) {
    connectionHouse.send("LeaveHouse", "Slytherin")
    e.preventDefault();
})
btn_un_hufflepuff.addEventListener("click", function (e) {
    connectionHouse.send("LeaveHouse", "Hufflepuff")
    e.preventDefault();
})
btn_un_ravenclaw.addEventListener("click", function (e) {
    connectionHouse.send("LeaveHouse", "Ravenclaw")
    e.preventDefault();
})

trigger_gryffindor.addEventListener("click", function (e) {
    connectionHouse.send("TriggerHouseNotify", "Gryffindor")
    e.preventDefault();
})
trigger_slytherin.addEventListener("click", function (e) {
    connectionHouse.send("TriggerHouseNotify", "Slytherin")
    e.preventDefault();
})
trigger_hufflepuff.addEventListener("click", function (e) {
    connectionHouse.send("TriggerHouseNotify", "Hufflepuff")
    e.preventDefault();
})
trigger_ravenclaw.addEventListener("click", function (e) {
    connectionHouse.send("TriggerHouseNotify", "Ravenclaw")
    e.preventDefault();
})

connectionHouse.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    if (hasSubscribed) {
        //subscribe to
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                break;
        }
        toastr.success(`You have subscribed succesfully to ${houseName}`);
    }
    else {
        //unsubscribe

        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }
        toastr.success(`You have unsubscribed succesfully from ${houseName}`);
    }
})

connectionHouse.on("newMemberAddedToHouse", (houseName) => {
    toastr.success(`Member has subscribed succesfully to ${houseName}`);
})

connectionHouse.on("newMemberRemovedFromHouse", (houseName) => {
    toastr.warning(`Member has unsubscribed from ${houseName}`);
})

connectionHouse.on("triggerHouseNotification", (houseName) => {
    toastr.warning(`A new notification for ${houseName} has been launched.`);
})

//start connection
function fullfilled() {
    console.log("Connection to User Hub Successful");
}
function rejected(e) {
    console.log("Error with connection to User Hub: " + e);
}

connectionHouse.start().then(fullfilled, rejected);
