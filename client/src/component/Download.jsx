import React, { useContext, useEffect, useState } from 'react'
import Context from './ContextApi';

import axios from 'axios'
import './signin.css'
export default function Download() {
    const { state ,downloadfile} = useContext(Context)
    const [fileData, setFileData] = useState([])
    useEffect(() => {
        console.log(state)
        const resData = async () => {
            const res = await axios.post('http://localhost:3001/download', { email: state })
            setFileData(res.data)
        }
        resData()
    }, [])
    
    return (
        <div className='download'>
            {fileData.map((e,i) => {
                return (
                    <div key={i} className='wrapper'>
                        <p>{`Uploaded file ${i+1}`}</p>
                        <button className='download-btn' onClick={() => downloadfile(e._id)}>Click to download file</button>
                    </div>
                )
            })}
        </div>
    )
}
