import React from "react";
import "./create.css";

export const Choose = (photo) => {

    

    return(
        <>
            <div className="choosen">
                {photo.picture && <img key={photo._id} src={photo.picture} alt={`pixel`} />}
            </div>
        </>

    )
}