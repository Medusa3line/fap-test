import React from 'react';
import PrintReceipt from '../../print';

const print = (divName) => {
    PrintReceipt(divName);
  }

const AccountOpeningSuccess = ({goBack}) => {
    return (
        <div id="print-receipt">
            <div className="form-horizontal" style={{textAlign: 'left'}} id="deposit-fields-2">
                <div className="form-group">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h4> Account Opening </h4>
                        <h4 className="btn btn-success btn-sm" style={{cursor: 'not-allowed'}}>Successful</h4>
                    </div>
                    </div>
                    <hr />
                    <div className="form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <h5>Account Number <span> {} </span></h5>
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <h5>Bank <span>{} </span></h5>
                    </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        <h5> Account Name <span>{} </span></h5>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        <h5> Reference Number <span>{} </span></h5>
                        </div>
                    </div>

                    <div className="form-group total">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        <h4>Total <span>₦{}</span></h4>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        <h5>Freedom Charge <span>₦{''}</span></h5>
                        </div>
                    </div><br />
                    
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>        
                        <button 
                            type="button"
                            className="btn btn-success"
                            onClick={() => print()}
                        >
                            Print Receipt
                        </button>
                
                        <button 
                            onClick={goBack} 
                            type="button"
                            className="btn btn-danger"
                        >
                            Go Back
                        </button>
                </div>
            </div>
        </div>
    )
}
export default AccountOpeningSuccess;