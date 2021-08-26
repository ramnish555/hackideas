import React from 'react';
import img_outlined from '../images/thumb-outlined.png';
import img_filled from '../images/thumb-filled.png';

const Challenge = ({data}) => {
    // const location = useLocation();
    const changeImage = (event) => {
        if(event.target.src === img_outlined){
            event.target.src = img_filled;
            data["onVote"](data["id"], {...data["val"], "voteCount": data["val"]["voteCount"]+1});
        }else{
            event.target.src = img_outlined;
            data["onVote"](data["id"], {...data["val"], "voteCount": data["val"]["voteCount"]-1});
        }
    }

    return(
        <>
            <div className="card mb-3">
                <div className="card-header bg-transparent">
                    <h5>{data["val"]["title"]}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">{data["val"]["description"]}</p>  
                </div>
                <div className="card-footer bg-transparent">
                    <p className="card-text"><small className="text-muted">{data["val"]["tags"]}</small></p>
                </div>
                <div className="card-footer bg-transparent last">
                    <span className="vote-count">
                        <img src={img_outlined} alt="content" onClick={changeImage}/>{data["val"]["voteCount"]}
                    </span>
                    <span className="card-text"><small className="text-muted">{data["val"]["creationDate"]}</small></span>
                </div>
            </div>
        </>
    )
};

export default Challenge;