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
                <h3>
                    Current User Information
                </h3>
                <h3>
                    User:
                    <span className='username'> @{username}</span>
                </h3>
                <h3>
                    UserID: 
                    <span className='userId'> {id}</span>
                </h3>
                <h3>
                    Email: 
                    <span className='email'> {email}</span>
                </h3>
            </div>
            <button onClick={(e) => handleClick(e)}>
                Place Holder
            </button>
        </>
    )
}

export default AuthorizationPage