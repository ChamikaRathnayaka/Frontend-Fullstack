import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
  });

  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    // Validate each field
    if (user.name.trim() === "") {
      newErrors.name = "Name is required.";
      hasErrors = true;
    }
    if (user.name.length > 10) {
      newErrors.name = "Name should be less than 10 characters";
      hasErrors = true;
    }
    else if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(user.name)) {
      newErrors.name = 'Name should not start with special characters.';
      hasErrors = true;
    }

    if (user.username.trim() === "") {
      newErrors.username = "Username is required.";
      hasErrors = true;
    }
    else if (user.username.length > 20 ){
      newErrors.username = 'User name should be less than characters';
      hasErrors = true;
    }
    else if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(user.username)) {
      newErrors.username = 'User Name should not start with special characters.';
      hasErrors = true;
    }

    if (user.email.trim() === "") {
      newErrors.email = "Email is required.";
      hasErrors = true;
    } else if (!isValidEmail(user.email)) {
      newErrors.email = "Email is invalid.";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Proceed with form submission
    console.log("Form submitted:", user);

    await axios.put(`http://localhost:8090/user/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8090/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
              {errors.username && (
                <span className="text-danger">{errors.username}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
