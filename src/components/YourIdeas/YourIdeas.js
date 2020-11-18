import React from 'react'
import './YourIdeas.css'
import { PlusCircle } from "phosphor-react";

export default function YourIdeas() {
    return (
        <div className="yourideas__wrapper">
            <div className="yourIdeas__header">
                <h3>here you can see your ideas and add new</h3>
                <PlusCircle size={32} color="white" weight="fill" />
                </div>
            <div className="yourIdeas__buttons">
                <h3>name of idea</h3>
                <h3>created date</h3>  
            </div>
        </div>
    )
}
