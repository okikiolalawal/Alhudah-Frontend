import React from 'react'
import Form from 'react-bootstrap/Form'
import style from '../styles/SignUp.module.css'
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const AddStudent = () => {
  const router = useRouter()
  const handleSubmit = () => {
      Swal.fire(
        'Success',
        'Student Added Successfully',
        'success'
      )
      router.push('/DashBoard')
  }
  return (
    
    <div className={style.page}>
    <div className={`${style.body}`}>
      <div className={`${style.shadow}${style.padded} my-5 col-6 mx-auto p-4 border rounded-3 bg-light`}>
        <h2 className="text-center border-bottom p-3">Add New Student</h2>
        <div className="row">
          <div className="col-3 p-3">
            <label htmlFor="" className="form-label ">
            SurName
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="SurName"
            />
          </div>
          <div className="col-6 p-3">
            <label htmlFor="" className="form-label ">
              Other Names
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Other Names"
            />
          </div>
          <div className="col-3 p-3">
            <label htmlFor="" className="form-label">
              Gender
            </label>
            <select className="form-select">
              <option value="Male" className="form-control">
                Male
              </option>
              <option value="Female" className="form-control">
                Female
              </option>
            </select>
          </div>
        </div>
        <div className="row">
        <div className="col-4 p-4">
            <label htmlFor="" className="form-label">
              Date Of Birth
            </label>
            <input type="date" className="form-control" placeholder="Date Of Birth" />
          </div>
          <div className="col-4 p-3">
            <label htmlFor="" className="form-label">
              Class From
            </label>
            <select className="form-select">
              <option value="Male" className="form-control">
                JSS1
              </option>
              <option value="Female" className="form-control">
                JSS2
              </option>
              <option value="Female" className="form-control">
                JSS3
              </option>
              <option value="Female" className="form-control">
                SSS1
              </option>
              <option value="Female" className="form-control">
                SSS2
              </option>
              <option value="Female" className="form-control">
                SSS3
              </option>
            </select>
          </div>
          <div className="col-4 p-3">
            <label htmlFor="" className="form-label">
              Class To
            </label>
            <select className="form-select">
              <option value="Male" className="form-control">
                JSS1
              </option>
              <option value="Female" className="form-control">
                JSS2
              </option>
              <option value="Female" className="form-control">
                JSS3
              </option>
              <option value="Female" className="form-control">
                SSS1
              </option>
              <option value="Female" className="form-control">
                SSS2
              </option>
              <option value="Female" className="form-control">
                SSS3
              </option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-4 p-4">
            <label htmlFor="" className="form-label">
              Nationality
            </label>
            <input type="text" className="form-control" placeholder="Nationality" />
          </div>
          <div className="col-4 p-4">
            <label htmlFor="" className="form-label">
              Tribe
            </label>
            <input type="text" className="form-control" placeholder="Tribe" />
          </div>
          <div className="col-4 p-4">
            <label htmlFor="" className="form-label">
              Religion
            </label>
            <input type="text" className="form-control" placeholder="Religion" />
          </div>
        </div>
        {['checkbox', 'radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="1"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="2"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            disabled
            label="3 (disabled)"
            type={type}
            id={`inline-${type}-3`}
          />
        </div>
      ))}
        {/* <div className="row">
          
          <div className="col-6 p-4">
            <label htmlFor="" className="form-label">
              Ward's Picture
            </label>
            <input type="file" className="form-control" placeholder="Ward's Picture" />
          </div>
          <div className="col-3 p-4">
            <label htmlFor="" className="form-label">
              Boarding Or Day
            </label>
            <input type="radio" className="form-control"/>
          </div>
        </div> */}
        <div className='col-12 p-3'>
            <button className='btn btn-success form-control' onClick={handleSubmit}>Add Student</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AddStudent;