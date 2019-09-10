import React, {Component} from 'react';
import AggregatorHeader from './AggregatorHeader';
import AgentsTransactions from './AgentsTransactions';
import SearchComponent from './SearchComponent';

import {Link} from 'react-router-dom';
import Spinner from '../../preLoader';
import swal from 'sweetalert';
import baseUrl from '../../baseUrl';
import {TimeOut} from '../../timeOut';
import PrintReceipt from '../../print';

class AggregatorAllAgentTransactions extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      userDetails : {},
      redirect: false,
      AgentId: '',
      page: 0,
      size: 20,
      fromDate: '',
      toDate: '',
      transactions: [],
      transactionsCount: 1,
      finishedLoading: false,
      hasNextRecord: false,
      searchField: ''
    }
  }
  
// For Setting Time Out
clearTimeoutFunc = () => { if (this.logoutTimeout) {clearTimeout(this.logoutTimeout)}; };
setTimeout = () => { this.logoutTimeout = setTimeout(this.logout, TimeOut); };
resetTimeout = () => { this.clearTimeoutFunc(); this.setTimeout(); };
logout = () => { localStorage.clear(); if(this._isMounted){ this.props.history.push("/"); alert('Your session timed out'); } };

// Cancelling subscriptions
componentWillUnmount(){
  this._isMounted = false;
}

    fromDate = async (event) => { 
    let date = event.target.value;
    let day = date.slice (8);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let fromdate = `${day}-${month}-${year}`;
    await this.setState({fromDate: fromdate})
  }

  toDate = async (event) => { 
    let date = event.target.value;
    let day = date.slice (8);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let todate = `${day}-${month}-${year}`;
    await this.setState({toDate: todate})
  }

  print = (divName) => {
    PrintReceipt(divName);
  }

  filter = async () => {
    await this.setState({page: 0});
    const { fromDate, toDate, page, size } = this.state;
    if(fromDate === '' || toDate === ''){
      swal('Select Valid Date Range', 'Select the appropriate date range', 'info')
    } else {
      let reqBody = {
        from: fromDate,
        to: toDate,
        page: page,
        size: size
      }

    this.fetchHistory(reqBody);
  }
}

  fetchHistory = async (reqBody) => {
    let auth_token = this.state.userDetails.auth_token;
    this.setState({ finishedLoading: false})

    await fetch(`${baseUrl}/transactions/agenttransactions/${this.state.AgentId}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(result => {
        // console.log(result)
        if(result.respBody){
            this.setState({
              transactions: result.respBody.transactions, 
              transactionsCount: result.respBody.totalCount,
              hasNextRecord: result.respBody.hasNextRecord
            })
        }else {
          this.setState({transactions: [], transactionsCount: 1, hasNextRecord: false})
        }
      })
      .catch(err => {
        swal('Connection Problem', 'There was an error while fetching transactions, please check your network connection', 'info')
      });
      this.setState({ finishedLoading: true})
  }

  componentDidMount = async() => {
    this._isMounted = true;
    if(!localStorage.getItem('userDetails')){
      this.setState({redirect: true})
    }
    await this.setState({userDetails: JSON.parse(localStorage.getItem('userDetails'))});
    await this.setState({AgentId: this.props.match.params.agentId})

    let reqBody = {
      page: this.state.page,
      size: this.state.size
    }
    this.fetchHistory(reqBody);

      // Handling timeout when there is no event
     this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    for (var i in this.events) { window.addEventListener(this.events[i], this.resetTimeout); } 
    this.setTimeout(); //End of Timeout handling
  }


showLessTransactions = async () => {
    if(this.state.page > 0){
        await this.setState({page: this.state.page - 1});
        let reqBody = {
            page: this.state.page,
            size: this.state.size
        }
        this.fetchHistory(reqBody);
    }
}

showMoreTransactions = async() => {
    if (this.state.transactions.length === this.state.size){
        await this.setState({page: this.state.page + 1});
        let reqBody = {
            page: this.state.page,
            size: this.state.size
        }
        this.fetchHistory(reqBody);
    }
}
searchAgents = (event) => { this.setState({searchField: event.target.value}) }

  render(){
    const { page, AgentId, size, finishedLoading, transactionsCount, hasNextRecord } = this.state;
    const transactions = this.state.transactions.filter(transaction => {
        return (transaction.agentName.toLowerCase()).includes(this.state.searchField.toLowerCase())
      });
    if (this.state.redirect){
        this.props.history.push("/");   
    }
  if (!finishedLoading){
        return <Spinner />
      } else {
        return (
          <div className="body">
            <div className="container-fluid" style={{padding: '0', backgroundColor: '#f3f3f3'}}>
              <AggregatorHeader />
                <div id="main">
                  <div className="row" id="aggregator-container">
                    <div className="row" style={{marginLeft: '0'}} id="back-button">
                        <Link to={`/viewAgent/${AgentId}`}>
                        <button className="btn btn-sm"> <i style={{fontSize: '8px'}} className="fa fa-chevron-left"></i> Back</button>
                        </Link>
                    </div>
                    <div id="income-wallet-div" style={{overflowX:'auto'}}>
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12" style={{paddingTop: '2vh'}}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div><h4><strong>All transactions History of {AgentId}</strong></h4></div>
                                    </div>
                                    <div className="dropdown" style={{textAlign: 'right'}}>
                                        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" id="pad-aggregator-items">Export <span className="fa fa-chevron-down"></span></button>
                                        <ul className="dropdown-menu dropdown">
                                        <li onClick={() => this.print('print-div')}><Link to="#">PDF</Link></li>
                                        </ul>
                                    </div>
                            </div><br/>
                            <SearchComponent 
                                searchAgents={this.searchAgents}
                                fromDate={this.fromDate}
                                toDate={this.toDate} 
                                filter={this.filter}
                            />
                            </div>                       
                        </div>
                            <AgentsTransactions 
                              transactions={transactions} 
                              page={page}
                              size={size}
                              showLessTransactions={this.showLessTransactions}
                              showMoreTransactions={this.showMoreTransactions}
                              transactionsCount={transactionsCount}
                              hasNextRecord={hasNextRecord}
                            /> 
                    </div>
                  </div>
                </div>
            </div>
          </div>
        )
      }
  }
}

export default AggregatorAllAgentTransactions;                          