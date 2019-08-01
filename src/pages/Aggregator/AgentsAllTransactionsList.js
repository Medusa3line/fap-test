import React, { Component } from 'react';

class AgentsAllTransactionsList extends Component {
  render() {
  	const { walletId, transId, amount, transactionType, remark, date, time, balanceBefore, balanceAfter, i } = this.props;
    return (
        <tr>
          <td>{i+1}</td>
        	<td>{walletId}</td>
        	<td>{transId}</td>
        	<td>{amount}</td>
        	<td>{transactionType}</td>
          <td>{remark}</td>
          <td>{date.substring(0, date.length - 18)}</td>
          <td>{time.substring(11, time.length - 9)}</td>
          <td>{balanceBefore}</td>
          <td>{balanceAfter}</td>
        </tr>
    );
  }
}

export default AgentsAllTransactionsList;