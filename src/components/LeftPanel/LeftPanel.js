import React, {useEffect, useState} from 'react'
import './LeftPanel.css'
import { Chats } from "phosphor-react";
import { db } from '../../firebase.js'
import firebase from "firebase"
import Chat from '../Chat/Chat.js'

export default function LeftPanel({user}) {

    const [likeIdea, setLikeIdea] = useState([]);
    const [showChat, setShowChat] = useState(false)
    const [ideaToSent, setideaToSent] = useState({})


    useEffect(()=>{

        const getLikedIdea = async () =>{
             await db.collection(user.displayName).doc("additionalInfo").collection("likedIdeas").onSnapshot(snapshot => {
                const helperArray = [];
                snapshot.forEach(doc => helperArray.push({...doc.data()}))
                setLikeIdea(helperArray)
                })
            
            
        }
        getLikedIdea();
        

}, [])


    return (
        <div className="menu__wrapper">
            <div className="menu__header">
                <h3>Here is idea than you liked</h3>
            </div>
            <div className="menu__ideasList">

            {/* {likeIdea.length>=1 ? likeIdea.map(idea =>(
            <h3 key={idea.id} className="menu__ideaItem">{idea.ideaName} by: {idea.createdBy}</h3>
            )) : <h2>You haven't liked any idea yet </h2>} */}



            {likeIdea.map(idea =>(
            <h3 key={idea.id} className="menu__ideaItem" onClick={() => {
                setideaToSent(idea)
                setShowChat(!showChat)
            }}>{idea.ideaName} by: {idea.createdBy}</h3>
            ))}

            {showChat ? <Chat idea={ideaToSent} user={user.displayName}/> : null}
                      
            </div> 
        </div>
    )
}