import React from "react";
// import { useNavigate } from "react-router-dom";

const MainBottom = () => {
    // const navigate = useNavigate();
    const navigateToBot = () => {
        // navigate("/bottom");
    };
    return (
        <div className="bottom" onClick={navigateToBot}>
            {/*banner*/}
        </div>
    )
}

export default MainBottom;