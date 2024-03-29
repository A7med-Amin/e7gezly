import { useRef, useState } from "react";

// import Card from "../ui/Card";
import classes from "./NewStadiumForm.module.css";
import ImageBox from "../ui/ImageBox";
import { Modal } from "react-bootstrap";

function NewStadiumForm(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  const nameInputRef = useRef();
  const rowInputRef = useRef();
  const colInputRef = useRef();
  const descriptionInputRef = useRef();
  const [imageLink, setImageLink] = useState("");

  function submitHandler() {
    const enteredName = nameInputRef.current.value;
    const enteredrow = rowInputRef.current.value;
    const enteredcol = colInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      name: enteredName,
      rows: enteredrow,
      seats_per_row: enteredcol,
      link: imageLink,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  function ValidateSeats(event) {
    event.preventDefault();

    if (
      rowInputRef.current.value <= 0 ||
      rowInputRef.current.value > 5 ||
      colInputRef.current.value <= 0 ||
      colInputRef.current.value > 10
    ) {
      setModalVisible(true);
      setModalError(
        "Rows must be in range 0-5 And Seats must be in range 1-10"
      );
    } else {
      submitHandler();
    }
  }

  return (
    <>
      <Modal
        show={modalVisible}
        onHide={() => {
          setModalVisible(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Incorrect input</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalError}</Modal.Body>
        <Modal.Footer>
          <button className="modal-button" onClick={() => {}}>
            Close
          </button>
          <button className="modal-button">Confirm</button>
        </Modal.Footer>
      </Modal>
      <div className={classes.newstadlayout}>
        <form className={classes.form} onSubmit={ValidateSeats}>
          <div className={classes.control}>
            <label htmlFor="name">
              <span className={classes.vip}>Stadium</span> Name
            </label>
            <input
              style={{ padding: "15px" }}
              type="text"
              required
              id="name"
              ref={nameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="rows">
              <span className={classes.vip}>VIP</span> Lounge Rows
            </label>
            <input
              style={{ padding: "15px" }}
              type="text"
              required
              id="rows"
              ref={rowInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="seats_per_row">Row Number Of Seats</label>
            <input
              style={{ padding: "15px" }}
              type="text"
              required
              id="seats_per_row"
              ref={colInputRef}
            />
          </div>
          <ImageBox imageLink={imageLink} setImageLink={setImageLink} />
          {/* <div className={classes.control}>
          <label htmlFor='link'>Stadium Image</label>
          <input style = {{padding : '15px'}} type='url'  id='link' ref={imgInputRef} />
        </div> */}
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              required
              rows="4"
              ref={descriptionInputRef}
              style={{ padding: "15px" }}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Add Stadium</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewStadiumForm;
