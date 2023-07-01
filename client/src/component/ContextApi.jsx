import React, { useState,useRef  } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Context = createContext()
export function ContextApi({ children }) {
    const [state,setState] =useState()
    const [state1,setState1] =useState()
    const reference = useRef(null)
    const navigate =useNavigate()
    const handlechange = async (e) => {
        e.preventDefault()
        // console.log(state1)
        try {
            const formData = new FormData();
            formData.append('file', reference.current.files[0])
            const responeses = await axios.post(`http://localhost:3001/filesupload/${state}`, formData);
            console.log(responeses)
            if (responeses.data == 'done') {
                navigate('/Download')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const downloadfile = async (i) => {
        const res = await axios.get(`http://localhost:3001/fileDownload/${i}`, { responseType: "blob" })
        // console.log(res.data)
        
        const blob = new Blob([res.data], { type: res.data.type });
        let filename = blob.type
        let newFilename = filename.split('/')
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${newFilename[0]}.${newFilename[1]}`;
        link.click();
        
    }
    return (
        <div>
            <Context.Provider value={{setState,state,handlechange,reference,downloadfile}}>
                {children}
            </Context.Provider>
        </div>
    )
}
export default Context