import React, {useState, useEffect} from 'react'
import './Main.css';
import { MinusCircle, PlusCircle, SkipForward, CameraSlash } from "phosphor-react";
import { db } from '../../firebase.js'
import firebase from "firebase"


export default function Main( {user} ) {

const [ideas, setIdeas] = useState([])
const [done, setDone] = useState(false)
const [randomIdea, setRandomIdea] = useState({})


        useEffect(() => {
            const getIdeas = async () =>{
                let ideas = await db.collection("ideas").where("createdBy", "!=", user.displayName).get(); 
                setIdeas(ideas.docs.map( idea => ({
                ...idea.data(),
                id: idea.id    
               })))
               setDone(true)

            }

            getIdeas()
            
          }, [])
        
        useEffect(() =>{
            const randomIdea = ideas[Math.floor(Math.random() * ideas.length)] //get random index of ideas array
            setRandomIdea(randomIdea)
    }, [done])
     const likeIdeas = () => {
        db.collection(user.displayName).doc("additionalInfo").collection("likedIdeas").doc(randomIdea.id).set({
            ...randomIdea,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            
        })
        updateArray()
        
         setDone(!done)
         setRandomIdea(null)
     }

     const updateArray = () => {
         console.log("AKTUALIZUJE !!!!!!!")
        db.collection("ideas").doc(randomIdea.ideaName.replace(/\s/g, '') + randomIdea.createdBy)  
        .update( {
          whoLiked: firebase.firestore.FieldValue.arrayUnion(user.displayName)
       });
       db.collection(user.displayName).doc("additionalInfo").collection("likedIdeas").doc(randomIdea.ideaName.replace(/\s/g, '') + randomIdea.createdBy)  
       .update( {
         whoLiked: firebase.firestore.FieldValue.arrayUnion(user.displayName)
      });
     } 
   
    return (
<div className="main__wrapper">
    <div className="main__header">
            <h3>Name of idea: {randomIdea?.ideaName}</h3>
            <h3>Author: {randomIdea?.createdBy}</h3>
    {/* { <h4 className="main__headerCounter">counter</h4>   } */}
    </div>

 <div className="main__content">{randomIdea?.ideaDescription}
 <div className="main__contentPhotoButton">
 {randomIdea?.ideaImageURL && randomIdea?.ideaImageURL !== "undefined" ?
 <img className="main__contentPhoto" src={randomIdea?.ideaImageURL} alt="new"/>
 :
 <CameraSlash size={52} color="white" weight="fill" />
 }
 </div> 
 </div>
<div className="main__footer">
    {randomIdea &&
    <>
    <PlusCircle size={48} color="white" weight="fill" onClick={likeIdeas} />
    <MinusCircle size={48} color="white" weight="fill" onClick={()=>{setDone(!done)}}/>
    <SkipForward size={48} color="white" weight="fill" onClick={()=>{setDone(!done)}}/>
    </>
    }
</div> 
</div> 
    )
}






