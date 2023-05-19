import React from "react";

export default function AddUser() {
  return (
    <div className="d-flex justify-content-center">
      <div className="card w-50 shadow mt-4">
        <h2 className="mt-3">Add A New User</h2>
        <div className="card-body">
          <form>
            <div className="mb-3">
            <label className="control-label col-sm-2" >Name :</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
            <label className="control-label col-sm-2" >User Name :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your user name"
              />
            </div>
            <div className="mb-3">
            <label className="control-label col-sm-2" >Email :</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email address"
              />
            </div>
           
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
