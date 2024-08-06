import React from "react";
import YouTube from "react-youtube";

const Modal = ({ onClose, videoId }) => {
    const opts = {
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    return (
        <div className="modal fade show mt-5 " style={{ display: "block" }} role="dialog">
            <div className="modal-dialog modal-xl">
                <div className="modal-content bg-dark">
                    <div className="modal-header bg-dark">
                        <button type="button" className="btn btn-close " onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-0 m-0">
                        <YouTube videoId={videoId} opts={opts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

//https://www.youtube.com/watch?v=

export default Modal;
