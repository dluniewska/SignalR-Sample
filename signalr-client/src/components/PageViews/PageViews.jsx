import React, { useState, useEffect, useRef } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr';

const PageViews = () => {
    const [ connection, setConnection ] = useState(null);
    const [ pageViews, setPageViews ] = useState();
    const [ pageCurrentConnections, setPageCurrentConnections ] = useState();
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(import.meta.env.VITE_USERS_HUB)
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
        connection.on("updateTotalViews", (value) => {
            setPageViews(value);
        });
        newWindowLoadedOnClient();
        connection.on("updateTotalUsers", (value) => {
            setPageCurrentConnections(value);
        });
    }
    function rejected(e) {
        console.log("Error with connection to User Hub: " + e);
    }

    return (
        <div>
            <div>
                <div>PageViews</div>
                <span>{pageViews}</span>
            </div>
            <div>
                <div>Current Connections</div>
                <span>{pageCurrentConnections}</span>
            </div>
        </div>
    )
}

export default PageViews