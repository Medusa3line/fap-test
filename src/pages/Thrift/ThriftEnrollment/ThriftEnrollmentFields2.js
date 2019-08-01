import React from 'react';
import MakingPayment from '../../../makingPayment.js';
import { manipulateNumber } from '../../../manipulateNumber';

const ThriftEnrollmentFields2 = ({changeRouteToMain, onChange, finalSubmit, lastNine, cycle, amount, pin, makingPayment}) => {
	return (
    <div>
      <div className="row">
            <div className="form-group">
                <div className="col-sm-12 col-md-8 col-lg-12" style={{marginBottom: '2vh'}}>
                    <input 
                        type="number"
                        value={amount} 
                        name="amount" 
                        maxLength="8"
                        onChange={onChange} 
                        className="form-control" 
                        required="required" 
                        placeholder="Savings Amount" 
                        onKeyPress={(e) => manipulateNumber(e)}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}>
                    <select className="form-control" required="required" value={cycle} name="saving_cycle" onChange={onChange}>
                        <option defaultValue="" >Select Cycle</option>
                        <option value="MONTHLY" >Monthly</option>
                        <option value="CALENDAR_MONTH" >Calender Month</option>
                        <option value="WEEKLY" >Weekly</option>
                        <option value="BI_ANNUAL" >Bi-Annualy</option>
                        <option value="YEARLY" >Yearly</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-6 col-md-6 col-lg-6" style={{marginBottom: '2vh'}}>
                    <input type="text" className="form-control" required="required" readOnly="readonly" id="first_ten_digits" value="6395879032" style={{backgroundColor: 'white', opacity: '0.5'}} />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6" style={{marginBottom: '2vh'}}>
                    <input 
                        type="number" 
                        value={lastNine} 
                        name="lastNine" 
                        onChange={onChange} 
                        className="form-control" 
                        required="required" 
                        placeholder="Enter Last 9 Digits" 
                        maxLength="9"
                        onKeyPress={(e) => manipulateNumber(e)} 
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-12 col-lg-12 col-md-12">
                    <input 
                        type="password" 
                        value={pin} 
                        name="pin" 
                        onChange={onChange}
                        onKeyPress={(e) => manipulateNumber(e)} 
                        required="required" 
                        placeholder="Agent Pin" 
                        className="form-control col-sm-10 col-md-10 col-lg-10" 
                        maxLength="4" 
                    /> 
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12"> <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>                      
                    <button 
                        className="btn btn-danger" 
                        onClick={changeRouteToMain} 
                    > Go Back
                    </button>                      
                    <button 
                        type="submit"
                        className="btn btn-success" 
                        id="submit_button"                    
                        onClick={finalSubmit}>
                        {
                        makingPayment ? <MakingPayment />
                        : 'Enrol'
                        }
                    </button>
                </div> 
            </div>
        </div>
    </div>
	);
}

export default ThriftEnrollmentFields2;