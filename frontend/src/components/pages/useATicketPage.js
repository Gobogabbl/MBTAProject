import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';

function GetUsableTickets() {
    const [usableTickets, setUsableTickets] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo && userInfo.id) {
            setUser(userInfo);
        }
    }, []);

    useEffect(() => {
        if (user.id) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            console.debug(user.id);
            const response = await axios.get(`http://localhost:8081/cart/getOneWay/userId=${user.id}`);
            setUsableTickets(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if (!user.id) return (<div><h4>Log in to view this page.</h4></div>);

    return (
        <div>
            <h1>Which ticket would you like to use?</h1>
            {usableTickets.map(ticket => (
                <Card key={ticket.id} body outline color="success" className="mx-1 my-2" bg="danger" style={{ width: "30rem" }}>
                    <Card.Body>
                        <Card.Title>{ticket.attributes.header}</Card.Title>
                        <Card.Text>{ticket.attributes.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default GetUsableTickets;