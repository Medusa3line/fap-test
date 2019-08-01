import React from 'react';
import AgentsPerformanceList from './AgentsPerformanceList';

const AgentsPerformance = ({ performance }) => {
	return (
		<div id="right-aggregator-view">
          	<table className="table table-responsive">
              	<thead>
                  	<tr>
					  	<th>S/N</th>
	                    <th>Agent Name</th>
	                    <th>Agent ID</th>
	                    <th>Terminal ID</th>
	                    <th>Deposit Value</th>
	                    <th>Total Deposit</th>
	                    <th>Withdrawal Value</th>
	                    <th>Total Withdrawal</th>
	                    <th></th>
                  	</tr>
             	</thead>
              	<tbody>
		            {
		                performance === null ? null : (performance.length === 0 ? null : 
		                  	performance.map((agent,i) => {
			                    return <AgentsPerformanceList 
			                      agentName={agent.agentName}
			                      terminal={agent.terminal}
			                      totalDeposits={agent.totalDeposits}
			                      totalDepositsValue={agent.totalDepositsValue}
			                      totalWithdrawals={agent.totalWithdrawals}
			                      totalWithdrawalsValue={agent.totalWithdrawalsValue}
								  AgentId={agent.agentId}
								  i={i}
			                      key={i} />
			                    }
		                    )
		                ) 
		            }
              	</tbody>
          	</table>
        </div>
	)
}

export default AgentsPerformance;