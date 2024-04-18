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
        username: '',
        authorizationRole: ''
    });
    const [allAuth, setAllAuth] = useState([]);
    const [assignAuthResponse, setAssignAuthResponse] = useState('');
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
            const response = await axios.post('http://localhost:8081/auth/assignAuth', formData);
            if (response.status === 200 || response.status === 201) {
                setAssignAuthResponse('Authorization assigned successfully');
                // Assuming success, you can navigate to another page or perform any other action here
                // After assigning authorization, refresh the list
                getAllAuth();
            } 
            else if (response.status === 404) {
                setAssignAuthResponse(response.data.error || 'User not found');
            }
            else if (response.status === 401) {
                setAssignAuthResponse(response.data.error || 'Invalid authorization role');
            }
            else {
                setAssignAuthResponse(response.data.message || 'Failed to assign authorization');
            }
        } catch (error) {
            console.error(error);
            // Handle error
            setAssignAuthResponse(error.response.data.message || 'Failed to assign authorization');
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

                    

                    {assignAuthResponse && (
                        <Card body outline color="info" className="mx-1 my-2" style={{ width: "30rem", margin: "auto" }}>
                            <Card.Body>
                                <Card.Title>Assign Authorization Response</Card.Title>
                                <Card.Text>{assignAuthResponse}</Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthorizationPage;