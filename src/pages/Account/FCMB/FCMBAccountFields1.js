import React from 'react';
import { manipulateNumber } from '../../../Utils/manipulateNumber';
import MakingPayment from '../../../Components/makingPayment/makingPayment';

const AccountFields1 = ({bvn, onChangeBVN, showValidateBVNButton, firstName, lastName, dob, gender, mothersMaidenName,  onChange, onSubmit, isThereBvn, hasBVN, showAccountOpeningFields, validateBvn, maritalStatus, middleName, makingPayment }) => {
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
                <form onSubmit={validateBvn}>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                            <input 
                                type="number" 
                                className="form-control" 
                                required="required" 
                                placeholder="Enter BVN here" 
                                maxLength="11"
                                name="bvn"
                                onChange={onChangeBVN}
                                value={bvn}                                
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
                            {
                                makingPayment ? <MakingPayment />
                                : 'Validate BVN'
                            }
                            </button>
                        </div>
                        : null
                    }
                </form> :
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
                                placeholder="Middle Name" 
                                name="middleName"
                                onChange={onChange}
                                value={middleName}
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
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                            <select className="form-control" required="required" onChange={onChange} value={maritalStatus} name="maritalStatus">
                                <option value="" >Marital Status</option>
                                <option value="Single" >Single</option>
                                <option value="Married" >Married</option>
                                <option value="Divorced" >Divorced</option>
                                <option value="Widow" >Widow</option>
                            </select>
                        </div>
                    </div>                                                       
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <button 
                            type="submit" 
                            className="btn col-sm-8 col-md-6 col-lg-4" 
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