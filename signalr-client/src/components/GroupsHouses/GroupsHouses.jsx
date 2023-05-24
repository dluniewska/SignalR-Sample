import React, { useState, useEffect } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './GroupsHouses.module.css';

const GroupsHouses = () => {
    const [ connection, setConnection ] = useState(null);
    const [ joinedGroups, setJoinedGroups ] = useState();
    const [ slytherin, setSlytherin ] = useState(true);
    const [ gryffindor, setGryffindor ] = useState(true);
    const [ ravenclaw, setRavenclaw ] = useState(true);
    const [ hufflepuff, setHufflepuff ] = useState(true);
    

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .configureLogging(LogLevel.Debug)
            .withUrl(import.meta.env.VITE_GROUPS_HOUSES_HUB)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(fullfilled, rejected)
                .catch(e => console.log('Connection failed: ', e));
            connection.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
                setJoinedGroups(strGroupsJoined)
                console.log(hasSubscribed)
                if (hasSubscribed) {
                    //subscribe to
                    switch (houseName) {
                        case 'slytherin':
                            setSlytherin(false)
                            break;
                        case 'gryffindor':
                            setGryffindor(false)
                            break;
                        case 'hufflepuff':
                            setHufflepuff(false)
                            break;
                        case 'ravenclaw':
                            setRavenclaw(false)
                            break;
                        default:
                            break;
                    }
                    toast.info(`You have subscribed succesfully to ${houseName}`);
                }
                else {
                    //unsubscribe
                    console.log("uns")
                    switch (houseName) {
                        case 'slytherin':
                            setSlytherin(true)
                            break;
                        case 'gryffindor':
                            setGryffindor(true)
                            break;
                        case 'hufflepuff':
                            setHufflepuff(true)
                            break;
                        case 'ravenclaw':
                            setRavenclaw(true)
                            break;
                        default:
                            break;
                    }
                    toast.info(`You have unsubscribed succesfully from ${houseName}`);
                }
            })
            connection.on("newMemberAddedToHouse", (houseName) => {
                toast.info(`Member has subscribed succesfully to ${houseName}`);
            })
            
            connection.on("newMemberRemovedFromHouse", (houseName) => {
                toast.warn(`Member has unsubscribed from ${houseName}`);
            })
            
            connection.on("triggerHouseNotification", (houseName) => {
                toast.info(`A new notification for ${houseName} has been launched.`);
            })
        }
    }, [connection]);

    //start connection
    const fullfilled = () => {
        console.log("Connection to User Hub Successful");
    }
    const rejected = (e) => {
        console.log("Error with connection to User Hub: " + e);
    }

    const OnSubscribeClick = (house) => {
        connection.send("JoinHouse", house)
    }

    const OnUnubscribeClick = (house) => {
        connection.send("LeaveHouse", house)
    }

    const TriggerNotification = (house) =>  {
        connection.send("TriggerHouseNotify", house)
    }

  return (
    <>
        <div className={styles.container}>
            <div>
                <h3>Subscribed List: </h3>
                <hr className={styles.sep}/>
                <div>
                    <div>
                        <label id="lbl_houseJoined">{joinedGroups}</label>
                    </div>
                </div>
            </div>
            <div>
                <h3>Subscribe: </h3>
                <hr className={styles.sep} />
                <div className={styles.actionsContainer}>
                    <div>
                        <button onClick={(e) => OnSubscribeClick(e.target.innerText)} className={`${styles.btnGryf} ${gryffindor ? styles.show : styles.hide}` }>Gryffindor</button>
                    </div>
                    <div>
                        <button  onClick={(e) => OnSubscribeClick(e.target.innerText)} className={`${styles.btnSlyth} ${slytherin ? styles.show : styles.hide}`}>Slytherin</button>
                    </div>
                    <div>
                        <button  onClick={(e) => OnSubscribeClick(e.target.innerText)} className={`${styles.btnHuff} ${hufflepuff ? styles.show : styles.hide}`}>Hufflepuff</button>
                    </div>
                    <div>
                        <button  onClick={(e) => OnSubscribeClick(e.target.innerText)} className={`${styles.btnRav} ${ravenclaw ? styles.show : styles.hide}`}>Ravenclaw</button>
                    </div>
                </div>
            </div>

            <div>
                <h3>Unsubscribe: </h3>
                <hr className={styles.sep} />
                <div className={styles.actionsContainer}>
                    <div>
                        <button onClick={(e) => OnUnubscribeClick(e.target.innerText)} className={`${styles.btnGryf} ${!gryffindor ? styles.show : styles.hide}`}>Gryffindor</button>
                    </div>
                    <div>
                        <button onClick={(e) => OnUnubscribeClick(e.target.innerText)} className={`${styles.btnSlyth} ${!slytherin ? styles.show : styles.hide}`}>Slytherin</button>
                    </div>
                        <div>
                        <button onClick={(e) => OnUnubscribeClick(e.target.innerText)} className={`${styles.btnHuff} ${!hufflepuff ? styles.show : styles.hide}`}>Hufflepuff</button>
                    </div>
                    <div>
                        <button onClick={(e) => OnUnubscribeClick(e.target.innerText)} className={`${styles.btnRav} ${!ravenclaw ? styles.show : styles.hide}`}>Ravenclaw</button>
                    </div>
                </div>
            </div>

            <div>
                <h3>Trigger Notification: </h3>
                <hr className={styles.sep}/>
                <div className={styles.actionsContainer}>
                    <div>
                        <button onClick={(e) => TriggerNotification(e.target.innerText)} className={styles.btnGryf}>Gryffindor</button>
                    </div>
                    <div>
                        <button  onClick={(e) => TriggerNotification(e.target.innerText)} className={styles.btnSlyth}>Slytherin</button>
                    </div>
                    <div>
                        <button  onClick={(e) => TriggerNotification(e.target.innerText)} className={styles.btnHuff}>Hufflepuff</button>
                    </div>
                    <div>
                        <button  onClick={(e) => TriggerNotification(e.target.innerText)} className={styles.btnRav}>Ravenclaw</button>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default GroupsHouses