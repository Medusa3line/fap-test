import React, { useState, useEffect, useCallback } from 'react';
import swal from '../../../Utils/alert';
import withTimeout from '../../../Components/HOCs/withTimeout.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import {dashboardUrl, transactionHistoryUrl} from '../../../Utils/baseUrl';
import PrintReceipt from '../../../Utils/print';
import Header from '../../Header/Header';
import Wallets from './Wallet/Wallet';
import Table from './Table';

const Dashboard = () => {
  //Get User Information
  const { auth_token, userName } = JSON.parse(sessionStorage.getItem('userDetails'));

    const [state, setState] = useState({
      userDetails : {},
      balance: {},
      transactions:[],
      totalCount: 1,
      hasNextRecord: false,
      page: 0,
      size: 20,
      searchField: '',
      fromDate: '',
      toDate: '',
      finishedLoading: false
    })
  
  useEffect(() => {
    //Fetching Balance for Dashboard
    fetch(`${dashboardUrl}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify({})
    }).then(response => response.json())
      .then(result => {
        setState( state =>({
          ...state,
          balance: result.respBody.agentWalletDTO
        }))
      })
      .catch(err => {
        swal('An Error Occured', `${err}`, 'error')
      });

    // Fetch Transactions History
    if (sessionStorage.getItem('userDetails')){
      fetchTransactions();
    }
  }, [fetchTransactions, auth_token]) //End of ComponentDidMount

  const fetchTransactions = useCallback(async() =>{
    //Fetch Transaction History
    setState(state => ({ 
      ...state, 
      finishedLoading: false
    }))
    let historyBody = {
      agentName: userName,
      fromDate: state.fromDate,
      toDate: state.toDate,
      page: state.page,
      size: state.size
    };

      await fetch(`${transactionHistoryUrl}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(historyBody)
    }).then(response => response.json())
      .then(transactions => {
        if(transactions.respBody.transactions){
          setState(state => ({
            ...state,
            transactions: transactions.respBody.transactions, 
            totalCount: transactions.respBody.totalCount, 
            hasNextRecord: transactions.respBody.hasNextRecord
          }))
        } else {
          setState(state => ({
            ...state,
            transactions: [], 
            totalCount: 1, 
            hasNextRecord: false
          }))
        }
      })
      .catch(err => {
        swal('Connection Problem', `${err}`, 'error')
      });

    setState(state =>({
      ...state,
      finishedLoading: true
    }))
  }, [auth_token, userName, state])

  const fromDate = async (event) => { 
    const { fromdate } = dateModifier(event) 
    await setState({
      ...state,
      fromDate: fromdate
    })
  }

  const dateModifier = (event) => {
    let date = event.target.value;
    let day = date.slice (8);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let todate = `${day}-${month}-${year}`;
    let fromdate = `${day}-${month}-${year}`;
    return{todate, fromdate}
  }

  const toDate = async (event) => { 
    const { todate } =dateModifier(event) 
    await setState({
      ...state,
      toDate: todate, page: 0
    })
  }

  const showLess = async () => {
    if(state.page > 0){
      await setState({
        ...state,
        page: state.page - 1
      });
      fetchTransactions();
    }
  }

  const showMore = async() => {
    if (state.transactions.length === state.size){
      await setState({
        ...state,
        page: state.page + 1
      });
      fetchTransactions();
    }
  }

  const searchTransactions = async (event) => { await setState({
    ...state,
    searchField: event.target.value
  }) }

  const print = (divName) => {
    PrintReceipt(divName);
  }

    const { page, size, finishedLoading, balance, totalCount, hasNextRecord } = state;
    const transactions = state.transactions.filter(transaction => {
      return (transaction.transactionType.toLowerCase()).includes(state.searchField.toLowerCase())
    });
 
    if (!finishedLoading){
        return <Spinner />
      } else {
        return (
        <div className="body">  
          <div className="container-fluid" style={{padding: '0'}}>  
            <Header />
              <div className="container-fluid" style={{padding: '0'}} id="bottom-content">
                <Wallets 
                  walletBalance={balance.accountBalance} 
                />

                {/* <!-- Table -->             */}
                <div className="container" id="bottom_div" style={{overflowX:'auto'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>  
                      <h4 style={{fontWeight: 'bolder'}}> &nbsp; Transactions History</h4>
                    </div>
                    <div>
                      <h4><button type="button" className="btn" onClick={() => print('table')} id="pad-aggregator-items">Print</button></h4>
                    </div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'auto'}}>
                    <div className="form-group">
                      <select className="form-control" onChange={searchTransactions}  style={{textAlign: 'center'}}>
                        <option value="">All Transactions</option>
                        <option value="deposit">Deposit</option>
                        <option value="recharge">Recharge</option>
                        <option value="bill payment"> Bill Payment</option>
                        <option value="withdrawal">Withdrawal</option>
                      </select>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <form className="form-inline">
                        <div style={{textAlign: 'center'}}>
                          From: <input type="date" style={{width: '60%'}} onChange={fromDate} className="form-control" id="pad-aggregator-items" />
                        </div>
                      </form>
                      <form className="form-inline">
                        <div style={{textAlign: 'center'}}>
                          To: <input type="date" style={{width: '60%'}} onChange={toDate} className="form-control" id="pad-aggregator-items" />
                        </div>
                      </form>
                      <div style={{textAlign: 'center'}}>
                        <h4><button type="button" className="btn btn-success btn-sm" onClick={fetchTransactions}>Filter</button></h4>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div id="table">
                    <Table 
                      transactions={transactions} 
                      showMore={showMore} 
                      showLess={showLess} 
                      page={page} 
                      size={size} 
                      totalCount={totalCount}
                      hasNextRecord={hasNextRecord}
                    />
                  </div>
                </div>
              </div>   
          </div>
        </div>
      );
    } 
}
export default withTimeout(Dashboard);