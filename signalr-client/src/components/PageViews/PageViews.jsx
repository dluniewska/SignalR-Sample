import React, { useState, useEffect, useRef } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr';

const PageViews = () => {
    const [ connection, setConnection ] = useState(null);
    const [ pageViews, setPageViews ] = useState();
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:60059/hubs/userCount')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(fullfilled, rejected)
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    //invoke hub methods aka send notification to hub
    function newWindowLoadedOnClient() {
        connection.send("NewWindowLoaded");
    }

    //start connection
    function fullfilled() {
        console.log("Connection to User Hub Successful");
        connection.on("updatedTotalViews", (value) => {
            setPageViews(value);
        });
        newWindowLoadedOnClient();
    }
    function rejected(e) {
        console.log("Error with connection to User Hub: " + e);
    }

    return (
        <>
            <div>PageViews</div>
            <span id="totalViewsCounter">{pageViews}</span>
        </>
    )
}

export default PageViews