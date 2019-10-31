import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AllTransactions.styles.scss';

class AllTransactions extends Component {
  render() {
    const { agentName, tranId, amount, transactionType, description, date, time, statusdescription, fee, i, agent, showPrintButton } = this.props;
    
	const statusClass = () => {
		if(statusdescription.toLowerCase().includes('success')){
		  return 'success'
		} else if (statusdescription.toLowerCase().includes('pending')){
		  return 'pending'
		} else if (statusdescription.toLowerCase().includes('failed')){
		  return 'failed'
		} else if (statusdescription.toLowerCase().includes('reverse')){
		  return 'reverse'
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
			<td style={{textAlign: 'center'}}><p className={statusClass()}>{statusdescription}</p></td>
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