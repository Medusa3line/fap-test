import React from 'react';
import TransactionsList from './TransactionsList';
import NoResultFound from '../../NoResultfound';

export default React.memo(({transactions, showMore, showLess, page, printReceipt, size, totalCount, hasNextRecord}) => {
  return(
    <div id="dashboard-table">
      <table align="center" className="table table-responsive" style={{width:'100%', color: 'black', textAlign: 'center', position: 'relative'}}>
        <thead> 
          <tr>
            <th>S/N</th>
            <th>Transaction Id</th>
            <th>Amount</th>
            <th>Transaction Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            transactions === null ? null : (transactions.length === 0 ? 
              <NoResultFound /> : 
              transactions.map((transaction,i) => {
              return <TransactionsList transaction={transaction} key={i} printReceipt={printReceipt} transId={transaction.tranId} serialNumber={i} status={transaction.statusdescription} amount={transaction.amount} transType={transaction.transactionType} transDate={transaction.tranDate} />
            })
            ) 
          }
        </tbody>
      </table> 
      <div id="table-nav-buttons" className="row">
        {
          page > 0 ? 
          <button className="btn btn-success btn-xs" onClick={showLess}>
            Previous
          </button>
          : null
        }
        
        <h6> Page { page + 1 } of { Math.ceil(totalCount/size) } </h6>
        {
          hasNextRecord ? 
          <button className="btn btn-success btn-xs" onClick={showMore}>
            Next
          </button>
          : null
        }
      </div>       
    </div>
  )
});