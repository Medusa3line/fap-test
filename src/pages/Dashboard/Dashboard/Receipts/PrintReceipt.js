import React, { useState, useEffect, useRef } from 'react';
import withTimeout from '../../../../Components/HOCs/withTimeout.hoc';
import { useHistory } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import ReceiptFooter from '../../../../Components/ReceiptFooter/ReceiptFooter.component';

const Receipt = () => {
	const [state, setState] = useState({
		transaction: {},
		userDetails: {}
	})

	const history = useHistory();
	const { location } = history;
	const componentRef = useRef()

	useEffect(() => {
		if (location.state === undefined){
			history.push("/dashboard");
		} else {
			// Getting Agent's Details
			sessionStorage.getItem('userDetails') && setState (state => ({
				...state,
				transaction: location.state.transaction,
				userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
			}))
		}
	}, [history, location.state])

	const { transactionType, transactionRef, tranDate, status, amount, tranId, bankFrom, bankTo, beneficiary, agentName, fee } = state.transaction;
	const { address } = state.userDetails;
	const statusClass = () => {
		if(status !== undefined){
			const btnBaseStyle = {
				borderRadius: '5px',
				padding: '5px',
				color: 'white',
				cursor: 'not-allowed'
			}
			if(status.toLowerCase().includes('success')){
				return {
					...btnBaseStyle,
					backgroundColor: '#4caf50', /* Green */
				}
			} 
			else if (status.toLowerCase().includes('pending')){
				return {
					...btnBaseStyle,
					backgroundColor: '#faa831', /* yellow */
				}
			} else if (status.toLowerCase().includes('failed')){
				return {
					...btnBaseStyle,
					backgroundColor: '#E6061C', /* red */
				}
			} else if (status.toLowerCase().includes('reverse')){
				return {
					...btnBaseStyle,
					backgroundColor: '#bdbdbd', /* Grey */
				}
			}
		}	
	}

	return (
		<div id="print-receipt" ref={componentRef}>
	        <div className="form-horizontal" id="deposit-fields-2" >
				<div className="receipt-header">
					<h4>{transactionType !== undefined ? transactionType.replace(/_/g, ' '): null} </h4>
					<h6>FCMB</h6>
					<h6 style={statusClass()}>{status} </h6>
				</div>
				<div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Agent Name <span>{agentName}</span></h6>
		            </div>
		        </div>
				<div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Agent's Address <span> {address} </span></h6>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Transaction Id <span> {tranId} </span></h6>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Date <span> {tranDate !== undefined ? tranDate.substring(0, tranDate.length - 18) : null } </span></h6>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Time <span> {tranDate !== undefined ? tranDate.substring(11, tranDate.length - 9): null} </span></h6>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Account Number <span> {beneficiary} </span></h6>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Recipient Bank <span>{bankTo} </span></h6>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h6>Sender's Bank <span>{bankFrom} </span></h6>
		            </div>
		        </div>
		        <div className="form-group">
		        	<div className="col-sm-12 col-md-12 col-lg-12">
		            	<h6> Reference Number <span> { transactionRef } </span> </h6>
		            </div>
		        </div>

		        <div className="form-group total">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		                <h4>Total <span>₦{amount}</span></h4>
		            </div>
		          </div>

		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		                <h6>Charge <span>₦{fee}</span></h6>
		            </div>
	          	</div>
	        </div>

	        <div className="d-flex justify-content-around mb-5">        
	              <button type="submit"
	                className="btn btn-xs col-sm-4 col-md-4 col-lg-4">
	                <ReactToPrint
						trigger={() => <span>Print Receipt</span>}
						content={() => componentRef.current}
					/>
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

export default withTimeout(Receipt);