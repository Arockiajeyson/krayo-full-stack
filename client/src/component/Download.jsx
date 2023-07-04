import React, { useContext, useEffect, useState } from 'react'
import Context from './ContextApi';

import axios from 'axios'
import './signin.css'
export default function Download() {
    const { state, downloadfile } = useContext(Context)
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
            <div className='down-div'>
                <h3 className='h-tag down-h3'>Uploaded files</h3>
                <div className='download'>
                    {fileData.map((e, i) => {
                        return (
                            <div key={i} className='wrapper'>
                                <p>{e.file}</p>
                                <button className='download-btn' onClick={() => downloadfile(e._id)}>{e.fileName.split('-')[1]}</button>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}
