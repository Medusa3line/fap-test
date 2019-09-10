import React from 'react';
import MakingPayment from '../../makingPayment.js';
import { manipulateNumber } from '../../manipulateNumber';

const WithdrawalFields = ({withdrawFund, onChangePhoneNumber, phoneNumber, tranRef, validating, makingWithdrawal, validatePaymentCode, paymentCode, customerName, agentPin, amount, onChangePaymentCode, onChangeAgentPin, isPaymentCodeValid }) => {
	return (
    <div>
        <div className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <input 
                type="number" 
                required="required" 
                className="form-control" 
                placeholder="Enter Payment Code"
                name="paymentCode"
                onChange={onChangePaymentCode}
                value={paymentCode}
              />                     
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <input 
                type="number" 
                required="required"
                maxLength="11" 
                className="form-control" 
                placeholder="Enter Phone Number"
                name="phoneNumber"
                onChange={onChangePhoneNumber}
                value={phoneNumber} 
                onKeyPress={(e) => manipulateNumber(e)}
              />                     
            </div>
          </div>
          {
            !isPaymentCodeValid ?
            <div className="form-group">        
              <div className="col-sm-12 col-md-12 col-lg-12">
                <button 
                  type="submit"
                  className="btn col-sm-8 col-md-6 col-lg-4" 
                  id="validate_button"                    
                  onClick={validatePaymentCode}>
                  {
                    validating ? <MakingPayment />
                    : 'Validate'
                  }
                </button>
              </div>
            </div>
            : 
          <React.Fragment>
            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <input 
                  type="text" 
                  required="required" 
                  className="form-control" 
                  placeholder="Customer Name"
                  readOnly
                  name="customerName"
                  value={customerName}
                />                     
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <input 
                  type="text" 
                  required="required" 
                  className="form-control" 
                  placeholder="Transaction Reference Number"
                  readOnly
                  name="tranRef"
                  value={tranRef}
                />                     
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <input 
                  type="number" 
                  className="form-control" 
                  required="required" 
                  placeholder="Amount" 
                  readOnly
                  name="paymentCode"
                  value={amount}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <input 
                  type="password" 
                  className="form-control" 
                  required="required" 
                  placeholder="Agent PIN" 
                  maxLength="4"
                  name="agentPin"
                  onChange={onChangeAgentPin}
                  value={agentPin} 
                  onKeyPress={(e) => manipulateNumber(e)}
                />
              </div>
            </div>
            
            <div className="form-group">        
              <div className="col-sm-12 col-md-12 col-lg-12">
                <button 
                  type="submit"
                  className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
                  id="withdrawal_button"                    
                  onClick={withdrawFund}>
                  {
                    makingWithdrawal ? <MakingPayment />
                    : 'Withdraw Fund'
                  }
                </button>
              </div>
            </div>
          </React.Fragment>
        }  
      </div>
    </div>
		);
}

export default WithdrawalFields;