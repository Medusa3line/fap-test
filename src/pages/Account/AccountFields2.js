import React from 'react';
import MakingPayment from '../../makingPayment.js';
import { manipulateNumber } from '../../manipulateNumber';

const AccountFields2 = ({phoneNumber, email, occupation, address, amount, openAccount, onChange, makingPayment, goBack}) => {
	return (
        <div id="panel-bottom">
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
                                placeholder="Address"
                                name="address"
                                value={address}
                                onChange={onChange} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                            <input 
                                type="number" 
                                className="form-control" 
                                required="required" 
                                placeholder="Amount"
                                maxLength="8"
                                name="amount"
                                value={amount}
                                onChange={onChange}
                                onKeyPress={(e) => manipulateNumber(e)} 
                            />
                        </div>
                    </div> 
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <button className="btn btn-danger" onClick={goBack}>
                                Back
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-success" 
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
        </div>
	);
}

export default AccountFields2;