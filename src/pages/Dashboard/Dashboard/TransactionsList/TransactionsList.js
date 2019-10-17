import React from 'react';
import { Link } from 'react-router-dom';
import './TransactionsList.scss';

const TransactionsList = ({ transId, amount, transType, transDate, status, serialNumber, transaction } ) => {
  const statusClass = () => {
    if(status.toLowerCase().includes('success')){
      return 'success'
    } else if (status.toLowerCase().includes('pending')){
      return 'pending'
    } else if (status.toLowerCase().includes('failed')){
      return 'failed'
    } else if (status.toLowerCase().includes('reverse')){
      return 'reverse'
    }
  }
  const pathname = `receipt/${transId}`;
    return (
      <tr>
        <td>{serialNumber + 1}</td>
        <td>{transId}</td>
        <td>₦{amount}</td>
        <td>{transType.replace(/[_]/g, ' ')}</td>
        <td><p className={statusClass()}>{status}</p></td>
        <td>{transDate.substring(0, transDate.length - 18)}</td>
        <td>{transDate.substring(11, transDate.length - 9)}</td>
        <td>
          <Link 
            to={{pathname, state: {transaction}} }
            id="view"
          >
            <i className="fa fa-print"></i>
          </Link>
        </td>
      </tr>
    );
}

export default TransactionsList;