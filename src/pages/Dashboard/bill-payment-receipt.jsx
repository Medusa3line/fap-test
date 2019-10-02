import React, { Component } from 'react';

import PrintReceipt from '../../print';

class BillPaymentReceipt extends Component {
	state = {
		transaction: {},
		DTO: {}, 
		tranDate: '',
		userDetails: {}
	}

	componentDidMount = async () => {
		if (this.props.location.state === undefined){
			this.props.history.push("/dashboard");
		} else {
				if (this.props.location.state.transaction.transactionType.toLowerCase() === 'deposit'){
				this.setState({DTO: this.props.location.state.transaction.depositDTO})
			} else if (this.props.location.state.transaction.transactionType.toLowerCase() === 'Bill Payment'){
				this.setState({DTO: this.props.location.state.transaction.utilityDTO})
			} 
			this.setState({transaction: this.props.location.state.transaction, tranDate: this.props.location.state.transaction.tranDate})

			// Getting Agent's Details
			await localStorage.getItem('userDetails') && this.setState ({
				userDetails: JSON.parse(localStorage.getItem('userDetails'))
			})
		}
	}

	goBack = () => {
		this.props.history.push("/dashboard");
	}

	print = (divName) => {
	    PrintReceipt(divName);
  	}

	render (){
		const { transactionType, statusdescription, amount, tranId, transactionTypeDescription, bankTo, beneficiary } = this.state.transaction;
		const { freedomCharge, transactionRef } = this.state.DTO;
		const { tranDate } = this.state;
		const { agentName, address, agentId } = this.state.userDetails;

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
					<h6><img src={require("../../img/3line_logo.png")} alt="3LINE CARD MANAGEMENT LIMITED" /></h6>
					<h5 style={statusClass()}>{statusdescription} </h5>
				</div>
				<div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Agent Name and ID <span>{`${agentName} (${agentId})`}</span></h5>
		            </div>
		        </div>
				<div className="form-group">
		            <div className="col-sm-12 col-md-12 col-lg-12">
		              <h5>Address <span> {address} </span></h5>
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
	                onClick={() => this.print('deposit-fields-2')}>
	                Print Receipt
	            </button>
	              
	            <button
	            	onClick={this.goBack}
	            	type="submit" 	            	
	                className="btn btn-xs col-sm-4 col-md-4 col-lg-4">	                
	                Go Back
	            </button>

	        </div>  <br />
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<h6>Powered by <img src={require("../../img/3line_logo.png")} style={{marginLeft: '5px'}} alt="3LINE CARD MANAGEMENT LIMITED" /></h6>
			</div>
    	</div>
	)
	}
}

export default  BillPaymentReceipt;