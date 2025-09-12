import React from "react";
import Link from "next/link";

const TeacherSideNav = ({ className }) => {
  return (
    <div className="col-auto col-md-6 col-xl-8 px-sm-2 px-6 bg-success">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <Link href={`/TeacherDashBoard/${className}`} className="nav-link px-0 align-middle">
              <i className="fs-4 bi-people"></i>{" "}
              <span className="ms-1 d-none d-sm-inline text-white">DashBoard</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link href={`/Attendance/${className}`} className="nav-link px-0 align-middle">
              <i className="fs-4 bi-people"></i>{" "}
              <span className="ms-3 d-none d-sm-inline text-white p-3 mb-3"> Mark Attendance</span>
            </Link>
            <Link href={`/FilterAttendance/${className}` } className="text-sm p-3 ms-3">Filter Attendance</Link>
          </li>
          <li>
            <Link href={`/ScoreGrading/${className}`} className="nav-link px-0 align-middle">
              <i className="fs-4 bi-grid"></i>{" "}
              <span className="ms-1 d-none d-sm-inline text-white">Grading</span>
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default TeacherSideNav;
