import React, { Component } from 'react';
import withTimeout from '../../../Components/HOCs/withTimeout.hoc';
import { withRouter } from 'react-router-dom';

import PrintReceipt from '../../../Utils/print';
import ReceiptFooter from '../../../Components/ReceiptFooter/ReceiptFooter.component';

class Receipt extends Component {
	state = {
		transaction: {},
		DTO: {}, 
		tranDate: '',
		userDetails: {}
	}

	componentDidMount = async () => {
		this._isMounted = true;
		if (this.props.history.location.state === undefined){
			this.props.history.push("/dashboard");
		} else {
				if (this.props.history.location.state.transaction.transactionType.toLowerCase() === 'deposit'){
				this.setState({DTO: this.props.location.state.transaction.depositDTO})
			} else if (this.props.history.location.state.transaction.transactionType.toLowerCase() === 'Bill Payment'){
				this.setState({DTO: this.props.history.location.state.transaction.utilityDTO})
			} 
			this.setState({transaction: this.props.history.location.state.transaction, tranDate: this.props.history.location.state.transaction.tranDate})

			// Getting Agent's Details
			await sessionStorage.getItem('userDetails') && this.setState ({
				userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
			})
		}
	}

	print = (divName) => {
	    PrintReceipt(divName);
  	}

	render (){
		const { transactionType, statusdescription, amount, tranId, bankFrom, bankTo, beneficiary, itexTranId } = this.state.transaction;
		const { freedomCharge, transactionRef } = this.state.DTO;
		const { tranDate } = this.state;
		const { agentName, address, agentId } = this.state.userDetails;

		const statusClass = () => {
			if(statusdescription === 'SUCCESSFULL' || statusdescription === 'SUCCESSFUL'){
			  return {
				backgroundColor: '#4caf50', /* Green */
				borderRadius: '.5vw',
				padding: '5px',
				color: 'white',
				cursor: 'not-allowed'
			  }
			} 
			else if (statusdescription === 'PENDING'){
			  return {
				backgroundColor: '#faa831', /* yellow */
				borderRadius: '.5vw',
				padding: '5px',
				color: 'white',
				cursor: 'not-allowed'
			  }
			} else if (statusdescription === 'FAILED'){
			  return {
				backgroundColor: '#E6061C', /* red */
				borderRadius: '.5vw',
				padding: '5px',
				color: 'white',
				cursor: 'not-allowed'
			  }
			} else if (statusdescription === 'REVERSED'){
			  return {
				backgroundColor: '#bdbdbd', /* Grey */
				borderRadius: '.5vw',
				padding: '5px',
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
		              <h5>Date <span> {this.state.tranDate.substring(0, tranDate.length - 18)} </span></h5>
		            </div>
		        </div>
		        <div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Time <span> {this.state.tranDate.substring(11, tranDate.length - 9)} </span></h5>
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
		            	<h5> Reference Number 
							<span> 
								{ 
									transactionRef ? transactionRef : (
										transactionType === 'Withdrawal' ? itexTranId : null
									)
								} 
							</span>
						</h5>
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
	                onClick={() => this.print('deposit-fields-2')}>
	                Print Receipt
	            </button>
	              
	            <button
	            	onClick={() => this.props.history.goBack()}
	            	type="submit" 	            	
	                className="btn btn-xs col-sm-4 col-md-4 col-lg-4">	                
	                Go Back
	            </button>

	        </div>  <br />
			<ReceiptFooter />
    	</div>
	)
	}
}

export default withTimeout(withRouter(Receipt));