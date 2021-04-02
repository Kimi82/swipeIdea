import React, {useEffect, useState} from 'react'
import './Chat.css'
import { db } from '../../firebase.js'
import firebase from "firebase"


export default function Chat({idea, user}) {
    
    const [messageValue, setMessageValue] = useState('')
    const [messages, setMessages] = useState([])
    
console.log(idea)

    const sendMessage = (e) =>{
            db.collection("chat").doc(idea.createdBy + idea.id.replace(/\s/g, '')).collection(user).add({
                createdBy: user,
                messageValue,
                ideaName: idea.ideaName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            e.preventDefault();
            setMessageValue("")
            chatScrollToBottom()            
    }

    useEffect(()=>{
    const getMessage = async () =>{
        await db.collection("chat").doc(idea.createdBy + idea.id.replace(/\s/g, '')).collection(user).orderBy("timestamp").onSnapshot((snapshot) =>{
            setMessages(snapshot.docs.map((doc) => doc.data()));

        })};
    getMessage();
    chatScrollToBottom()
    }, [])
    


    // useEffect(() => {
    //     const getIdeas = async () =>{
    //       let ideas = await db.collection("ideas").get(); //.where("createdBy", "!=", user.displayName)       
    //     }

    //     getIdeas()
        
    //   }, [])

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
    <div id='chat_inner'>  
    <h1>Chat about: {idea.ideaName} by {idea.createdBy}</h1>
    <div id="chat__messageWrapper">
        
     {messages && messages.map(msg => 
     
        //  msg.createdBy==user?
        // <div className="chat__messageOutcome" key={msg.id}>{msg.messageValue}</div>
        //  :
        // <div className="chat__messageIncome" key={msg.id}>{msg.messageValue}</div>
        
          msg.createdBy==user?
         <div className="chat__messageOutcome" key={msg.id}>{msg.messageValue}
         <p className="chat__messageTime">{convertTime(msg.timestamp?.seconds*1000)}</p>
         </div>
          :
         <div className="chat__messageIncome" key={msg.id}>{msg.messageValue}</div>
    
     
     )} 
    </div>
    {/* <form onSubmit={sendMessage}>  */}
    <div className="chat__inputWrapper">
 
        <input className="chat__input" onChange={(e) => setMessageValue(e.target.value)} value={messageValue}/>
        <button type="submit" className="chat__button" onClick={sendMessage} >Send</button>
        
    </div>
    {/* </form>   */}
    </div>

  
    )
}
