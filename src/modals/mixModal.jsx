import React, { useState } from "react";
import ReactDom from "react-dom";
// import close from "../images/close.png";

const MixModal = ({ children, open, closeModal, altClose }) => {
  const overLay = {
    position: "fixed",
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    width: "100vw",
    height: "70vh",
    left: "0vw",
    top: "20vh",

    backgroundColor: "rgba(19,0,0,1.9)",
    zIndex: 1000,
    borderRadius: "10px",
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <div style={overLay} onClick={altClose}>
      <img style={{ float: "right" }} src={close} onClick={closeModal} />

      {/* <button type="button" onClick={closeModal}>
        Close
      </button> */}

      {children}
    </div>,
    document.getElementById("portal")
  );
};

export default MixModal;
