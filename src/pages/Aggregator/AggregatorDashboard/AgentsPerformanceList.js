import React from 'react';
import { useHistory } from 'react-router-dom';
import './AgentsPerformanceList.styles.scss';

const AgentsPerformanceList = ({ agentName, terminal, totalDeposits, totalDepositsValue, totalWithdrawals, totalWithdrawalsValue, AgentId, i, totalBillPayment, totalBillPaymentValue }) => {
  const history = useHistory();
  return (
    <tr onClick={() => history.push(`/viewAgent/${AgentId}`)} id="hoverable-table-row">
      <td>{i+1}</td>
      <td>{agentName}</td>
      <td>{AgentId}</td>
      <td>{terminal}</td>
      <td>{totalDepositsValue}</td>
      <td>{totalDeposits}</td>
      <td>{totalWithdrawalsValue}</td>
      <td>{totalWithdrawals}</td>
      <td>{totalBillPaymentValue}</td>
      <td>{totalBillPayment}</td>
    </tr>
  );
}
export default AgentsPerformanceList;