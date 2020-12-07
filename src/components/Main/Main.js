import React from 'react'
import './Main.css';
import { MinusCircle, PlusCircle, SkipForward, Image } from "phosphor-react";

export default function Main() {
    return (
        <div className="main__wrapper">
            <div className="main__header">
                <div className="main__headerLeft">
                    <h3>name of idea</h3>
                    <h3>author</h3>
                </div>
                <h4 className="main__headerCounter">counter</h4>  
            </div>
             <div className="main__content">HERE WILL BE DESCRIPTION OF THE IDEA
             <div className="main__contentPhotoButton"><Image size={52} color="white" weight="fill"/></div>
             </div>
            <div className="main__footer">
                <PlusCircle size={48} color="white" weight="fill" />
                <MinusCircle size={48} color="white" weight="fill" />
                <SkipForward size={48} color="white" weight="fill" />
            </div> 
        </div>
    )
}
