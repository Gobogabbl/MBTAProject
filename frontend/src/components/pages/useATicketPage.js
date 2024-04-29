import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import Button from 'react-bootstrap/Button';

import oneWayTicketImage from './images/PolarExpressTicket.png';
import weekendPassImage from './images/ORAS_Eon_Ticket.png';

function GetUsableTickets() {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    useEffect(() => {
        const createCart = async () => {
            const temp = await axios.get(`http://localhost:8081/cart/getCart/${user.username}`);
            if (!temp)
                try {
                    const response = await axios.post('http://localhost:8081/cart/createCart', { username: user.username });
                    setCart(response.data);
                } catch (error) {
                    console.error('Error creating cart:', error);
                }
            else {
                setCart(temp.data)
            }
        };

        if (user.username) {
            createCart();
        }
    }, [user]);

    const reduceOW = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/reduceOW', { username: cart.username });
            setSuccessMessage("You have successfully used a One Way ticket. Have a safe ride!");
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reduceWP = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/reduceWP', { username: cart.username });
            setSuccessMessage("You have successfully used a Weekend Pass. Have a safe ride!");
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    if (!user) return (<div><h4>Log in to view this page.</h4></div>);

    return (
        <div className="col-md-12 text-center">
            <h1>Which ticket would you like to use?</h1>
            <Button variant="info" onClick={reduceOW} disabled={cart.crOneWay === 0}>One Way</Button>
            <Button variant="warning" onClick={reduceWP} disabled={cart.crWeekendPass === 0}>Weekend Pass</Button>
            <Card.Text>
                <p>Number of available One Way tickets: {cart.crOneWay}</p>
                {cart.crOneWay > 0 && (
                    <div>
                        {[...Array(cart.crOneWay)].map((_, index) => (
                            <img key={index} src={oneWayTicketImage} alt="One Way Ticket" style={{ width: '100px', height: 'auto', margin: '5px' }} />
                        ))}
                    </div>
                )}
                <p>Number of available Weekend Passes: {cart.crWeekendPass}</p>
                {cart.crWeekendPass > 0 && (
                    <div>
                        {[...Array(cart.crWeekendPass)].map((_, index) => (
                            <img key={index} src={weekendPassImage} alt="Weekend Pass" style={{ width: '100px', height: 'auto', margin: '5px' }} />
                        ))}
                    </div>
                )}
                {cart.crOneWay === 0 && cart.crWeekendPass === 0 && (
                    <p style={{ color: 'red' }}>You have zero tickets, please purchase a ticket to proceed.</p>
                )}
                {successMessage && <p>{successMessage}</p>}
            </Card.Text>
        </div>
    );
}

export default GetUsableTickets;
