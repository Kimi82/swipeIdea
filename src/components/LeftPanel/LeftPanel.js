import React from 'react'
import './LeftPanel.css'
import { Chats } from "phosphor-react";
export default function LeftPanel() {
    return (
        <div className="menu__wrapper">
            <div className="menu__header">
                <h3>Here is idea than you liked or send messages</h3>
            </div>
            <div className="menu__ideasList">
                <ul>
                    <li className="menu__ideaItem">1 <Chats size={32} color="white" weight="fill"/></li>
                </ul>
            </div> 
        </div>
    )
}
