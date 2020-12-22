import React, {useState, useEffect} from 'react'
import './Main.css';
import { MinusCircle, PlusCircle, SkipForward, Image } from "phosphor-react";
import { db } from '../../firebase.js'
import firebase from "firebase"
import Ideas from '../Ideas/Ideas.js'

export default function Main() {

const [ideas, setIdeas] = useState([])
const [done, setDone] = useState(false)
const [randomIdea, setRandomIdea] = useState({})


        useEffect(() => {
            const getIdeas = async () =>{
              let ideas = await db.collection("ideas").get(); //.where("createdBy", "!=", user.displayName)
                
                setIdeas(ideas.docs.map( idea => ({
                ...idea.data(), 
               })))
               setDone(true)

            }

            getIdeas()
            
          }, [])

        useEffect(() =>{
        //const displayIdea = () => {
            const randomIdea = ideas[Math.floor(Math.random() * ideas.length)] //get random index of ideas array
            setRandomIdea(randomIdea)
        //}
    }, [done])
    


    return (
        <div className="main__wrapper">
            <div className="main__header">
                <div className="main__headerLeft">
                    <h3>{randomIdea?.ideaName}</h3>
                    <h3>{randomIdea?.createdBy}</h3>
                </div>
                <h4 className="main__headerCounter">counter</h4>  
            </div>
             <div className="main__content">{randomIdea?.ideaDescription}
             <div className="main__contentPhotoButton"><Image size={52} color="white" weight="fill"/></div>
             </div>
            <div className="main__footer">
                <PlusCircle size={48} color="white" weight="fill" onClick={()=>{setDone(!done)}} />
                <MinusCircle size={48} color="white" weight="fill" />
                <SkipForward size={48} color="white" weight="fill" />
            </div> 
        </div>
    )
}
