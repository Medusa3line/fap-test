import React from 'react';
import MakingPayment from '../../Components/makingPayment/makingPayment.js';
import { manipulateNumber } from '../../Utils/manipulateNumber';

const DepositFields2 = ({ commission, amount, onChange, validation, makingPayment, bank, acctName, acctNumber, goBack }) => {
  return (
    <div>
      <div className="form-horizontal" style={{textAlign: 'left'}} id="deposit-fields-2">
        <div className="form-group">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h5>Recipient Account Number: <span> {acctNumber} </span></h5>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h5>Recipient Bank: <span>{bank} </span></h5>
          </div>
        </div>
        <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h5> Account Name: <span>{acctName} </span></h5>
            </div>
        </div>

        <div className="form-group total">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h5>Total: <span>₦{amount}</span></h5>
            </div>
        </div>
        <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h5>Freedom Charge <span>₦{commission}</span></h5>
            </div>
        </div>

        <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h5>Enter your PIN below to complete this transaction</h5>
            </div><br/>
            <div className="col-sm-12 col-md-12 col-lg-12">
              <input 
                type="password" 
                maxLength="4" 
                className="form-control"
                name="pin" 
                onChange={onChange} 
                placeholder="Enter PIN here" 
                onKeyPress={(e) => manipulateNumber(e)}
              />
            </div>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'space-between'}}> 
          <button 
            type="submit"
            className="btn col-sm-8 col-md-6 col-lg-4"                    
            onClick={goBack}>Go Back
          </button>       
          <button 
            type="submit"
            className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
            id="validation"                    
            onClick={validation}>
            {
              makingPayment ? <MakingPayment />
              : 'Validate'
            }
          </button>
        </div> 
      </div>
    </div>
  );
}

export default DepositFields2;