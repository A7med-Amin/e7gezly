import { useEffect, useState } from "react";
import Approve from "../../pages/Approvebutton";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
function AdminContent(props) {
  const [empdata, empdatachange] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`${process.env.REACT_APP_API_URL}api/deleteuser/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status !== 200) {
            setModalVisible(true);
            setModalError("Server Error.");
          } else {
            setModalVisible(true);
            setModalError("Removed successfully.");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/adminusers`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <Modal
        show={modalVisible}
        onHide={() => {
          setModalVisible(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalError}</Modal.Body>
        <Modal.Footer>
          <button
            className="modal-button"
            onClick={() => {
              setModalVisible(false);
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div
        className="container"
        style={{ backgroundColor: "#2c3e50", color: "white" }}
      >
        <div>
          <div className="card-body" style={{ color: "white" }}>
            <div className="divbtn" style={{ marginBottom: "3%" }}>
              <Link
                to="/"
                className="btn btn-success"
                style={{ marginLeft: "1100px", marginTop: "3%" }}
              >
                Log Out
              </Link>
            </div>
            <table
              className="table table-bordered"
              style={{ color: "#ecf0f1" }}
            >
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Username</td>
                  <td>Email</td>
                  <td>Role</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {empdata &&
                  empdata.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td className="d-flex">
                        <Approve
                          state={false}
                          id={item.id}
                          myrole={item.role}
                          username={item.username}
                          approvale={item.approved}
                        ></Approve>
                        <button
                          onClick={() => {
                            Removefunction(item.username);
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminContent;
