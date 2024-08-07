import React from "react";
import style from "../styles/SignUp.module.css";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Logo from "../logo-removebg-preview.png";

const ParentSignUp = () => {
  const router = useRouter();
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const [myImage, setmyImage] = useState(null);
  let formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNo: "",
      dateOfBirth: "",
      address: "",
      password: "",
      confirmPassword: "",
      occupation: "",
      role: "parent",
    },
    validationSchema: yup.object({
      fullName: yup.string().required("This field id required"),
      email: yup
        .string()
        .required("This field id required")
        .email("This is Not a Valid Email"),
      phoneNo: yup.string().required("This field id required"),
      dateOfBirth: yup.date().required("This field id required"),
      address: yup.string().required("This field id required"),
      confirmPassword: yup
        .string()
        .matches(
          /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/,
          "Password must contain 4-10 Characters, at least One number and at least one UPPERCASE letter"
        )
        .required("This field id required"),
      occupation: yup.string().required("This field is Required"),
      password: yup
        .string()
        .matches(
          /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/,
          "Password must contain 4-10 Characters, at least One number and at least one UPPERCASE letter"
        )
        .required("This field id required"),
    }),
    onSubmit: (values) => {
      if (values.confirmPassword !== values.password) {
        Swal.fire("Error", "passwords dont match", "error");
      }

      console.log(myImage);
      console.log(values);
      if (myImage) {
        let img = new FileReader();
        img.readAsDataURL(myImage);
        img.onload = () => {
          console.log(img);
          let endpoint = "http://localhost:9500/parent/ParentSignUp";
          let signinDetails = { ...values, d_picture: img.result };
          axios.post(endpoint, signinDetails).then((result) => {
            if (!result.data) {
              Swal.fire("Error", result.data.message, "error");
            } else {
              Swal.fire("Success", result.data.message, "success");
              router.push("/Login");
            }
          });
        };
      } else {
        Swal.fire("Error", "Profile Picture is required", "error");
      }
    },
  });

  return (
    <div className={style.page}>
      <div className={style.body}>
        <div className="col-6 mx-auto border rounded-3 my-5 bg-light">
          <div className="d-flex justify-content-center">
            <Image
              alt="/"
              src={Logo}
              height={100}
              width={100}
              className="my-4"
            ></Image>
            <div></div>
          </div>
          <h1 className="text-center mb-3 border-bottom p-2">Sign Up</h1>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="col-11 mx-auto">
              <div className="w-100 mb-3 p-1">
                <label className="form-label">Full Name</label>
                <input
                  placeholder="First Name Middle Name Last Name"
                  type="text"
                  className={
                    formik.errors.fullName && formik.touched.fullName
                      ? "form-control input-style border-2 rounded-2 is-invalid"
                      : "form-control input-style border-2 rounded-2"
                  }
                  name="fullName"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.fullName && formik.errors.fullName}
                </div>
              </div>
              <div className="mb-3 p-1">
                <div className="row">
                  <div className="col-4">
                    <label className="form-label">Email</label>
                    <input
                      placeholder="Email"
                      type="text"
                      className={
                        formik.errors.email && formik.touched.email
                          ? "form-control input-style border-2 rounded-2 is-invalid"
                          : "form-control input-style border-2 rounded-2"
                      }
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    <div className="text-danger">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div className="col-4">
                    <label className="form-label">Phone No</label>
                    <input
                      placeholder="Phone No"
                      type="text"
                      className={
                        formik.errors.phoneNo && formik.touched.phoneNo
                          ? "form-control input-style border-2 rounded-2 is-invalid"
                          : "form-control input-style border-2 rounded-2"
                      }
                      name="phoneNo"
                      onChange={formik.handleChange}
                      value={formik.values.phoneNo}
                      onBlur={formik.handleBlur}
                    />
                    <div className="text-danger">
                      {formik.touched.phoneNo && formik.errors.phoneNo}
                    </div>
                  </div>
                  <div className="col-4">
                    <label className="form-label">Date Of Birth</label>
                    <input
                      placeholder="Date Of Birth"
                      type="date"
                      className={
                        formik.errors.dateOfBirth && formik.touched.dateOfBirth
                          ? "form-control input-style border-2 rounded-2 is-invalid"
                          : "form-control input-style border-2 rounded-2"
                      }
                      name="dateOfBirth"
                      onChange={formik.handleChange}
                      value={formik.values.dateOfBirth}
                      onBlur={formik.handleBlur}
                    />
                    <div className="text-danger">
                      {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 p-1">
                <div className="">
                  <div className="col-">
                    <label className="form-label">Address</label>
                    <input
                      placeholder="Address"
                      type="text"
                      className={
                        formik.errors.address && formik.touched.address
                          ? "form-control input-style border-2 rounded-2 is-invalid"
                          : "form-control input-style border-2 rounded-2"
                      }
                      name="address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      onBlur={formik.handleBlur}
                    />
                    <div className="text-danger">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 p-1">
                <div className="row">
                  <div className="col-6">
                    <label className="form-label">Password</label>
                   
                    <div className="input-group">
                      <input 
                        className={
                          formik.errors.password && formik.touched.password
                            ? "form-control input-style border-2 rounded-2 is-invalid"
                            : "form-control input-style border-2 rounded-2"
                        }
                        type={show ? "text" : "password"}
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                      />
                      <div className="d-flex align-items-center">
                        <button className="btn btn-outline-success btn-sm" type="button"
                        onClick={handleClick}
                        >
                        {show ? 'Hide':"Show"}
                        </button>
                      </div>
                    </div>
                    <div className="text-danger">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Confirm PassWord</label>
                    <input
                      placeholder="Confirm PassWord"
                      type="text"
                      className={
                        formik.errors.confirmPassword &&
                          formik.touched.confirmPassword
                          ? "form-control input-style border-2 rounded-2 is-invalid"
                          : "form-control input-style border-2 rounded-2"
                      }
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                    />
                    <div className="text-danger">
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3 p-1">
                <div className="row">
                  <div className="col-6">
                    <label className="form-label">Occupation</label>
                    <input
                      placeholder="Occupation"
                      type="text"
                      className={
                        formik.errors.occupation && formik.touched.occupation
                          ? "form-control input-style border-2 rounded-2 is-invalid"
                          : "form-control input-style border-2 rounded-2"
                      }
                      name="occupation"
                      onChange={formik.handleChange}
                      value={formik.values.occupation}
                      onBlur={formik.handleBlur}
                    />
                    <div className="text-danger">
                      {formik.touched.occupation && formik.errors.occupation}
                    </div>
                  </div>

                  <div className="col-6">
                    <label className="form-label">Profile Picture</label>
                    <input
                      className={
                        formik.errors.fullName && formik.touched.fullName
                          ? "form-control input-style border-5 rounded-4 is-invalid"
                          : "form-control input-style border-2 rounded-3"
                      }
                      placeholder="Confirm Password"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        setmyImage(e.target.files[0]);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="mb-3 p-1">
                <button
                  type="submit"
                  className="btn-success form-control btn text-light"
                >
                  Sign Up
                </button>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <Link href={"/"} className="btn">
                  If you have an account <Link href={"/Login"}></Link>
                </Link>
                <Link href={"/"} className="btn">
                  forgot Password
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ParentSignUp;
