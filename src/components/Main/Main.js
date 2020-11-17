import React from 'react'
import './Main.css';


export default function Main() {
    return (
        <div className="main__wrapper">
            <div className="main__header">
                <h3>name of idea</h3>
                <h3>author</h3>  
            </div>
             <div className="main__content">HERE WILL BE DESCRIPTION OF THE IDEA
             <div className="main__contentPhotoButton"><p>BUTTON TO SHOW PHOTOS</p></div>
             </div>
            <div className="main__footer">
                <button className="test">DM</button>
                <button className="test">yes</button>
                <button className="test">idk</button>
                <button className="test">no</button>
            </div> 
        </div>
    )
}
