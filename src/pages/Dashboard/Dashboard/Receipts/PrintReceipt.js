import React, { useState, useEffect } from 'react';
import withTimeout from '../../../../Components/HOCs/withTimeout.hoc';
import { withRouter } from 'react-router-dom';

import PrintReceipt from '../../../../Utils/print';
import ReceiptFooter from '../../../../Components/ReceiptFooter/ReceiptFooter.component';

const Receipt = ({ history: { location }}, history) => {
	const [state, setState] = useState({
		transaction: {},
		userDetails: {}
	})

	useEffect(() => {
		if (location.state === undefined){
			history.push("/dashboard");
		} else {
			console.log(location.state.transaction)
			setState({
				...state,
				transaction: location.state.transaction
			})

			// Getting Agent's Details
			sessionStorage.getItem('userDetails') && setState ({
				...state,
				userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
			})
		}
	}, [])

	const print = (divName) => {
	    PrintReceipt(divName);
  	}

		const { transactionType, transactionRef, tranDate, status, amount, tranId, bankFrom, bankTo, beneficiary, agentName, fee } = state.transaction;
		const { address } = state.userDetails;

		// const statusClass = () => {
		// 	if(status.toLowerCase().includes('success')){
		// 		return 'success'
		// 	} else if (status.toLowerCase().includes('pending')){
		// 		return 'pending'
		// 	} else if (status.toLowerCase().includes('failed')){
		// 		return 'failed'
		// 	} else if (status.toLowerCase().includes('reverse')){
		// 		return 'reverse'
		// 	}
		// }

	return (
		<div id="print-receipt">
	        <div className="form-horizontal" id="deposit-fields-2">
				<div>
					<h4>{transactionType} </h4>
					<h6>FCMB</h6>
					<h5>{status} </h5>
				</div>
				<div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Agent Name <span>{`${agentName}`}</span></h5>
		            </div>
		        </div>
				<div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Agent's Address <span> {address} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Transaction Id <span> {tranId} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              {/* <h5>Date <span> {tranDate.substring(0, tranDate.length - 18)} </span></h5> */}
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              {/* <h5>Time <span> {tranDate.substring(11, tranDate.length - 9)} </span></h5> */}
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Account Number <span> {beneficiary} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Recipient Bank <span>{bankTo} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Sender's Bank <span>{bankFrom} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		        	<div className="col-sm-12 col-md-12 col-lg-12">
		            	<h5> Reference Number <span> { transactionRef } </span> </h5>
		            </div>
		        </div>

		        <div className="form-group total">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		                <h4>Total <span>₦{amount}</span></h4>
		            </div>
		          </div>

		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		                <h5>Charge <span>₦{fee}</span></h5>
		            </div>
	          	</div>
	        </div>

	        <div id="receipt-footer">        
	              <button type="submit"
	                className="btn btn-success btn-xs col-sm-4 col-md-4 col-lg-4"
	                onClick={() => print('deposit-fields-2')}>
	                Print Receipt
	            </button>
	              
	            <button
	            	onClick={() => history.goBack()}
	            	type="submit" 	            	
	                className="btn btn-xs col-sm-4 col-md-4 col-lg-4">	                
	                Go Back
	            </button>

	        </div>  <br />
			<ReceiptFooter />
    	</div>
	)
}

export default withTimeout(withRouter(Receipt));