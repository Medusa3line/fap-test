import React from 'react';
import MakingPayment from '../../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../../Utils/manipulateNumber';

const AccountFields2 = ({phoneNumber, email, residentAddress, lgOfResidence, nextOfKin, occupation, nationality, openAccount, onChange, makingPayment, goBack, stateOfResidence}) => {
	return (
        <div className="row">
            <form className="form" onSubmit={openAccount}>
            <div className="form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                        <input 
                            type="number" 
                            className="form-control" 
                            required="required" 
                            placeholder="Phone Number" 
                            maxLength="11"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={onChange}
                            onKeyPress={(e) => manipulateNumber(e)} 
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                        <input 
                            type="email" 
                            className="form-control" 
                            required="required" 
                            placeholder="Email Address"
                            name="email"
                            value={email}
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
                            placeholder="Occupation"
                            name="occupation"
                            value={occupation}
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
                            placeholder="Nationality"
                            name="nationality"
                            value={nationality}
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
                            placeholder="Resident Address"
                            name="residentAddress"
                            value={residentAddress}
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
                            placeholder="State of Residence"
                            name="stateOfResidence"
                            value={stateOfResidence}
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
                            placeholder="Local Government of Residence"
                            name="lgOfResidence"
                            value={lgOfResidence}
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
                            placeholder="Name of Next of Kin"
                            name="nextOfKin"
                            value={nextOfKin}
                            onChange={onChange} 
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button className="btn " onClick={goBack}>
                            Back
                        </button>
                        <button 
                            type="submit" 
                            className="btn col-sm-8 col-md-6 col-lg-4" 
                            id="submit_button"
                            onClick={openAccount}
                        >
                            {
                                makingPayment ? <MakingPayment />
                                : 'Submit'
                            }
                        </button>
                    </div>
                </div>
            </form>          
        </div>
	);
}

export default AccountFields2;