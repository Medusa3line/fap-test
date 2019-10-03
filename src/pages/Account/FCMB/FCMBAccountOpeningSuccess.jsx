import React from 'react';
import { withRouter } from 'react-router-dom';
import PrintReceipt from '../../../print';

const print = (divName) => {
    document.getElementById("panel").style.display = "none";
    PrintReceipt(divName);
    document.getElementById("panel").style.display = "block";
}

const AccountOpeningSuccess = ({generatedAccountNumber, firstName, lastName, history }) => {
    return (
        <div style={{marginBottom: '5vh', top: '2vh'}}>
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
                            <h5>Account Number <span> {generatedAccountNumber} </span></h5>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <h5>Bank <span>Guaranty Trust Bank (GTB)</span></h5>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <h5> Account Name <span>{`${firstName} ${lastName}`} </span></h5>
                        </div>
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>        
                        <button 
                            type="button"
                            className="btn btn-success"
                            onClick={() => print()}
                        >
                            Print Receipt
                        </button>
                
                        <button 
                            onClick={() => history.push('/dashboard')} 
                            type="button"
                            className="btn"
                        >
                            Go Back
                        </button>
                </div>
            </div>
        </div>
    )
}
export default withRouter(AccountOpeningSuccess);