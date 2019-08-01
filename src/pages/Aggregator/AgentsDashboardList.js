import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AgentsDashboardList extends Component {
  render() {
  	const { username, SN, agentId, terminalId} = this.props;
    return (
        <tr>
        	<td>{SN}</td>
        	<td>{username}</td>
        	<td>{agentId}</td>
        	<td>{terminalId}</td>
          <td><Link to="/viewAgent" id="view">View</Link></td>
        </tr>
    );
  }
}

export default AgentsDashboardList;