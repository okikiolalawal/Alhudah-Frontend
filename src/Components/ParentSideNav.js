import React from "react";
import Link from "next/link";

const ParentSideNav = ({ parent_Id }) => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <Link href={`/DashBoard/${parent_Id}`} className="nav-link px-0 align-middle">
              <i className="fs-4 bi-people"></i>{" "}
              <span className="ms-1 d-none d-sm-inline text-white">DashBoard</span>
            </Link>
          </li>
          <li>
            <Link href={`/ParentPaymentPanel/${parent_Id}`} className="nav-link px-0 align-middle">
              <i className="fs-4 bi-people"></i>{" "}
              <span className="ms-1 d-none d-sm-inline text-white">Payment Panel</span>
            </Link>
          </li>
          <li>
            <Link href={`/TransactionHistory?parent_Id=${parent_Id}`} className="nav-link px-0 align-middle">
              <i className="fs-4 bi-grid"></i>{" "}
              <span className="ms-1 d-none d-sm-inline text-white">Transaction History</span>
            </Link>
          </li>
          <li>
            <Link href={`/Results?parent_Id=${parent_Id}`} className="nav-link px-0 align-middle">
              <i className="fs-4 bi-grid"></i>{" "}
              <span className="ms-1 d-none d-sm-inline text-white">Result</span>
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default ParentSideNav;
