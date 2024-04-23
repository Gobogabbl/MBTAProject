import React, { useState, useEffect } from 'react';
import getUserInfo from '../../utilities/decodeJwt';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const StorePage = () => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState(null);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const user = getUserInfo();
        setUser(user);
    
        const fetchCart = async (username) => {
            try {
                const response = await axios.get(`http://localhost:8081/cart/getCart/${username}`);
                if (response.data && Object.keys(response.data).length > 0) {
                    // Cart exists, set it
                    setCart(response.data);
                } else {
                    // Cart doesn't exist, create one
                    const createResponse = await axios.post('http://localhost:8081/cart/createCart', { username: username });
                    setCart(createResponse.data);
                }
            } catch (error) {
                console.error('Error fetching or creating cart:', error);
            }
        };
    
        if (user && user.username) {
            fetchCart(user.username);
        }
    }, []);    

    const increaseTickets = async (type) => {
        try {
            const response = await axios.post(`http://localhost:8081/cart/increase${type}`, { username: cart.username });
            setCart(response.data);
        } catch (error) {
            console.error(`Error increasing ${type} tickets:`, error);
        }
    };

    const reduceTickets = async (type) => {
        try {
            const response = await axios.post(`http://localhost:8081/cart/reduce${type}`, { username: cart.username });
            setCart(response.data);
        } catch (error) {
            console.error(`Error increasing ${type} tickets:`, error);
        }
    };

    const calculateTotal = () => {
        if (cart) {
            const oTicketsCost = cart.crOneWay * 2.40;
            const wTicketsCost = cart.crWeekendPass * 10.00;
            const total = oTicketsCost + wTicketsCost;
            setTotalCost(total.toFixed(2)); // Set total cost with 2 decimal places
        }
    };
    

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>
    );
    
    return (
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Select if you would like to increase a specific type of ticket. You can then calculate the total cost of the tickets.</Card.Subtitle>
                <div>
                    {cart ? (
                        <div>
                            <p>Username: {user.username}</p>
                            <p>One Way Tickets ($2.40): {cart.crOneWay}</p>
                            <p>Weekend Pass Tickets ($10.00): {cart.crWeekendPass}</p>
                            <p>Total Cost: ${totalCost}</p>
                        </div>
                    ) : (
                        <p>Loading cart...</p>
                    )}
                </div>
                <Button variant="primary" onClick={() => increaseTickets('OW')}>Increase One Way Tickets</Button>
                <Button variant="primary" onClick={() => increaseTickets('WP')}>Increase Weekend Pass Tickets</Button>
                <Button variant="primary" onClick={() => reduceTickets('OW')}>Reduce One Way Tickets</Button>
                <Button variant="primary" onClick={() => reduceTickets('WP')}>Reduce Weekend Pass Tickets</Button>
                <Button variant="primary" onClick={calculateTotal}>Calculate Total</Button>
            </Card.Body>
        </Card>
    );
};

export default StorePage;
