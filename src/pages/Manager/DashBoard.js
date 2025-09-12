import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';

const DashBoard = () => {
  const [show,setShow] = useState(false)
  return (
    <div>
      <div className="d-flex justify-content-between p-1 bg-success text-white align-items-center">
        <div className='d'>
          <div className="d-flex g-1">
            <Image src={logo} width={90} className="ms-5" />
            <div className="fs-5 d-flex align-items-center ms-3 ">
              Al-Hudah Model College
            </div>
          <div className='d-flex align-items-center ms-5 justify-content-between'>
            <Link href={"/"} className='btn text-white'>Payment</Link>
            <Link href={"/"} className='btn text-white'>Result</Link>
            <Link href={"/"} className='btn text-white'>Academics</Link>
          </div>
          </div>
        </div>
        <div className="d-flex justify-content-around ">
          <div className="me-5 fs-5 ">
            <Link href={"/"} className="btn text-light fs-5">
              Sign Out
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <div className="my-4">
          <div className="d-flex justify-content-between">
            <h2 className="ms-5">Welcome Lawal Jafar</h2>
            <div>
              <Link href={"/"} className="me-5 btn">
                My Profile
              </Link>
            </div>
          </div>
        </div>
        <div className='d-flex align-items-center'>
        <div className={`${style.shadow} border rounded-3 rounded-1 mx-auto col-6 my-1`}>
          <div className="p-3 ">
            <h3 className="text-center border-bottom p-2">Ward List</h3>
          </div>
          <div>
          <div className="d-flex justify-content-between p-4">
            <div className="fs-5">No of Ward(s): 3</div>
            <div>
              <Link
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                className="btn btn-dark me-5"
                href={"/AddStudent"}
              >
                Register New Ward
              </Link>
            </div>
          </div>
          <table className="table p-4 mx-auto">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Full Name</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jafar Lawal</td>
                <td>JSS3</td>
                <td>
                  <div>
                  <button className="btn btn-success btn-sm">Details</button>
                  <button className="btn btn-danger btn-sm ms-2">
                    Delete
                  </button>
                  <button className="btn btn-primary btn-sm ms-2">Update</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Rahmah Lawal</td>
                <td>JSS3</td>
                <td>
                  <button className="btn btn-success btn-sm">Details</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Maryam Lawal</td>
                <td>JSS3</td>
                <td>
                  <button className="btn btn-success btn-sm">Details</button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Add Task
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="" class="form-label">
                  Task Title
                </label>
                <input
                  type="text"
                  id="Task"
                  class="form-control"
                  placeholder="Task"
                />
              </div>
              <div id="msg"></div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Date of Task
                </label>
                <input
                  type="date"
                  id="taskdate"
                  class="form-control"
                  placeholder="Date "
                />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Description
                </label>
                <input
                  type="text"
                  id="textarea"
                  class="form-control"
                  placeholder="Description"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onclick="AddTask()"
                data-bs-dismiss="modal"
                id="saveTaskbtn"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard