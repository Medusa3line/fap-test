import React from 'react';
import { withRouter } from 'react-router-dom';

const PaymentReceipt = ({serviceNames, payload, optionName, history}) => {
	return (
        <div>  
            <div id="thrift-container">
                <img style={{height: '10vh', width: '10vh'}} src={require("../../../img/account-balance.svg")} alt="" />
                <h5>{`${optionName} payment for ${serviceNames} was successful`}</h5>
                <h4>Pin: {payload.pin}</h4>
                <h6>Transaction Reference Number: {payload.ref}</h6>
                <button className="btn btn-success" onClick={() => history.push('/dashboard')}>Back</button>               
            </div>
        </div>
	);
}

export default withRouter(PaymentReceipt);