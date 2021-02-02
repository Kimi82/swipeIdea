import React, {useEffect, useState} from 'react'
import './Chat.css'
import { db } from '../../firebase.js'
import firebase from "firebase"


export default function Chat({idea, user}) {
    
    const [messageValue, setMessageValue] = useState('')

    console.log(messageValue)

    const sendMessage = () =>{ś
        
            db.collection("chat").doc(idea.createdBy + idea.id).collection(user).add({
                createdBy: user,
                messageValue,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMessageValue("")            
    }

    return (
    <div className='chat_inner'>  
    <h1>Chat about: {idea.ideaName} by {idea.createdBy}</h1>
    <h2>text</h2>
    <h3>text</h3>  
    <input className="chat__input" onChange={(e) => setMessageValue(e.target.value)} value={messageValue}/>
    <button className="chat__button" onClick={sendMessage}>Send</button>  
    </div>

  
    )
}
