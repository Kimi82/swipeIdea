import React, {useEffect, useState} from 'react'
import './Chat.css'
//import { db } from '../../firebase.js'
//import firebase from "firebase"


export default function Chat({idea}) {

    console.log(idea)

    return (
        <div className='popup'>  
<div className='popup_inner'>  
<h1>{idea.ideaName}</h1>
<h2>text</h2>
<h3>text</h3>  
<button>close me</button>  
</div>  
</div>  
    )
}
