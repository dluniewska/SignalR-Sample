import React, { useState, useEffect, useRef } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import styles from './PageViews.module.css';

const PageViews = () => {
    const [ connection, setConnection ] = useState(null);
    const [ pageViews, setPageViews ] = useState();
    const [ pageCurrentConnections, setPageCurrentConnections ] = useState();
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .configureLogging(LogLevel.Debug)
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
            connection.on("updateTotalViews", (value) => {
                setPageViews(value);
            });
            connection.on("updateTotalUsers", (value) => {
                setPageCurrentConnections(value);
            });
        }
    }, [connection]);

    //invoke hub methods aka send notification to hub
    function newWindowLoadedOnClient() {
        connection.send("NewWindowLoaded");
    }

    //start connection
    function fullfilled() {
        console.log("Connection to User Hub Successful");
        newWindowLoadedOnClient();
    }
    function rejected(e) {
        console.log("Error with connection to User Hub: " + e);
    }

    return (
        <div className={styles.container}>
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