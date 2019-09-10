import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AgentsPerformanceList extends Component {
  render() {
  	const { agentName, terminal, totalDeposits, totalDepositsValue, totalWithdrawals, totalWithdrawalsValue, AgentId, i } = this.props;
    return (
        <tr>
          <td>{i+1}</td>
        	<td>{agentName}</td>
        	<td>{AgentId}</td>
          <td>{terminal}</td>
        	<td>{totalDepositsValue}</td>
          <td>{totalDeposits}</td>
          <td>{totalWithdrawalsValue}</td>
          <td>{totalWithdrawals}</td>
          <td><Link to={`/viewAgent/${AgentId}`} id="view">View</Link></td>
        </tr>
    );
  }
}

export default AgentsPerformanceList;