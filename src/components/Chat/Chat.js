import React, {useEffect, useState} from 'react'
import './Chat.css'
import { db } from '../../firebase.js'
import firebase from "firebase"


export default function Chat({idea, user}) {
    
    const [messageValue, setMessageValue] = useState('')
    const [messages, setMessages] = useState([])
    
    const sendMessage = (e) =>{
            db.collection("chat").doc(idea.createdBy + idea.id).collection(user).add({
                createdBy: user,
                messageValue,
                ideaName: idea.ideaName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            e.preventDefault();
            setMessageValue("")            
    }

    useEffect(()=>{
    const getMessage = async () =>{
        await db.collection("chat").doc(idea.createdBy + idea.id).collection(user).orderBy("timestamp").onSnapshot((snapshot) =>{
            setMessages(snapshot.docs.map((doc) => doc.data()));

        })};
    getMessage();
    scrollBottom()
    }, [])
    console.log(messages)


    // useEffect(() => {
    //     const getIdeas = async () =>{
    //       let ideas = await db.collection("ideas").get(); //.where("createdBy", "!=", user.displayName)       
    //     }

    //     getIdeas()
        
    //   }, [])

    const scrollBottom = () => {
        const wrapperDiv = document.getElementsByClassName("chat__inputWrappere");
        wrapperDiv.current?.scrollIntoView({ behavior: "smooth" })
    }
    
      console.log(user)
    return (
    <div className='chat_inner'>  
    <h1>Chat about: {idea.ideaName} by {idea.createdBy}</h1>
    <div className="chat__messageWrapper">

     {messages && messages.map(msg => 
     
         msg.createdBy==user?
        <div className="chat__messageOutcome" key={msg.id}>{msg.messageValue}</div>
         :
        <div className="chat__messageIncome" key={msg.id}>{msg.messageValue}</div>
        
    
     
     )} 
    </div>
    <form onSubmit={sendMessage}> 
    <div className="chat__inputWrapper">
 
        <input className="chat__input" onChange={(e) => setMessageValue(e.target.value)} value={messageValue}/>
        <button type="submit" className="chat__button" onClick={sendMessage} >Send</button>
        
    </div>
    </form>  
    </div>

  
    )
}
