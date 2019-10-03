import React from 'react';
import { manipulateNumber } from '../../../manipulateNumber';

const AccountFields1 = ({bvn, onChangeBVN, showValidateBVNButton, firstName, lastName, dob, gender, mothersMaidenName,  onChange, onSubmit, isThereBvn, hasBVN, showAccountOpeningFields, validateBvn }) => {
    return (
        <div className="row">                
            <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}> 
                    {/* {<small>Do you have a BVN? </small>} */}
                    <select className="form-control" required="required" value={hasBVN} onChange={isThereBvn} name="hasBVN">
                        <option value="">Do you have a BVN? </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            {
                hasBVN && !showAccountOpeningFields ? 
                <React.Fragment>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                            <input 
                                type="number" 
                                className="form-control" 
                                required="required" 
                                placeholder="Enter BVN here" 
                                maxLength="11"
                                name="bvn"
                                value={bvn}
                                onChange={onChangeBVN}
                                onKeyPress={(e) => manipulateNumber(e)} 
                            />
                        </div>
                    </div>
                    {
                        showValidateBVNButton ? 
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <button 
                                type="submit" 
                                className="btn" 
                                id="bvnValidation"
                                onClick={validateBvn}
                            > 
                            Validate BVN 
                            </button>
                        </div>
                        : null
                    }
                </React.Fragment> :
                null
            }
            {
                showAccountOpeningFields ?  
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                            <input 
                                type="text" 
                                required="required" 
                                className="form-control" 
                                placeholder="First Name"
                                name="firstName"
                                value={firstName}                                
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
                                placeholder="Last Name" 
                                name="lastName"
                                onChange={onChange}
                                value={lastName}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                            <input 
                                type="text" 
                                className="form-control" 
                                required="required" 
                                placeholder="Mother's Maiden Name"
                                name="mothersMaidenName"
                                onChange={onChange}
                                value={mothersMaidenName} 
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
                            onChange={onChange}
                            value={dob}
                        />
                    </div>                                                                   
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                            <select className="form-control" required="required" onChange={onChange} value={gender} name="gender">
                                <option value="" >Gender</option>
                                <option value="Female" >Female</option>
                                <option value="Male" >Male</option>
                            </select>
                        </div>
                    </div>                                                         
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <button 
                            type="submit" 
                            className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
                            id="login"
                            onClick={onSubmit}
                        > 
                        Next 
                        </button>
                    </div>
                </form>
                : null
            }  
        </div>
	);
}

export default AccountFields1;