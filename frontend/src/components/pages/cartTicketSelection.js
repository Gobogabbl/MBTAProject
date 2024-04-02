import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const CartTicketSelection = () => {
    const [crOneWayData, setCrOneWayData] = useState(null);
    const [crWeekendPassData, setCrWeekendPassData] = useState(null);
    const UrlReduceOW = "http://localhost:8081/cart/reduceOW";
    const UrlReduceWP = "http://localhost:8081/cart/reduceWP";
    const UrlIncreaseOW = "http://localhost:8081/cart/increaseOW";
    const UrlIncreaseWP = "http://localhost:8081/cart/increaseWP";

    const increaseOW = async () => {
        try {
            const response = await axios.post(UrlIncreaseOW);
            setCrOneWayData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const reduceOW = async () => {
        try {
            const response = await axios.post(UrlReduceOW);
            setCrOneWayData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const increaseWP = async () => {
        try {
            const response = await axios.post(UrlIncreaseWP);
            setCrWeekendPassData(response.data);
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
    
    return (
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
            <Card.Body>
                <Card.Title>Ticket Selection</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Select if you would like to increase or decrease a specific type of ticket.</Card.Subtitle>
                <Card.Text>
                    {crOneWayData && (
                    <div>
                        <p>Username: {crOneWayData.username}</p>
                        <p>One Way Tickets: {crOneWayData.crOneWay}</p>
                    </div>
                    )}
                    {crWeekendPassData && (
                        <div>
                            <p>Weekend Pass Tickets: {crWeekendPassData.crWeekendPass}</p>
                        </div>
                    )}
                </Card.Text>
                <Button variant="primary" onClick={increaseOW}>Increase One Way Tickets</Button>
                <Button variant="primary" onClick={reduceOW}>Reduce One Way Tickets</Button>
                <Button variant="primary" onClick={increaseWP}>Increase Weekend Pass Tickets</Button>
                <Button variant="primary" onClick={reduceWP}>Reduce Weekend Pass Tickets</Button>
            </Card.Body>
        </Card>
    );
};

export default CartTicketSelection;
