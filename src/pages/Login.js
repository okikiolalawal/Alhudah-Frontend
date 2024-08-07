import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/SignUp.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const router = useRouter();
  const [show, setShow] = useState("");
  const handleClick = () => setShow(!show);
  // const [role, setRole] = useState("")
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email Required")
        .email("This is Not a Valid Email"),
      password: yup
        .string()
        .matches(
          /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/,
          "Password must contain 4-10 Characters, at least One number and at least one UPPERCASE letter"
        )
        .required("Password is required"),
      role: yup.string().required('This Field Is Required')
    }),
    onSubmit: (values) => {
      let endpoint = "http://localhost:9500/parent/login";
      let signinDetails = { ...values };
      axios.post(endpoint, signinDetails).then((result) => {
        if (!result.data) {
          Swal.fire("Error", result.data.message, "error");
        } else {
          Swal.fire("Success", result.data.message, "success");
          router.push("/DashBoard");
        }
      });
    },
  });

  return (
    <div className={style.page}>
      <div className={style.body}>
        <div className="col-4 mx-auto border rounded-3 my-5 bg-light">
          <h1 className="text-center my-5 border-bottom mb-3 p-3">Login</h1>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="col-11 mx-auto">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className={
                    formik.errors.email && formik.touched.email
                      ? "form-control input-style border-2 rounded-3 is-invalid"
                      : "form-control input-style border-2 rounded-3"
                  }
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  type="text"
                  onChange={formik.handleChange}
                ></input>
                <div className="text-danger">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
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
                      {show ? 'Hide' : "Show"}
                    </button>
                  </div>
                </div>
                <div className="text-danger">
                  {formik.touched.password && formik.errors.password}
                </div>
              </div>
              <div className="mb-3 p-1">
                <label htmlFor="" className="form-label">
                  Login As:
                </label>
                <select
                  className={
                    formik.errors.role && formik.touched.role
                      ? "form-control input-style border-2 rounded-3 is-invalid"
                      : "form-control input-style border-2 rounded-3"
                  }
                  name="role"
                  value={formik.values.role}
                  onBlur={formik.handleBlur}
                  type="text"
                  onChange={formik.handleChange}
                >
                  <option value="" className="form-control">

                  </option>
                  <option value="parent" className="form-control">
                    Parent
                  </option>
                  <option value="principal" className="form-control">
                    Principal
                  </option>
                  <option value="teacher" className="form-control">
                    Teacher
                  </option>
                </select>
              </div>
              <div className="text-danger">
                {formik.touched.role && formik.errors.role}
              </div>
              <div className="mb-3 p-3">
                <button
                  type="submit"
                  className="btn-success form-control btn text-light"
                >
                  Login
                </button>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <Link href={"/"} className="btn">
                  If you don't have an account SignUp
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

export default Login;
