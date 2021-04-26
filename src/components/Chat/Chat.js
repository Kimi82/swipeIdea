import React, {useEffect, useState} from 'react'
import './Chat.css'
import { db } from '../../firebase.js'
import firebase from "firebase"
import CloseIcon from '@material-ui/icons/Close';

export default function Chat({idea, user}) {
    
    const [messageValue, setMessageValue] = useState('')
    const [messages, setMessages] = useState([])
    const [disabled, setDisabled] = useState(false)
    
    const sendMessage = (e) =>{
             db.collection("chat").doc(idea.createdBy.replace(/\s/g, '') + idea.ideaName.replace(/\s/g, '')).collection("chad").add({
                createdBy: user,
                messageValue,
                ideaName: idea.ideaName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            e.preventDefault();
            setMessageValue("")
            chatScrollToBottom()            
    }
    
    useEffect (()=>{
     const getMessage = async () =>{
        await db.collection("chat").doc(idea.createdBy.replace(/\s/g, '') + idea.ideaName.replace(/\s/g, '')).collection("chad").orderBy("timestamp")
        .onSnapshot((snapshot) =>{
            setMessages(snapshot.docs.map(doc => doc.data()))
    })
        }
     
    getMessage();
    chatScrollToBottom()  
    },[idea])


    useEffect (() => {
        chatScrollToBottom()
    }, [messages])


    const chatScrollToBottom = () =>{
        var element = document.getElementById("chat__messageWrapper");
        element.scrollTop = element.scrollHeight;

    }

    function convertTime(time){
        try{
        var ideaDate = new Date(time); 
        ideaDate.toLocaleString();
        var time = ideaDate.toISOString().substring(0, 10);
        }catch(error){console.log(error)}
        return time;
      }


    return (
    <div style={disabled ? {display: "none"} : {}}>
    <div id='chat_inner'>
      <div className="chat__header">
        <h1>Chat about: {idea.ideaName} by {idea.createdBy}</h1>
        <CloseIcon onClick={()=> setDisabled(true)}/>
      </div>
    <div id="chat__messageWrapper">
        
     {messages && messages.map(msg => 
     
          msg.createdBy==user?
         <div className="chat__messageOutcome" key={msg.id}>{msg.messageValue}
         <div className="chat__messageTime">
         <span>{msg.createdBy}</span>
         <span>{convertTime(msg.timestamp?.seconds*1000)}</span>
         </div>
         </div>
          :
         <div className="chat__messageIncome" key={msg.id}>{msg.messageValue}
         <div className="chat__messageTime">
         <span>{msg.createdBy}</span>
         <span>{convertTime(msg.timestamp?.seconds*1000)}</span>
         </div>
         </div>
         
     )} 

    </div>
    { <form onSubmit={sendMessage}>  
    <div className="chat__inputWrapper">
 
        <input className="chat__input" onChange={(e) => setMessageValue(e.target.value)} value={messageValue}/>
        <button type="submit" className="chat__button" onClick={sendMessage}>Send</button>

    </div>
    </form>   
    }
    </div>

    </div>
    )
}
