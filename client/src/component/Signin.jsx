import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './signin.css'
import Context from './ContextApi'
import Cookies from 'universal-cookie'
export default function Signin() {
    const { setState } = useContext(Context)
    const navigate = useNavigate()
    const handlecallback = async (res) => {
        const decode = jwt_decode(res.credential)
        let cookies = new Cookies()
        cookies.set('token', res.credential)
        setState(decode.email)
        navigate('/files')
    }
    useEffect(() => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            google.accounts.id.initialize({
                client_id: "698625777335-gd4aq4s18pvp152uaqmpk6bqbmo64jv5.apps.googleusercontent.com",
                callback: handlecallback,
            });

            google.accounts.id.renderButton(document.getElementById('btn'), { theme: 'outline', size: 'large' });
        } else {
            console.error('Google Sign-In API not loaded.');
        }
    }, []);
    return (
        <div id='sign-in'>
            <div className='google-sign-in'>
                <p className='p-tag'>Google sign-in</p>
                <div id='btn'></div>
            </div>
        </div>
    )
}
