import React from 'react';
import AllTransactions from './AllTransactions';
import NoResultFound from '../../../Components/NoResultFound/NoResultfound';

const AgentsTransactions = ({ transactions, page, size, showLessTransactions, showMoreTransactions, transactionsCount, hasNextRecord, showPrintButton }) => {
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
			                            agentName={agent.agentName}
			                            tranId={agent.tranId}
			                            amount={agent.amount}
			                            transactionType={agent.transactionType}
			                            description={agent.description}
			                            date={agent.tranDate}
			                            time={agent.tranDate}
			                            statusdescription={agent.statusdescription}
			                            fee={agent.fee}
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
	                <div id="table-nav-buttons" className="row">
	                  {
	                    page > 0 ? 
	                    <button className="btn btn-success btn-xs" onClick={showLessTransactions}>
	                      Prev
	                    </button>
	                    : null
	                  }
	                  <h6> Page { page + 1 } of { Math.ceil(transactionsCount/size) } </h6>
	                  {
	                    hasNextRecord ? 
	                    <button className="btn btn-success btn-xs" onClick={showMoreTransactions}>
	                      Next
	                    </button>
	                    : null
	                  }
	                </div>
	            </div>
	        </div>
		)
	}	
export default AgentsTransactions;