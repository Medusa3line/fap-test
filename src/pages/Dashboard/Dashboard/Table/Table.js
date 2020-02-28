import React from 'react';
import TransactionsList from '../TransactionsList/TransactionsList';
import NoResultFound from '../../../../Components/NoResultFound/NoResultfound';
import './Table.styles.scss';

export default React.memo(({transactions}) => {
  return(
    <div id="dashboard-table" className="overflow-auto">
      <table id="table-to-xls" className="table text-center position-relative w-100 text-black">
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
              return (
                <TransactionsList 
                  transaction={transaction} 
                  key={i}  
                  transId={transaction.tranId} 
                  serialNumber={i} 
                  status={transaction.status} 
                  amount={transaction.amount} 
                  transType={transaction.transactionType} 
                  transDate={transaction.tranDate} 
                />)
            })
            ) 
          }
        </tbody>
      </table>       
    </div>
  )
});