import React from 'react';
import AllTransactions from './AllTransactions/AllTransactions';
import NoResultFound from '../../../Components/NoResultFound/NoResultfound';

const AgentsTransactions = ({ transactions, showPrintButton }) => {
		return (
			<div className="row" id="print-div">
	            <div id="right-aggregator-view">
	            	<table className="table table-responsive" id="table-to-xls">
		              	<thead>
			                <tr>
								<th>S/N</th>
			                	<th>Agent Name</th>
			                	<th>Trans ID</th>
			                 	<th>Amount</th>
			                	<th>Trans Type</th>
			                  	<th>Status</th>
			                  	<th>Remark</th>
			                  	<th>Date</th>
			                  	<th>Time</th>
			                  	<th>Charge</th>
			                </tr>
		              	</thead>
	                  	<tbody>
	                    {
							transactions === null ? null : (transactions.length === 0 ? 
								<NoResultFound /> : 
		                        transactions.map((agent,i) => {
									return <AllTransactions
									  	i={i} 
			                            agentName={agent.agentId}
			                            tranId={agent.rrn}
			                            amount={agent.minorAmount}
			                            transactionType={agent.tranType.replace(/[_]/g, ' ')}
			                            description={agent.status}
			                            date={agent.dateCreated}
			                            time={agent.dateCreated}
			                            statusdescription={agent.status}
			                            fee={agent.transactionFee}
			                            key={i} 
										agent={agent}
										showPrintButton={showPrintButton}
									/>	
		                            }
		                        )
		                    )
	                    }
	                  	</tbody>
	                </table>
	            </div>
	        </div>
		)
	}	
export default AgentsTransactions;