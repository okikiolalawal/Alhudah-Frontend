import React from 'react'
import Image from 'next/image'
import logo from '../logo-removebg-preview.png'
import Link from 'next/link'
const ManagerNavBar = () => {
  return (
    <div>
      <div className="d-flex justify-content-between p-1 bg-success text-white align-items-center">
        <div className="">
          <div className="d-flex g-1">
            <Image src={logo} width={90} alt='' className="ms-5" />
            <div className="fs-5 d-flex align-items-center ms-3 ">
              Al-Hudah Model College
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
    </div>
  );
}

export default ManagerNavBar