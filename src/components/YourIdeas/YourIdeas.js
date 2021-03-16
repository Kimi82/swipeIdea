import React, { useState, useEffect } from 'react'
import './YourIdeas.css'
import { PlusCircle } from "phosphor-react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Button } from '@material-ui/core'
import { db } from '../../firebase.js'
import firebase from "firebase"


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const  useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button:{
      marginTop: '15px',
      width: '100%'
    }
  }));

export default function YourIdeas( {user} ) {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [ideaName, setIdeaName] = useState('')
    const [ideaImageURL, setIdeaImageURL] = useState('')
    const [ideaDescription, setIdeaDescription] = useState('')
    const [addFormValidation, setAddFormValidation] = useState(false);
    const [yourIdeas, setYourIdeas] = useState([])
    const [isDone, setIsDone] = useState(false)
    const [messages, setMessages] = useState([])

      const addIdea = async (e) =>{
        e.preventDefault();
        if(ideaName.length<=2 && ideaDescription.length<=10){
          setAddFormValidation(true)
        }else{
          db.collection("ideas").doc(ideaName.replace(/\s/g, '')+user.displayName).set({
             createdBy: user.displayName,
             ideaName,
             ideaDescription,
             ideaImageURL,
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
             })

          setAddFormValidation(false)
          setOpen(false)
          setIdeaName("")
          setIdeaDescription("")
          setIdeaImageURL("")          
        }
        
      }


      
        const getMessages = async (idea) =>{
 
          
          const test =  await db.collection("chat").doc(idea.createdBy + idea.ideaName +idea.createdBy).collection(idea.whoLiked[0])
          .get()
         // console.log(test.docs.map())  
          test?.docs.map(console.log("XD"))
        };
        // console.log(messages)

    
      useEffect(() => {
        const getYourIdeas = async () =>{
          
          //if(user?.displayName !== "undefined" && user ){
//dodac where zeby nie pobieralo dodanych przez nas
            await db.collection("ideas").where("createdBy", "==", user.displayName).onSnapshot(snapshot =>{
              const helperArray = [];
              snapshot.forEach(doc => helperArray.push({...doc.data(),convertTime: convertTime(doc.data()?.timestamp?.seconds*1000), chat: []}))
              setYourIdeas(helperArray)
          })
          setIsDone(true)
        //}
        }
        console.log("I just downloaded your ideas") 
        getYourIdeas()

      }, [])




      
    
    function convertTime(time){
      try{
      var ideaDate = new Date(time); 
      ideaDate.toLocaleString();
      var time = ideaDate.toISOString().substring(0, 10);
      }catch(error){console.log(error)}
      return time;
    }
    return (
        <div className="yourideas__wrapper">
            <div className="yourIdeas__header">
                <h3>here you can see your ideas and add new</h3>
                <PlusCircle size={32} color="white" weight="fill" onClick={() => setOpen(true)} />
                </div>
            <div className="yourIdeas__buttons">
            <div className="yourideas__listWrapper">
              {yourIdeas.map((idea) =>
                  
                  <p className="yourIdeas__listItem" id={idea?.id} key={idea?.id} onClick={ () => getMessages(idea)}>
                      <h3 id={idea?.id + "1"} >{idea?.ideaName}</h3>
                      <h3 id={idea?.id + "2"}>{idea?.convertTime}</h3>
                  </p>
                  
                )}
                </div> 
              
                <Modal
    open={open}
    onClose={() => setOpen(false)}>
    { addFormValidation?
    <form>
      <div style={modalStyle} className={classes.paper}>  
        <TextField label="Name of the idea"  value={ideaName} onChange={(e) => setIdeaName(e.target.value)} 
        error  helperText="This field can't be empty" />
        <TextField label="URL to image" value={ideaImageURL} onChange={(e) => setIdeaImageURL(e.target.value)} />
        <TextField label="Description" fullWidth multiline value={ideaDescription} onChange={(e) => setIdeaDescription(e.target.value)}
        error  helperText="This field can't be empty" />
        <Button type='submit' onClick={addIdea} className={classes.button}>Add an idea!</Button>
      </div>
    </form>
     : //default
     <form> 
     <div style={modalStyle} className={classes.paper}>  
      <TextField label="Name of the idea"  value={ideaName} onChange={(e) => setIdeaName(e.target.value)} />
      <TextField label="URL to image" value={ideaImageURL} onChange={(e) => setIdeaImageURL(e.target.value)} />
      <TextField label="Description" fullWidth multiline value={ideaDescription} onChange={(e) => setIdeaDescription(e.target.value)} />
     <Button type='submit' onClick={addIdea} variant="contained" color="primary" className={classes.button}>Add an idea!</Button>
     </div>
     </form> 
     }

  </Modal> 

        </div>
        </div>
    )
}
