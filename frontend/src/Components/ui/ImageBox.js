import React from "react";
import "./ImageBox.css";
import { CgImage } from "react-icons/cg";
import { BsDot } from "react-icons/bs";
import UploadButton from "./UploadButton";
// import { SiCanva } from "react-icons/si";
/**
 * @author Mahmoud Khaled
 * @param {}
 * @description This is Main Event Image section in detials Page that used to upload an image or Design canvas
 * @returns {JSX.Element}
 */
const ImageBox = (props) => {
  return (
    <div className="Image__container" data-testid="Image">
      <CgImage className="photo__header" />
      <h1 className="title__upload">Stadium Image</h1>
      <p style={{ fontSize: "14px" }}>Add the image of your stadium.</p>
      <div className="Image__fileType">
        {props.imageLink === "" && <CgImage className="photo" />}
        {props.imageLink === "" && (
          <h5 style={{ marginBottom: "15px" }}>Drag and drop an Image or</h5>
        )}
        {props.imageLink === "" && (
          <div className="buttons__container" data-testid="btsContainer">
            <UploadButton
              imageLink={props.imageLink}
              setImageLink={props.setImageLink}
            />
          </div>
        )}
      </div>
      {props.imageLink !== "" && (
        <div className="uploaded__Image">
          <img
            alt="uploadedImage"
            id="uploadedImage"
            data-testid="uploadedImage"
            src={props.imageLink}
            className="uploaded Image"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
      {props.imageLink !== "" && (
        <button
          className="delete__uploaded-button"
          onClick={() => {
            props.setImageLink("");
          }}
        >
          Delete Photo
        </button>
      )}
      {/* <img src = {props.imageLink} /> */}
    </div>
  );
};

export default ImageBox;
