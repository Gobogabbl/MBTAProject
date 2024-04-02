import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function DeleteUsedTickets(){
    const [usedTickets, setUsedTickets] = useState([]);

    useEffect(() => {
        async function fetchData(){
            try {
                const response = await axios.get('http://localhost:8081/cart/cartGetOneWay');
                setUsedTickets(response.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Currently Owned Tickets</h1>
            {usedTickets.map(ticket => (
                <Card key={ticket.id} body outline color="success" className="mx-1 my-2" bg="danger" style={{ width: "30rem"}}>
                    <Card.Body>
                        <Card.Title>{ticket.attributes.header}</Card.Title>
                        <Card.Text>{ticket.attributes.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default DeleteUsedTickets;
