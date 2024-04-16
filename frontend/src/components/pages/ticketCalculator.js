import React, { useState, useEffect } from 'react';
import getUserInfo from '../../utilities/decodeJwt';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const TicketCalculator = () => { // Renamed component to StorePage
    const [user, setUser] = useState({});
    const [cart, setCart] = useState(null);
    const [totalCost, setTotalCost] = useState(0); // State to store total cost
    
    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    useEffect(() => {
        const createCart = async () => {
            try {
                const response = await axios.post('http://localhost:8081/cart/createCart', { username: user.username });
                setCart(response.data);
            } catch (error) {
                console.error('Error creating cart:', error);
            }
        };
        
        if (user.username) {
            createCart();
        }
    }, [user]);

    const increaseOW = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/increaseOW', cart.userId);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const increaseWP = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/increaseWP', cart.userId);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reduceOW = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/reduceOW', cart.userId);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reduceWP = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/reduceWP', cart.userId);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const calculate = () => {
        if (cart) {
            var oTicketsCost = cart.crOneWay * 2.40;
            var wTicketsCost = cart.crWeekendPass * 10.00;
            var total = oTicketsCost + wTicketsCost;
            setTotalCost(total); // Update the total cost state
        }
    }

    return (
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
            <Card.Body>
                <Card.Title>Ticket Calculator</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Select if you would like to increase or decrease a specific type of ticket.
                You can then calculate the total cost of the tickets.</Card.Subtitle>
                <div>
                    {cart && (
                        <div>
                            <p>Username: {user.username}</p>
                            <p>One Way Tickets ($2.40): {cart.crOneWay}</p>
                            <p>Weekend Pass Tickets ($10.00): {cart.crWeekendPass}</p>
                            <p>Total Cost: ${totalCost}</p> {/* Display total cost from state */}
                        </div>
                    )}
                </div>
                <Button variant="primary" onClick={increaseOW}>Increase One Way Tickets</Button>
                <Button variant="primary" onClick={increaseWP}>Increase Weekend Pass Tickets</Button> {/* Corrected label */}
                <Button variant="primary" onClick={reduceOW}>Decrease One Way Tickets</Button> {/* Corrected label */}
                <Button variant="primary" onClick={reduceWP}>Decrease Weekend Pass Tickets</Button> {/* Corrected label */}
                <Button variant="primary" onClick={calculate}>Calculate Total</Button>
            </Card.Body>
        </Card>
    );
};

export default TicketCalculator;
