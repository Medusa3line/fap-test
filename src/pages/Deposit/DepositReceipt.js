import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print'

class DepositReceipt extends Component {
  render(){
    const { commission, amount, acctNumber, bank, acctName, refNumber } = this.props;
    return (
      <div id="print-receipt" ref={el => (this.componentRef = el)}>
        <div className="form-horizontal" id="deposit-fields-2">
        <div className="form-group">
          <div className="receipt-header-1">
            <h4> Deposit </h4>
            <h4 className="btn btn-success btn-sm disabled">Successful</h4>
          </div>
        </div>
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
          
          <div className="d-flex justify-content-between">        
            <button type="button"
              className="btn btn-success"
            >              
              <ReactToPrint
                trigger={() => <span>Print Receipt</span>}
                content={() => this.componentRef}
              />
            </button>            
            <button onClick={() => this.props.history.push("/dashboard")} type="button"
              className="btn btn-danger">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
	
}

export default withRouter(DepositReceipt);