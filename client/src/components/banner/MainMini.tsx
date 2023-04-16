// import { useNavigate } from "react-router-dom";
import React from "react";

const MainMini = () => {
    // const navigate = useNavigate();
    const navigateToMini = () => {
        // navigate("/mini");
    };
    return (
        <div className="mini" onClick={navigateToMini}>
            {/*banner image*/}
        </div>
    )
}

export default MainMini;