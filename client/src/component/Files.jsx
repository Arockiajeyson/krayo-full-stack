import React, { useEffect, useState, useContext, useRef } from 'react'
import './signin.css'
import Context from './ContextApi';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
export default function Files() {
    const { state,handlechange ,setState1,reference,state1,name,handleChangeName} = useContext(Context)
    const navigate = useNavigate()
    useEffect(()=>{
        let cookies =new Cookies()
        if(!cookies.get('token')){
            navigate('/')
        }
    },[])

    return (
        <div className='file-div'>
            <h3 className='h-tag'>Upload your files</h3>
            <div className='data'>
                <label className='lable-file' htmlFor='file'>{name==true?state1:"Choose the file"}</label>
                <input type="file" id='file' ref={reference} onChange={handleChangeName}/>
            </div>
            <button className='btn-upload' onClick={handlechange}>Upload</button>
        </div>
    )
}
