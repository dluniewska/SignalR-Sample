import React, { useState, useEffect } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import styles from './DeathlyHallows.module.css';
import { ReactComponent as VotingChip } from '../../assets/voting_chip.svg';

const DeathlyHallows = () => {
    const [ connection, setConnection ] = useState(null);
    const [ wandCounter, setWandCounter ] = useState();
    const [ stoneCounter, setStoneCounter ] = useState();
    const [ cloakCounter, setCloakCounter ] = useState();

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .configureLogging(LogLevel.Debug)
            .withUrl(import.meta.env.VITE_DEATHLY_HALLOWS_HUB)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(fullfilled, rejected)
                .catch(e => console.log('Connection failed: ', e));
            connection.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
                setCloakCounter(cloak);
                setStoneCounter(stone);
                setWandCounter(wand);
            });
        }
    }, [connection]);


    //start connection
    function fullfilled() {
        console.log("Connection to User Hub Successful");
        connection.invoke("GetRaceStatus").then((raceCounter) => {
            setCloakCounter(raceCounter.cloak);
            setStoneCounter(raceCounter.stone);
            setWandCounter(raceCounter.wand);
        });
    }
    function rejected(e) {
        console.log("Error with connection to User Hub: " + e);
    }

    async function GetVote(param) {
        await axios.get(`${import.meta.env.VITE_API_HOST}/Home/DeathlyHallows?type=${param}`);
    }

  return (
    <div className={styles.container}>
        <h3>Deathly Hallow Race </h3>
        <div>
            <div>Invisibility Cloak - <span id="cloakCounter">{cloakCounter}</span></div>
        </div>
        <div>
            <div>Resurrection Stone - <span id="stoneCounter">{stoneCounter}</span></div>
        </div>
        <div>
            <div>Elder Wand - <span id="wandCounter">{wandCounter}</span></div>
        </div>
        <hr className={styles.sep}/>
        <p>Click to Vote:</p>
        <div className={styles.voteDiv}><p>1. Invisibility Cloak -</p> <span className={styles.voteSpan} onClick={() => GetVote("cloak")}><VotingChip className={styles.filterGreen} /></span> </div>
        <div className={styles.voteDiv}><p>2. Resurrection Stone -</p> <span className={styles.voteSpan} onClick={() => GetVote("stone")}><VotingChip className={styles.filterGreen} /></span> </div>
        <div className={styles.voteDiv}><p>3. Elder Wand -</p> <span className={styles.voteSpan} onClick={() => GetVote("wand")}><VotingChip className={styles.filterGreen} /></span> </div>
    </div>
  )
}

export default DeathlyHallows