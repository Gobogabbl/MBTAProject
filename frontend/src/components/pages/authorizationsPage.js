import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const AuthorizationPage = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }

    useEffect(() => {
        setUser(getUserInfo())
    }, [])


    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { id, email, username } = user
    return (
        <>
            <div>
                <h3>
                    Authorizations Page
                </h3>
                <h4>
                    Current User Information
                </h4>
                <h4>
                    User:
                    <span className='username'> @{username}</span>
                </h4>
                <h4>
                    UserID: 
                    <span className='userId'> {id}</span>
                </h4>
                <h4>
                    Email: 
                    <span className='email'> {email}</span>
                </h4>

                <Card
                 body
                 outline
                 color="success"
                 className="mx-1 my-2"
                 style={{ width: "30rem" }}
                >

                <Card.Body>
                <Card.Title>Page Description</Card.Title>
                <Card.Text>This page is a means in order for the admins to see the different roles
                    of each user, showing and/or assigning user roles between the existing roles:
                    User and Admin.
                </Card.Text>
                </Card.Body>
                </Card>
            </div>
            {/* <button onClick={(e) => handleClick(e)}>
                Place Holder
            </button> */}
        </>
    )
}

export default AuthorizationPage