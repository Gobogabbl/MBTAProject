import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AuthorizationPage = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        userID: '',
        username: '',
        authorizationRole: ''
    });
    const [allAuth, setAllAuth] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    useEffect(() => {
        getAllAuth();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/assignAuth', formData);
            // Assuming success, you can navigate to another page or perform any other action here
            // After assigning authorization, refresh the list
            getAllAuth();
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const getAllAuth = async () => {
        try {
            const response = await axios.get('/getAllAuth');
            setAllAuth(response.data);
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleGetAllAuth = async () => {
        getAllAuth();
    };

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>
    );
    const { id, email, username } = user;

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h3>Authorizations Page</h3>
                    <h4>Current User Information</h4>
                    <h4>User: <span className='username'>@{username}</span></h4>
                    <h4>UserID: <span className='userId'>{id}</span></h4>
                    <h4>Email: <span className='email'>{email}</span></h4>

                    <Card body outline color="success" className="mx-1 my-2" style={{ width: "30rem", margin: "auto" }}>
                        {/* page description */}
                        <Card.Body>
                            <Card.Title>Page Description</Card.Title>
                            <Card.Text>This page is a means in order for the admins to see the different roles of each user, showing and/or assigning user roles between the existing roles: User and Admin.</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card body outline color="success" className="mx-1 my-2" style={{ width: "30rem", margin: "auto" }}>
                        {/* Display the necessary authorization text */}
                        <Card.Body>
                            <Card.Title>Assign Authorization</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="userID">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="text" name="userID" value={formData.userID} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="authorizationRole">
                                    <Form.Label>Authorization Role</Form.Label>
                                    <Form.Control type="text" name="authorizationRole" value={formData.authorizationRole} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Assign Authorization
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Button variant="primary" onClick={handleGetAllAuth}>
                        Get All Users and Authorizations
                    </Button>
                </div>

                <div className="text-center">
                    <h3>All Users and Authorizations</h3>
                    {allAuth.map((auth) => (
                        <Card key={auth._id} body outline color="info" className="mx-1 my-2" style={{ width: "20rem", display: "inline-block" }}>
                            <Card.Body>
                                <Card.Title>User ID: {auth.userID}</Card.Title>
                                <Card.Text>Username: {auth.username}</Card.Text>
                                <Card.Text>Authorization Role: {auth.authorizationRole}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AuthorizationPage;