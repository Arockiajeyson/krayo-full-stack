import React, { useEffect, useState, useContext, useRef } from 'react'

import './signin.css'
import Context from './ContextApi';
export default function Files() {
    const { state,handlechange ,setState1,reference} = useContext(Context)
    

    return (
        <div className='file-div'>
            <div className='data'>
                <p className='lable-file'>upload file</p>
                <input type="file" ref={reference} />
            </div>
            <button className='btn-upload' onClick={handlechange}>upload</button>
        </div>
    )
}
