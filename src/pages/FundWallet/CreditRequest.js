import React from 'react';
import MakingPayment from '../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../Utils/manipulateNumber';

const CreditRequest = ({ creditRequestApprove, bankName, amount, depositorsName, makingPayment }) => {
  return (
    <div>
      <form onSubmit={creditRequestApprove}>
        <div className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <input type="text" 
              className="form-control" 
              required="required" 
              id="depositor" 
              placeholder="Depositor's Name" 
              onChange={depositorsName}
            />
            </div>
          </div><br />

          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <input type="number" 
              className="form-control" 
              required="required" 
              id="amount" 
              min="0"
              maxLength="8"
              placeholder="Amount"
              onChange={amount}
              onKeyPress={(e) => manipulateNumber(e)}
            />
            </div>
          </div><br />

          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <select className="form-control" required="required" id="select_bank" onChange={bankName}>
                    <option value="" defaultValue>Bank</option>
                    <option value="fcmb">FCMB Bank</option>
                    <option value="fidelity">Fidelity Bank</option>
                </select>
            </div>
          </div><br />
          
          <div className="form-group">        
            <div className="col-sm-12 col-md-12 col-lg-12">
              <button 
                type="submit"
                className="btn col-sm-8 col-md-6 col-lg-4" 
                id="login_button"                     
                onClick={creditRequestApprove}>
                {
                  makingPayment ? <MakingPayment />
                  : 'Proceed'
                }
              </button>             
            </div>
          </div>  <br />
        </div>
      </form>
    </div>
  );
}
export default CreditRequest;