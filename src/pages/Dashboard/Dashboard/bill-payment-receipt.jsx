import React, { useState, useEffect } from 'react';
import withTimeout from '../../../Components/HOCs/withTimeout.hoc';
import { useHistory } from 'react-router-dom';

import PrintReceipt from '../../../print';
import ReceiptFooter from '../../../Components/ReceiptFooter/ReceiptFooter.component';

const BillPaymentReceipt = () => {
	const [ state, setState ] = useState({
		transaction: {},
		DTO: {}, 
		tranDate: '',
		userDetails: {},
		electricityToken: ''
	})

	const history = useHistory()
	const { agentName, address, agentId } = JSON.parse(sessionStorage.getItem('userDetails'));

	useEffect(() => {
		async function getReceiptDetails(){
			if (history.location.state === undefined){
				history.push("/dashboard");
			} else {
					if (history.location.state.transaction.transactionType.toLowerCase() === 'deposit'){
					await setState(state => ({
						...state,
						DTO: history.location.state.transaction.depositDTO
					}))
				} else if (history.location.state.transaction.transactionType.toLowerCase() === 'Bill Payment'){
					await setState(state => ({
						...state,
						DTO: history.location.state.transaction.utilityDTO
					}))
				} 
				await setState( state =>({
					...state,
					transaction: history.location.state.transaction, 
					tranDate: history.location.state.transaction.tranDate,
					electricityToken: history.location.state.transaction.utilityDTO.electricityToken
				}))
			}
		}
		getReceiptDetails()
	}, [history])

	const print = (divName) => {
	    PrintReceipt(divName);
  	}

		const { transactionType, statusdescription, amount, tranId, transactionTypeDescription, bankTo, beneficiary } = state.transaction;
		const { freedomCharge, transactionRef } = state.DTO;
		const { tranDate, electricityToken } = state;

		const statusClass = () => {
			if(statusdescription === 'SUCCESSFULL' || statusdescription === 'SUCCESSFUL'){
			  return {
				backgroundColor: '#4caf50', /* Green */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed'
			  }
			} 
			else if (statusdescription === 'PENDING'){
			  return {
				backgroundColor: '#faa831', /* yellow */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed'
			  }
			} else if (statusdescription === 'FAILED'){
			  return {
				backgroundColor: '#E6061C', /* red */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed'
			  }
			} else if (statusdescription === 'REVERSED'){
			  return {
				backgroundColor: '#bdbdbd', /* Grey */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed'
			  }
			}
		  }

		return (
		<div id="print-receipt">
	        <div className="form-horizontal" style={{textAlign: 'left'}} id="deposit-fields-2">
				<div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black'}}>
					<h4>{transactionType} </h4>
					<h6>FREEDOM NETWORK</h6>
					<h5 style={statusClass()}>{statusdescription} </h5>
				</div>
				<div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Agent Name and ID <span>{`${agentName} (${agentId})`}</span></h5>
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
		              <h5>Transaction Description <span> {transactionTypeDescription} </span></h5>
		            </div>
		        </div>
				{
					electricityToken ? 
					<div className="form-group">
						<div className="col-sm-12 col-md-12 col-lg-12">
						<h5>Pin <span> {electricityToken} </span></h5>
						</div>
		        	</div>
					: null
				}
				
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Date <span> {state.tranDate.substring(0, tranDate.length - 18)} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Time <span> {state.tranDate.substring(11, tranDate.length - 9)} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Customer ID <span> {beneficiary} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Payment Plan <span>{bankTo} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		        	<div className="col-sm-12 col-md-12 col-lg-12">
		            	<h5> Reference Number <span>{transactionRef ? transactionRef : null} </span></h5>
		            </div>
		        </div>

		        <div className="form-group total">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		                <h4>Total <span>₦{amount}</span></h4>
		            </div>
		          </div>

		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		                <h5>Freedom Charge <span>₦{freedomCharge >= 0  ? freedomCharge : null}</span></h5>
		            </div>
	          	</div>
	        </div>

	        <div style={{display: 'flex', justifyContent: 'space-around'}}>        
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

export default withTimeout(BillPaymentReceipt);