import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import Button from 'react-bootstrap/Button';

import oneWayTicketImage from './images/OneWayTicket.png';
import weekendPassImage from './images/WeekendPass.png';

function GetUsableTickets() {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo && userInfo.username) {
            setUser(userInfo);
        }
    }, []);

    useEffect(() => {
        const createCart = async () => {
            try {
                const temp = await axios.get(`http://localhost:8081/cart/getCart/${user.username}`);
                if (!temp.data) {
                    const response = await axios.post('http://localhost:8081/cart/createCart', { username: user.username });
                    setCart(response.data);
                } else {
                    setCart(temp.data);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        if (user.username) {
            createCart();
        }
    }, [user]);

    const reduceOW = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/reduceOW', { username: cart.username });
            setSuccessMessage(<p style={{ color: '#004d99', fontWeight: 'bold' }}>You have successfully used a One Way ticket. Have a safe ride!</p>);
            setCart(response.data);
        } catch (error) {
            console.error('Error reducing One Way ticket:', error);
        }
    };

    const reduceWP = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/reduceWP', { username: cart.username });
            setSuccessMessage(<p style={{ color: '#004d99', fontWeight: 'bold' }}>You have successfully used a Weekend Pass. Have a safe ride!</p>);
            setCart(response.data);
        } catch (error) {
            console.error('Error reducing Weekend Pass:', error);
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    if (!user.username) return <div><h4>Log in to view this page.</h4></div>;

    return (
        <div className="col-md-12 text-center">
            <h1>Which ticket would you like to use?</h1>
            <Button variant="info" onClick={reduceOW} disabled={cart.crOneWay === 0} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>One Way</Button>
            <Button variant="warning" onClick={reduceWP} disabled={cart.crWeekendPass === 0} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>Weekend Pass</Button>
            <Card.Text>
            {(cart.crOneWay === 0 && cart.crWeekendPass === 0) && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>You have zero tickets, please purchase a ticket to proceed.</p>
                )}
                {successMessage}
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1', textAlign: 'center', padding: '10px' }}>
                        <p style={{ marginBottom: '0' }}>Number of available One Way tickets: {cart.crOneWay}</p>
                        {cart.crOneWay > 0 && (
                            <div>
                                {[...Array(cart.crOneWay)].map((_, index) => (
                                    <img key={index} src={oneWayTicketImage} alt="One Way Ticket" style={{ width: '100px', height: 'auto', margin: '5px' }} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ flex: '1', textAlign: 'center', padding: '10px', margin: '-5px 0' }}>
                        <p style={{ marginBottom: '0' }}>Number of available Weekend Passes: {cart.crWeekendPass}</p>
                        {cart.crWeekendPass > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {[...Array(cart.crWeekendPass)].map((_, index) => (
                                    <img key={index} src={weekendPassImage} alt="Weekend Pass" style={{ width: '100px', height: 'auto', margin: '5px' }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Card.Text>
        </div>
    );
}

export default GetUsableTickets;
