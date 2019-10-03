import React from 'react';

export const AgentsAllTransactionsList = ({ transId, amount, transactionType, remark, date, time, balanceBefore, balanceAfter, i }) => {
  return (
      <tr>
        <td>{i+1}</td>
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