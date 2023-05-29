let connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/Notification")
    .build();

document.getElementById("sendButton").disabled = true;

connectionNotification.on("LoadNotification", (message, counter) => {
    document.getElementById("messageList").innerHTML = "";
    let notificationCounter = document.getElementById("notificationCounter");
    notificationCounter.innerHTML = `<span>(${counter})</span>`;
    for (let i = message.length - 1; i >= 0; i--) {
        let li = document.createElement("li");
        li.textContent = `Notification - ${message[i]}`;
        document.getElementById("messageList").appendChild(li);
    }
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("notificationInput").value;
    connectionNotification.send("SendMessage", message).then(() => {
        document.getElementById("notificationInput").value = "";
    })
    event.preventDefault();
})


connectionNotification.start().then(() => {
    connectionNotification.send("LoadMessages");
    document.getElementById("sendButton").disabled = false;
});