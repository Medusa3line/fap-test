import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllTransactions extends Component {
  render() {
    const { agentName, tranId, amount, transactionType, description, date, time, statusdescription, fee, i, agent, showPrintButton } = this.props;
    
    const statusClass = () => {
			if(statusdescription === 'SUCCESSFULL' || statusdescription === 'SUCCESSFUL'){
			  return {
				backgroundColor: '#4caf50', /* Green */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed',
				fontSize: '10px'
			  }
			} 
			else if (statusdescription === 'PENDING'){
			  return {
				backgroundColor: '#faa831', /* yellow */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed',
				fontSize: '10px'
			  }
			} else if (statusdescription === 'FAILED'){
			  return {
				backgroundColor: '#E6061C', /* red */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed',
				fontSize: '10px'
			  }
			} else if (statusdescription === 'REVERSED'){
			  return {
				backgroundColor: '#bdbdbd', /* Grey */
				borderRadius: '.5vw',
				padding: '3px',
				color: 'white',
				cursor: 'not-allowed',
				fontSize: '10px'
			  }
			}
    }
    const pathName = `/${transactionType === 'Bill Payment' || transactionType === 'Recharge' ? 'aggregator-bill-payment-receipt' : 'aggregator-receipt'}/${tranId}`;
    return (
        <tr>
			<td>{i+1}</td>
        	<td>{agentName}</td>
        	<td>{tranId}</td>
        	<td>{amount}</td>
        	<td>{transactionType}</td>
			<td style={{textAlign: 'center'}}><p style={statusClass()}>{statusdescription}</p></td>
			<td>{description}</td>
			<td>{date.substring(0, date.length - 18)}</td>
			<td>{time.substring(11, time.length - 9)}</td>
			<td>{fee}</td>
			{
				showPrintButton === 'true' ? 
				<td>
					<Link 
					to={{pathname: pathName, state: {agent}} }
					id="view"
					>
					<i style={{fontSize: '20px'}} className="fa fa-print"></i>
					</Link>
				</td>
				: 
				null
			}
        </tr>
    );
  }
}

export default AllTransactions;