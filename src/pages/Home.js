import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  const {id}= useParams()

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8090/users");
    console.log(result);
    setUsers(result.data);
  };

  const deleteUser=async(id)=>{
    await axios.delete(`http://localhost:8090/user/${id}`)
    loadUsers()
  }

  return (
    <div className="container">
      <div className="py-4">
        <table class="table border shadow">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
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
                  <Link type="button" class="btn btn-primary mx-2" to="/viewUser">
                    View
                  </Link>
                  <Link type="button" class="btn btn-success mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button type="button" class="btn btn-danger mx-2" onClick={()=>deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
