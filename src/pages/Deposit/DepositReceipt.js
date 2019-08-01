import React, { Component } from 'react';
import PrintReceipt from '../../print';

class DepositReceipt extends Component {

  print = (divName) => {
    PrintReceipt(divName);
  }

  render(){
    const { commission, amount, goBackToDeposit, acctNumber, bank, acctName, refNumber } = this.props;
    return (
      <div id="print-receipt">
        <div className="form-horizontal" style={{textAlign: 'left'}} id="deposit-fields-2">
        <div className="form-group">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h4> Deposit </h4>
            <h4 className="btn btn-success btn-sm" style={{cursor: 'not-allowed'}}>Successful</h4>
        </div>
          </div>
          <hr />
          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h5>Recipient Account Number <span> {acctNumber} </span></h5>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h5>Recipient Bank <span>{bank} </span></h5>
            </div>
          </div>
          <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h5> Account Name <span>{acctName} </span></h5>
              </div>
          </div>

          <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h5> Reference Number <span>{refNumber} </span></h5>
              </div>
          </div>

          <div className="form-group total">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h4>Total <span>₦{amount}</span></h4>
              </div>
          </div>
          <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h5>Freedom Charge <span>₦{commission}</span></h5>
              </div>
          </div><br />
          
          <div style={{display: 'flex', justifyContent: 'space-between'}}>        
            <button type="button"
              className="btn btn-success"
              onClick={() => this.print()}
            >
              Print Receipt
            </button>
            
              <button onClick={goBackToDeposit} type="button"
              className="btn btn-danger">
              Go Back
              </button>
          </div>
        </div>
      </div>
    );
  }
	
}

export default DepositReceipt;