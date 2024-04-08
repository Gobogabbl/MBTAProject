import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import Button from 'react-bootstrap/Button';

function GetUsableTickets() {
    const [oneWayCount, setUsableTickets] = useState(null); // Initialize to null
    const [user, setUser] = useState({});
    const [crOneWayData, setCrOneWayData] = useState(null);
    const [crWeekendPassData, setCrWeekendPassData] = useState(null);
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

    const reduceOW = async () => {
        try {
            const response = await axios.post(UrlReduceOW);
            setCrOneWayData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reduceWP = async () => {
        try {
            const response = await axios.post(UrlReduceWP);
            setCrWeekendPassData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!user.id) return (<div><h4>Log in to view this page.</h4></div>);

    return (
        <div class="col-md-12 text-center">
            <h1>Which ticket would you like to use?</h1>
            <Button variant="primary" onClick={reduceOW}>One Way</Button>
            <Button variant="primary" onClick={reduceWP}>Weekend Pass</Button>
            <Card.Text>
                <p>Number of available One Way tickets: {oneWayCount !== null ? oneWayCount : 'Loading...'}</p> {/* Display oneWayCount */}
                      // Display text on successful button press for both buttons here
                      // Have buttons unclickable if used does not have needed ticket
            </Card.Text>
        </div>
    );
}

export default GetUsableTickets;
