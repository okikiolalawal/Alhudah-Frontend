import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingPageNav = () => {
  return (
    <div>
      <div className="d-flex justify-content-between p-1 bg-success text-white align-items-center">
        {/* Logo & School Name */}
        <div className="d-flex g-1">
          <Image
            src="/logo-removebg-preview.png"
            width={100}
            height={50}
            alt="School Logo"
          />
          <div className="fs-5 d-flex align-items-center ms-3">
            Al-Hudah Model College
          </div>

          {/* Nav Links */}
          <div className="d-flex align-items-center ms-5">
            <Link href="/" className="btn text-white">
              Home
            </Link>
            <Link href="/About" className="btn text-white">
              About
            </Link>
            <Link href="/Gallery" className="btn text-white">
              Gallery
            </Link>
            <Link href="/Contact" className="btn text-white">
              Contacts
            </Link>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="d-flex justify-content-around dropdown me-5">
          <button
            className="btn dropdown-toggle text-white"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="dropdownMenuButton"
          >
            SignIn/SignUp
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link href="/StaffLogin" className="dropdown-item">
              Staff
            </Link>
            <Link href="/Login" className="dropdown-item">
              Parent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNav;
