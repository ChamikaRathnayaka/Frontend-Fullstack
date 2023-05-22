import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [deleteSuccessTimer, setDeleteSuccessTimer] = useState(null);

  const handleOpenDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(true);
    startDeleteSuccessTimer();
  };

  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
    resetDeleteSuccessTimer();
  };

  const startDeleteSuccessTimer = () => {
    const timer = setTimeout(() => {
      handleCloseDeleteSuccessModal();
    }, 2000); // Set the auto-close time in milliseconds
    setDeleteSuccessTimer(timer);
  };

  const resetDeleteSuccessTimer = () => {
    clearTimeout(deleteSuccessTimer);
  };

  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers(10000);
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8090/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8090/user/${id}`);
    handleCloseModal();
    loadUsers();
    const timer = setTimeout(() => {
      handleCloseModal(); // Close the modal after deleting the user
      handleOpenDeleteSuccessModal(); // Open the delete successful modal and start the timer
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    // onClick={() => deleteUser(user.id)}
                    onClick={handleOpenModal}
                  >
                    Delete
                  </button>

                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure you want to delete this user?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={showDeleteSuccessModal}
        onHide={handleCloseDeleteSuccessModal}
        style={{ color: "green"}}
      >
        <Modal.Header>
          <Modal.Title>User deleted successfully...</Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
}
