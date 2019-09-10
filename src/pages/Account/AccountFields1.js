import React from 'react';
import { manipulateNumber } from '../../manipulateNumber';

const AccountFields1 = ({bvn, onChangeBVN, showValidateBVNButton, firstName, lastName, middleName, dob, gender, mothersMaidenName, state, bank, onChange, onSubmit, isThereBvn, hasBVN, showAccountOpeningFields, validateBvn }) => {
	return (
        <div id="panel-bottom">
            <div className="row">                
                <div className="form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}> 
                        {/* {<small>Do you have a BVN? </small>} */}
                        <select className="form-control" required="required" onChange={isThereBvn} name="hasBVN">
                            <option value="">Do you have a BVN? </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
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
                                    <option defaultValue="" >Gender</option>
                                    <option value="Female" >Female</option>
                                    <option value="Male" >Male</option>
                                </select>
                            </div>
                        </div> 
                        <div className="form-group">
                            <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                                <select className="form-control" required="required" name="state" onChange={onChange} value={state}>
                                    <option value="" disabled>State of Origin</option>
                                    <option value='Abia'>Abia</option>
                                    <option value='Adamawa'>Adamawa</option>
                                    <option value='AkwaIbom'>AkwaIbom</option>
                                    <option value='Anambra'>Anambra</option>
                                    <option value='Bauchi'>Bauchi</option>
                                    <option value='Bayelsa'>Bayelsa</option>
                                    <option value='Benue'>Benue</option>
                                    <option value='Borno'>Borno</option>
                                    <option value='CrossRivers'>CrossRivers</option>
                                    <option value='Delta'>Delta</option>
                                    <option value='Ebonyi'>Ebonyi</option>
                                    <option value='Edo'>Edo</option>
                                    <option value='Ekiti'>Ekiti</option>
                                    <option value='Enugu'>Enugu</option>
                                    <option value='Gombe'>Gombe</option>
                                    <option value='Imo'>Imo</option>
                                    <option value='Jigawa'>Jigawa</option>
                                    <option value='Kaduna'>Kaduna</option>
                                    <option value='Kano'>Kano</option>
                                    <option value='Katsina'>Katsina</option>
                                    <option value='Kebbi'>Kebbi</option>
                                    <option value='Kogi'>Kogi</option>
                                    <option value='Kwara'>Kwara</option>
                                    <option value='Lagos'>Lagos</option>
                                    <option value='Nasarawa'>Nasarawa</option>
                                    <option value='Niger'>Niger</option>
                                    <option value='Ogun'>Ogun</option>
                                    <option value='Ondo'>Ondo</option>
                                    <option value='Osun'>Osun</option>
                                    <option value='Oyo'>Oyo</option>
                                    <option value='Plateau'>Plateau</option>
                                    <option value='Rivers'>Rivers</option>
                                    <option value='Sokoto'>Sokoto</option>
                                    <option value='Taraba'>Taraba</option>
                                    <option value='Yobe'>Yobe</option>
                                    <option value='Zamfara'>Zamafara</option>
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
        </div>

	);
}

export default AccountFields1;