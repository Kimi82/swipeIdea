import React, {useEffect, useState} from 'react'
import './LeftPanel.css'
import { Chats } from "phosphor-react";
import { db } from '../../firebase.js'
import firebase from "firebase"


export default function LeftPanel({user}) {

    const [likeIdea, setLikeIdea] = useState([]);

    useEffect(()=>{
        if(user?.displayName !== "undefined" && user ){
        const getLikedIdea = async () =>{
             await db.collection(user.displayName).doc("additionalInfo").collection("likedIdeas").onSnapshot(snapshot => {
                const helperArray = [];
                snapshot.forEach(doc => helperArray.push({...doc.data()}))
                setLikeIdea(helperArray)
                
            })
        }

        getLikedIdea();
}}, [])


    return (
        <div className="menu__wrapper">
            <div className="menu__header">
                <h3>Here is idea than you liked</h3>
            </div>
            <div className="menu__ideasList">

            {likeIdea.map(idea =>(
            <h3 className="menu__ideaItem">{idea.ideaName} by: {idea.createdBy}</h3>
            ))}


                                
            </div> 
        </div>
    )
}
