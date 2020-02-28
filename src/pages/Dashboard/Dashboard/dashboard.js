import React, { useState, useEffect, useCallback, useRef } from 'react';
import swal from '../../../Utils/alert';
import withTimeout from '../../../Components/HOCs/withTimeout.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import ReactToPrint from 'react-to-print'
import {dashboardUrl, transactionHistoryUrl} from '../../../Utils/baseUrl';
import Wallets from './Wallet/Wallet';
import Table from './Table/Table';
import './dashboard.styles.scss';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';
import { Link } from 'react-router-dom';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { customPageTitle } from '../../../Utils/customTitle';
import AuthenticatedPagesLayoutWrapper from '../../../Components/AuthenticatedPagesLayoutWrapper/authenticatedPagesLayoutWrapper';

const Dashboard = () => {
  //Get User Information
  const { auth_token, userName } = JSON.parse(sessionStorage.getItem('userDetails'));
  customPageTitle('Dashboard')
  const componentRef = useRef()

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
  }, [fetchTransactions, auth_token, state.size, state.page]) //End of ComponentDidMount

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

  const changeCurrentPage = async (pageNumber) => {
    setState({
      ...state,
      page: pageNumber - 1
    })
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

    const { page, size, finishedLoading, balance, totalCount } = state;
    const transactions = state.transactions.filter(transaction => {
      return (transaction.transactionType.toLowerCase()).includes(state.searchField.toLowerCase())
    });
 
    if (!finishedLoading){
        return <Spinner />
      } else {
        return (
        <AuthenticatedPagesLayoutWrapper>
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
                </button>
                <ul className="dropdown-menu dropdown">
                  <li>
                    <ReactToPrint
                      trigger={() => <Link to="#">PDF</Link>}
                      content={() => componentRef.current}
                    /> 
                  </li>                  
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
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="">All</option>
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
            <div id="table" ref={componentRef}>
              <Table 
                transactions={transactions}
              />
            </div>
            <div id="table-nav-buttons" className="row">
              <Pagination
                currentPage={page + 1}
                totalSize={totalCount}
                sizePerPage={size}
                changeCurrentPage={changeCurrentPage}
                numberOfPagesNextToActivePage={2}
                theme="bootstrap"
              />
            </div>
          </div>
        </AuthenticatedPagesLayoutWrapper>
      );
    } 
}
export default withTimeout(Dashboard);