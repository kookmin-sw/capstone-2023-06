import React from "react";
// import { useNavigate } from "react-router-dom";

const MainSide = () => {
    // const navigate = useNavigate();
    const navigateToSide = () => {
        // navigate("/side");
    };
    return (
        <div className="side" onClick={navigateToSide} >
            {/*banner*/}

        </div>
    )
}

export default MainSide;