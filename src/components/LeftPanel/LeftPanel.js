import React, {useEffect, useState} from 'react'
import './LeftPanel.css'
import { Chats } from "phosphor-react";
import { db } from '../../firebase.js'
import firebase from "firebase"


export default function LeftPanel({user}) {

    const [likeIdea, setLikeIdea] = useState([]);
    const [done, setDone] = useState(false)

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

console.log(likeIdea)

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
            <h3 key={idea.id} className="menu__ideaItem">{idea.ideaName} by: {idea.createdBy}</h3>
            ))}

                                
            </div> 
        </div>
    )
}
