import React from 'react';
import AgentsPerformanceList from './AgentsPerformanceList';
import NoResultFound from '../../../Components/NoResultFound/NoResultfound';

const AgentsPerformance = ({ performance }) => {
	return (
		<div id="right-aggregator-view">
          	<table className="table table-responsive" id="table-to-xls">
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
						<th>Bill Payment Value</th>
	                    <th>Total Bill Payment</th>
                  	</tr>
             	</thead>
              	<tbody>
		            {
		                performance === null ? null : (performance.length === 0 ? 
							<NoResultFound /> : 
							performance.map((agent, i) => {
								const { agentProfile: { firstName, lastName, terminalId, agentId }, numOfDeposits, numOfWithdrawal, totalDepositAmount, totalWithdrawalAmount, numOfBillPayment, totalBillPaymentAmount } = agent;
			                    return <AgentsPerformanceList 
			                      	agentName={`${firstName} ${lastName}`}
									terminal={terminalId}
									totalDeposits={numOfDeposits}
									totalDepositsValue={totalDepositAmount}
									totalWithdrawals={numOfWithdrawal}
									totalWithdrawalsValue={totalWithdrawalAmount}
									totalBillPayment={numOfBillPayment}
									totalBillPaymentValue={totalBillPaymentAmount}
									AgentId={agentId}
									i={i}
									key={i}
								/>
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