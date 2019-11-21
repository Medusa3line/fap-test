import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import AggregatorHeader from '../AggregatorHeader/AggregatorHeader';
import AgentsTransactions from '../Components/AgentsTransactions';
import SearchComponent from '../Components/SearchComponent';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import swal from '../../../Utils/alert';
import {agentTransactions} from '../../../Utils/baseUrl';
import PrintReceipt from '../../../Utils/print';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';
import './AggregatorAllAgentTransactions.styles.scss';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'))
const AggregatorAllAgentTransactions = () =>  {
    const [ state, setState ] = useState({
      userDetails : {},
      page: 0,
      size: 20,
      fromDate: '',
      toDate: '',
      transactions: [],
      transactionsCount: 1,
      finishedLoading: false,
      hasNextRecord: false,
      searchField: ''
    })

  const fromDate = async (event) => { 
    let date = event.target.value;
    let day = date.slice (8);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let fromdate = `${day}-${month}-${year}`;
    await setState({
      ...state,
      fromDate: fromdate
    })
  }
  const { agentId } = useParams();
  const history = useHistory();

  const toDate = async (event) => { 
    let date = event.target.value;
    let day = date.slice (8);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let todate = `${day}-${month}-${year}`;
    await setState({
      ...state,
      toDate: todate
    })
  }

  const print = (divName) => {
    PrintReceipt(divName);
  }

  const filter = async () => {
    await setState({
      ...state,
      page: 0
    });
    const { fromDate, toDate, page, size } = state;
    if(fromDate === '' || toDate === ''){
      swal('Select Valid Date Range', 'Select the appropriate date range', 'info')
    } else {
      let reqBody = {
        from: fromDate,
        agentId,
        to: toDate,
        page: page,
        size: size
      }

    fetchHistory(reqBody);
  }
}

  const fetchHistory = useCallback(async(reqBody) => {
    setState(state =>({
      ...state,
      finishedLoading: false
    }))

    await fetch(`${agentTransactions}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(result => {
        console.log(result.respBody)
        if(result.respBody){
          setState(state =>({
              ...state,
              transactions: result.respBody.agentTransactions, 
              transactionsCount: result.respBody.totalCount,
              hasNextRecord: result.respBody.hasNextRecord
            }))
        }else {
          setState(state({
            ...state,
            transactions: [],
            transactionsCount: 1,
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
  },[])

  useEffect(() => {
    let reqBody = {
      agentId,
      page: state.page,
      size: state.size
    }
    fetchHistory(reqBody);
  }, [fetchHistory, state.page, state.size, agentId])


  const changeCurrentPage = async (pageNumber) => {
    setState({
      ...state,
      page: pageNumber - 1
    })
  }

  const searchAgents = (event) => {
    setState({
      ...state,
      searchField: event.target.value
    })
  }

    const { page, size, finishedLoading, transactionsCount, hasNextRecord } = state;
    const transactions = state.transactions.filter(transaction => {
        return (transaction.tranType.toLowerCase()).includes(state.searchField.toLowerCase())
      });
  if (!finishedLoading){
        return <Spinner />
      } else {
        return (
          <div className="body">
    				<div className="AggregatorViewcontainer">
          		<AggregatorHeader />
              <div id="main">
              <div id="dashboard-wallet-div">
                    <div id="income-wallet-div">
                      <div id="back-button">
                        <button className="btn btn-sm" onClick={() => history.goBack()}> 
                          <i className="fa fa-chevron-left"></i> Back
                        </button>
                      </div>
                      <div id="upperSection">
                        <div id="top">
                          <div>
                            <h4>
                              <strong>Transactions History of {agentId}</strong>
                            </h4>
                          </div>
                              
                          <div className="dropdown">
                            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" id="pad-aggregator-items">Export <span className="fa fa-chevron-down"></span></button>
                            <ul className="dropdown-menu dropdown">
                              <li onClick={() => print('print-div')}><Link to="#">PDF</Link></li>
                              <ExportToExcel />
                            </ul>
                          </div>
                        </div>
                        <SearchComponent 
                          searchAgents={searchAgents}
                          fromDate={fromDate}
                          toDate={toDate} 
                          filter={filter}
                        />
                      </div>
                      <AgentsTransactions 
                        transactions={transactions}
                        showPrintButton="false"
                      /> 
                      <div id="table-nav-buttons" className="row">
                        <Pagination
                          currentPage={page + 1}
                          totalSize={transactionsCount}
                          sizePerPage={size}
                          changeCurrentPage={changeCurrentPage}
                          numberOfPagesNextToActivePage={2}
                          theme="bootstrap"
                        />
                      </div>
                    </div>
                  </div>
              </div>
    				</div>
    			</div>
        )
      }
}

export default withTimeout(AggregatorAllAgentTransactions);                          