import React from "react";
import img from "../dummy/img.png"
import heart from "../dummy/heart.png";
import redheart from "../dummy/redheart.png";
import "./itemComponent.css"
import {useState} from "react";

import StylingData from "../api/mock/StylingData";

// import { useNavigate } from "react-router-dom";

export default function ItemComponent() {
    // const [image, setImage] = useState();
    // const [title, setTitle] = useState();
    let [clicked, setClicked] = useState(0);
    const [buttonImage, setButtonImage] = useState(heart);

    // const navigate = useNavigate();

    const navigateToItem = () => {
        // navigate("/item");
    };

    console.log(clicked);
    function heartToggle() {
        setClicked(clicked + 1);
        if (clicked % 2 == 1) {
            //빈하트
            // console.log(clicked);
            setButtonImage(heart);
        }
        else {
            //찬 하트
            // console.log(clicked);
            setButtonImage(redheart);
        }
    }

    return (
        <>
            <div className="item" >
                <img className="img" src={img} onClick={navigateToItem}/>
                <button type="button" className="heart" onClick={heartToggle}><img src={buttonImage}/></button>
                <p className="title" onClick={navigateToItem}> this is title</p>
            </div>
        </>
    )
}