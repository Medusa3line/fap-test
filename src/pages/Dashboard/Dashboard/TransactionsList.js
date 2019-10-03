import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TransactionsList extends Component {
  render() {
    const { transId, amount, transType, transDate, status, serialNumber, transaction } = this.props;
    const statusClass = () => {
    if(status === 'SUCCESSFULL' || status === 'SUCCESSFUL'){
      return {
        backgroundColor: '#4caf50', /* Green */
        borderRadius: '.5vw',
        padding: '3px',
        color: 'white',
        width: '100%'
      }
    } 
    else if (status === 'PENDING'){
      return {
        backgroundColor: '#faa831', /* yellow */
        borderRadius: '.5vw',
        padding: '3px',
        color: 'white',
        width: '100%'
      }
    } else if (status === 'FAILED'){
      return {
        backgroundColor: '#E6061C', /* red */
        borderRadius: '.5vw',
        padding: '3px',
        color: 'white',
        width: '100%'
      }
    } else if (status === 'REVERSED'){
      return {
        backgroundColor: '#bdbdbd', /* Grey */
        borderRadius: '.5vw',
        padding: '3px',
        color: 'white',
        width: '100%'
      }
    }
  }
  const pathName = `/${transType === 'Bill Payment' || transType === 'Recharge' ? 'bill-payment-receipt' : 'receipt'}/${transId}`;
    return (
      <tr>
        <td>{serialNumber + 1}</td>
        <td>{transId}</td>
        <td>₦{amount}</td>
        <td>{transType}</td>
        <td style={{fontSize: '1rem', textAlign: 'center'}}><p style={statusClass()}>{status}</p></td>
        <td>{transDate.substring(0, transDate.length - 18)}</td>
        <td>{transDate.substring(11, transDate.length - 9)}</td>
        <td>
          <Link 
            to={{pathname: pathName, state: {transaction}} }
            id="view"
          >
            <i style={{fontSize: '20px'}} className="fa fa-print"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

export default TransactionsList;