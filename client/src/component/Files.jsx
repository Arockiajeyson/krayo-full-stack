import React, { useEffect, useState, useContext, useRef } from 'react'
import './signin.css'
import Context from './ContextApi';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
export default function Files() {
    const { state,handlechange,setFileName ,setState1,reference,state1,name,handleChangeName,fileChecking} = useContext(Context)
    const navigate = useNavigate()
    useEffect(()=>{
        let cookies =new Cookies()
        if(!cookies.get('token')){
            navigate('/')
        }
    },[])

    return (
        <div className='file-div'>
            <button className='Go-to_download-btn' onClick={fileChecking}>	&darr; Go to Download</button>
            <h3 className='h-tag'>Name for your file</h3>
            <input type="text" className='filename'onChange={(e)=>setFileName(e.target.value)}/>
            <h3 className='h-tag' style={{marginTop:'2%'}}>Upload your file</h3>
            <div className='data'>
                <label className='lable-file' htmlFor='file'>{name==true?state1:"Choose the file"}</label>
                <input type="file" id='file' ref={reference} onChange={handleChangeName}/>
            </div>
            <button className='btn-upload' onClick={handlechange}>Upload</button>
        </div>
    )
}
