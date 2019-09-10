import React from 'react';
import { manipulateNumber } from '../../../manipulateNumber';

const ThriftEnrollmentFields = ({initalSubmit, onChange, firstName, lastName, middleName, email, address, phone, gender, dob}) => {

	return (
    <React.Fragment>
        <div style={{width: '86%', position: 'relative', left: '7%'}}>
            <div className="form-group">
              <div className="col-sm-12 col-md-8 col-lg-12" style={{marginBottom: '2vh'}}>
                <input 
                  type="text" 
                  className="form-control" 
                  required="required" 
                  name="firstName"
                  value={firstName} 
                  placeholder="First Name"
                  onChange={onChange} 
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 col-md-8 col-lg-12" style={{marginBottom: '2vh'}}>
                <input 
                  type="text" 
                  className="form-control"
                  required="required"
                  value={lastName} 
                  name="lastName" 
                  placeholder="Last Name" 
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                <input 
                  type="text" 
                  className="form-control" 
                  required="required" 
                  name="middleName" 
                  value={middleName}
                  placeholder="Middle Name"
                  onChange={onChange} 
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                  <select className="form-control" required="required" onChange={onChange} value={gender} name="gender">
                      <option defaultValue="" >Gender</option>
                      <option value="female" >Female</option>
                      <option value="male" >Male</option>
                  </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh', display: 'flex', alignItems: 'center'}}>
                <input 
                  type="tel" 
                  className="form-control" 
                  required="required" 
                  placeholder="Phone Number"
                  name="phone" 
                  value={phone}
                  onChange={onChange}
                  maxLength="11"
                  onKeyPress={(e) => manipulateNumber(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh', display: 'flex', alignItems: 'center'}}>
              <label className="col-sm-12 col-md-12 col-lg-6">Date of Birth</label>
              <input 
                type="date" 
                className="form-control col-sm-12 col-md-12 col-lg-12" 
                required="required" 
                name="dob"
                value={dob} 
                onChange={onChange}
              />
            </div>                          
            <div className="form-group">
              <div className="col-sm-12 col-md-8 col-lg-12" style={{marginBottom: '2vh'}}>
                <input 
                  type="email" 
                  className="form-control" 
                  required="required" 
                  name="email"                                 
                  placeholder="Email Address"
                  value={email} 
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 col-md-8 col-lg-12" style={{marginBottom: '2vh'}}>
                <input 
                  type="text" 
                  className="form-control" 
                  required="required" 
                  name="address"                                 
                  placeholder="Address" 
                  value={address}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12"><br />
              <button 
                type="submit" 
                className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
                id="submit_button" 
                onClick={initalSubmit}
                style={{float: 'left'}}>Next</button>
            </div>
      </div>
    </React.Fragment>
	);
}

export default ThriftEnrollmentFields;