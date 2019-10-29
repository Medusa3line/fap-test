import React, { useState, useEffect, useCallback } from 'react';
import swal from '../../../Utils/alert';
import withTimeout from '../../../Components/HOCs/withTimeout.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import {dashboardUrl, transactionHistoryUrl} from '../../../Utils/baseUrl';
import PrintReceipt from '../../../Utils/print';
import Header from '../../Header/Header';
import Wallets from './Wallet/Wallet';
import Table from './Table/Table';
import './dashboard.styles.scss';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';
import { Link } from 'react-router-dom';
import Pagination from '../../../Components/Pagination/Pagination.component';
import { customPageTitle } from '../../../Utils/customTitle';

const Dashboard = () => {
  //Get User Information
  const { auth_token, userName } = JSON.parse(sessionStorage.getItem('userDetails'));
  customPageTitle('Dashboard')

    const [state, setState] = useState({
      userDetails : {},
      balance: {},
      transactions:[],
      totalCount: 1,
      hasNextRecord: false,
      page: 0,
      size: 10,
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
      fetchTransactions();
  }, [fetchTransactions, auth_token, state.size]) //End of ComponentDidMount

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
    const { todate } = dateModifier(event) 
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

  const increasePageCount = async(event) => { 
    if(event.target.value === ''){
      await setState({
        ...state,
        size: state.totalCount,
      })
    } else {
      await setState({
        ...state,
        size: event.target.value,
      })
    }
  }

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
          <div className="container-fluid">  
            <Header />
              <div id="bottom-content">
                <Wallets 
                  walletBalance={balance.accountBalance} 
                />

                {/* <!-- Table -->             */}
                <div className="container" id="bottom_div">
                  <div id="top-layer">
                    <div>  
                      <h4> &nbsp; Transactions History</h4>
                    </div>
                    <div>
                      <button 
                        type="button" 
                        className="btn dropdown-toggle" 
                        data-toggle="dropdown" 
                        id="pad-aggregator-items"
                      > Export 
                        <span className="fa fa-chevron-down"></span>
                      </button>
                      <ul className="dropdown-menu dropdown">
                        <li onClick={() => print('table')} id="pad-aggregator-items"><Link to="#">PDF</Link></li>
                        <ExportToExcel />
                      </ul>
                    </div>
                  </div>
                  <div id="bottom-layer">
                    <div className="form-group" id="bottom-layer-left">
                      <select className="form-control" onChange={searchTransactions}>
                        <option value="">All Transactions</option>
                        <option value="deposit">Deposit</option>
                        <option value="recharge">Recharge</option>
                        <option value="bill payment"> Bill Payment</option>
                        <option value="withdrawal">Withdrawal</option>
                      </select>
                    </div>
                    <div className="form-group" id="bottom-layer-left">
                      <select className="form-control" onChange={increasePageCount} value={size}>
                        <option value="10">10 Results</option>
                        <option value="20">20 Results</option>
                        <option value="50">50 Results</option>
                        <option value="100">100 Results</option>
                        <option value="">All Results</option>
                      </select>
                    </div>
                    <div id="bottom-layer-right">
                      <div className="form-inline">
                        From: <input type="date" onChange={fromDate} className="form-control" id="pad-aggregator-items" />
                      </div>
                      <div className="form-inline">
                        To: <input type="date" onChange={toDate} className="form-control" id="pad-aggregator-items" />
                      </div>
                      <div>
                        <h4><button type="button" className="btn btn-sm" onClick={fetchTransactions}>Filter</button></h4>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div id="table">
                    <Table 
                      transactions={transactions}
                    />
                  </div>
                  <Pagination 
                    showLess={showLess}
                    totalCount={totalCount} 
                    showMore={showMore} 
                    size={size} 
                    page={page}
                    hasNextRecord={hasNextRecord}
                  />
                </div>
              </div>   
          </div>
        </div>
      );
    } 
}
export default withTimeout(Dashboard);