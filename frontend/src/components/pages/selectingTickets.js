import React, { useState, useEffect } from 'react';
import getUserInfo from '../../utilities/decodeJwt';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import mbtaSymbol from './images/MBTASymbol.png';

const SelectingTickets = () => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [crOneWay, setCROneWay] = useState(0);
    const [crWeekendPass, setCRWeekendPass] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');


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

    const increaseOW = async () => {
        try {
            setCROneWay(crOneWay + 1);
            calculateTotal(newCount, crWeekendPass);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const increaseWP = async () => {
        try {
            setCRWeekendPass(crWeekendPass + 1);
            calculateTotal(crOneWay, newCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reduceOW = async () => {
        try {
            setCROneWay(crOneWay - 1);
            calculateTotal(newCount, crWeekendPass);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reduceWP = async () => {
        try {
            setCRWeekendPass(crWeekendPass - 1);
            calculateTotal(crOneWay, newCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotal = (oneWayCount, weekendPassCount) => {
        if (cart) {
            const oTicketsCost = oneWayCount * 2.40;
            const wTicketsCost = weekendPassCount * 10.00;
            const total = oTicketsCost + wTicketsCost;
            setTotalCost(total.toFixed(2)); // Set total cost with 2 decimal places
        }
    };

    const handlePurchaseConfirmation = () => {
        setConfirmationMessage(`Are you sure you want to purchase ${crOneWay} one-way tickets and ${crWeekendPass} weekend pass tickets?`);
        setShowConfirmationModal(true);
    };
    
    const handlePurchase = async () => {
        try {
            const response = await axios.put('http://localhost:8081/cart/editCart', {
                username: user.username,
                crOneWay: crOneWay + cart.crOneWay,
                crWeekendPass: crWeekendPass + cart.crWeekendPass
            });
            setCart(response.data)
            setCROneWay(0)
            setCRWeekendPass(0)
            // Optionally, you can display a success message to the user
            setShowConfirmationModal(false);
            setConfirmationMessage('');
        } catch (error) {
            console.error('Error purchasing tickets:', error);
        }
    };        
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', marginTop: '-30px' }}>
            <Card style={{ width: '50rem', margin: '10px 0', maxWidth: 'calc(100% - 50px)' }} className="mx-2 my-2">
                <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>Welcome to the Ticket Selection Page</Card.Title>
                <Card.Subtitle style={{ textAlign: 'center' }} className="mb-2 text-muted">Select the amount of each ticket you want. You can then add that amount to your cart.</Card.Subtitle>
                <div style={{ textAlign: 'center' }}>
                    {cart ? (
                        <div>
                            <p>Username: {user.username}</p>
                            <p>One Way Tickets ($2.40): {crOneWay}</p>
                            <p>Weekend Pass Tickets ($10.00): {crWeekendPass}</p>
                            <p>Total Cost: ${totalCost}</p>
                        </div>
                    ) : (
                        <p>Loading cart...</p>
                    )}
                </div>

    
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button variant="primary" onClick={increaseOW} style={{ marginRight: '10px', minWidth: '150px' }}>Increase One Way Tickets</Button>
                        <Button variant="primary" onClick={increaseWP} style={{ marginRight: '10px', minWidth: '150px' }}>Increase Weekend Pass Tickets</Button>
                        <Button variant="primary" onClick={reduceOW} style={{ marginRight: '10px', minWidth: '150px' }} disabled={crOneWay === 0}>Reduce One Way Tickets</Button>
                        <Button variant="primary" onClick={reduceWP} style={{ minWidth: '150px' }} disabled={crWeekendPass === 0}>Reduce Weekend Pass Tickets</Button>
                    </div>
    
                    {/* Purchase Tickets button */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button variant="primary" onClick={handlePurchaseConfirmation} disabled={crOneWay === 0 & crWeekendPass === 0} style={{ minWidth: '200px' }}>Purchase Tickets</Button>
                    </div>
    
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {showConfirmationModal && (
                            <Card style={{ width: '30rem' }} className="mx-2 my-2">
                                <Card.Body>
                                    <Card.Title>Confirm Purchase</Card.Title>
                                    <Card.Text>
                                        {confirmationMessage}
                                    </Card.Text>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <Button variant="primary" onClick={handlePurchase} style={{ marginRight: '10px', minWidth: '150px' }}>Confirm</Button>
                                        <Button variant="primary" onClick={() => setShowConfirmationModal(false)} style={{ minWidth: '150px' }}>Cancel</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </Card.Body>
            </Card>
            <img src={mbtaSymbol} alt="MBTA Symbol" style={{ marginTop: '20px', maxWidth: '200px' }} />
        </div>
    );           
};

export default SelectingTickets;
