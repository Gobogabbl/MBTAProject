import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import Button from 'react-bootstrap/Button';

function GetUsableTickets() {
    const [oneWayCount, setUsableTickets] = useState(null);
    const [weekendPassCount, setUsablePasses] = useState(null);
    const [user, setUser] = useState({});
    const [crOneWayData, setCrOneWayData] = useState(null);
    const [crWeekendPassData, setCrWeekendPassData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const UrlReduceOW = "http://localhost:8081/cart/reduceOW";
    const UrlReduceWP = "http://localhost:8081/cart/reduceWP";

    useEffect(async () => {
        const userInfo = getUserInfo();
        try {
            console.debug(userInfo.id);
            const response = await axios.get(`http://localhost:8081/cart/getOneWay/${userInfo.id}`);
            setUsableTickets(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        if (userInfo && userInfo.id) {
            setUser(userInfo);
        }
    }, []);

    useEffect(async () => {
        const userInfo = getUserInfo();
        try {
            console.debug(userInfo.id);
            const response = await axios.get(`http://localhost:8081/cart/getWeekendPass/${userInfo.id}`);
            setUsablePasses(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        if (userInfo && userInfo.id) {
            setUser(userInfo);
        }
    }, []);

    const reduceOW = async () => {
        try {
            const response = await axios.post(UrlReduceOW, { userID: user.id });
            setCrOneWayData(response.data);
            setSuccessMessage("You have successfully used a One Way ticket. Have a safe ride!");
            
            const updatedResponse = await axios.get(`http://localhost:8081/cart/getOneWay/${user.id}`);
            setUsableTickets(updatedResponse.data);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reduceWP = async () => {
        try {
            const response = await axios.post(UrlReduceWP);
            setCrWeekendPassData(response.data);
            setSuccessMessage("You have successfully used a Weekend Pass. Have a safe ride!");

            const updatedResponse = await axios.get(`http://localhost:8081/cart/getWeekendPass/${user.id}`);
            setUsablePasses(updatedResponse.data);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!user.id) return (<div><h4>Log in to view this page.</h4></div>);

    return (
        <div class="col-md-12 text-center">
            <h1>Which ticket would you like to use?</h1>
            <Button variant="info" onClick={reduceOW} disabled={oneWayCount === 0}>One Way</Button>
            <Button variant="warning" onClick={reduceWP} disabled={weekendPassCount === 0}>Weekend Pass</Button>
            <Card.Text>
                <p>Number of available One Way tickets: {oneWayCount !== null ? oneWayCount : 'Loading...'}</p>
                <p>Number of available Weekend Passes: {weekendPassCount !== null ? weekendPassCount : 'Loading...'}</p>
                {successMessage && <p>{successMessage}</p>}
            </Card.Text>
        </div>
    );
}

export default GetUsableTickets;
