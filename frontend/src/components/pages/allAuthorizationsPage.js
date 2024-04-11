import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AllAuthorizations = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        userID: '',
        username: '',
        authorizationRole: ''
    });
    const [authInfo, setAuthInfo] = useState(null);
    const [allAuth, setAllAuth] = useState([]);
    

    useEffect(() => {
        async function fetchData() {
          setUser(getUserInfo());
          
          try {
            const authResponse = await axios.get('http://localhost:8081/auth/getAuthByID');
            setAuthInfo(authResponse.data.auth);
            
            const allAuthResponse = await axios.get('http://localhost:8081/auth/getAllAuth');
            setAllAuth(allAuthResponse.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8081/auth/getAuthByID?userID=${formData.userID}`);
            if (response.status === 200 || response.status === 201) {
                setAuthInfo(response.data.auth);
            } else {
                setAuthInfo(response.data);
            }
        } catch (error) {
            console.error(error);
            setAuthInfo(error.response.data);
        }
    };

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>
    );
    const { id, email, username } = user;

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h3>All Authorizations</h3>
                    <h4>Current User Information</h4>
                    <h4>User: <span className='username'>@{username}</span></h4>
                    <h4>UserID: <span className='userId'>{id}</span></h4>
                    <h4>Email: <span className='email'>{email}</span></h4>

                    <Card body outline color="success" className="mx-1 my-2" style={{ width: "30rem", margin: "auto" }}>
                        {/* page description */}
                        <Card.Body>
                            <Card.Title>Page Description</Card.Title>
                            <Card.Text>This page will grant the capability to see all of the users on the site, and their authorizations</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card body outline color="success" className="mx-1 my-2" style={{ width: "30rem", margin: "auto" }}>
                        {/* Display the necessary authorization text */}
                        <Card.Body>
                            <Card.Title>Get Specific Authorization</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="userID">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="text" name="userID" value={formData.userID} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Get Authorization
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {authInfo && (
                        <Card body outline color="info" className="mx-1 my-2" style={{ width: "30rem", margin: "auto" }}>
                            <Card.Body>
                                <Card.Title>Authorization Information</Card.Title>
                                {authInfo.error ? (
                                    <Card.Text>Error: {authInfo.error}</Card.Text>
                                ) : (
                                    <>
                                        <Card.Text>User ID: {authInfo.userID}</Card.Text>
                                        <Card.Text>Username: {authInfo.username}</Card.Text>
                                        <Card.Text>Authorization Role: {authInfo.authorizationRole}</Card.Text>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    )}
                    {/* All Users and Authorizations section */}
                    <div>
                        <h3>All Users and Authorizations</h3>
                        {allAuth.map(auth => (
                        <Card
                            key={auth._id}
                            body
                            outline
                            color="info"
                            className="mx-1 my-2"
                            style={{ width: "30rem" }}
                        >
                        <Card.Body>
                            <Card.Title>User ID: {auth.userID}</Card.Title>
                            <Card.Text>Username: {auth.username}</Card.Text>
                            <Card.Text>Authorization Role: {auth.authorizationRole}</Card.Text>
                        </Card.Body>
                            </Card>
          ))}
        </div>
                </div>
            </div>
        </>
    );
};

export default AllAuthorizations;
