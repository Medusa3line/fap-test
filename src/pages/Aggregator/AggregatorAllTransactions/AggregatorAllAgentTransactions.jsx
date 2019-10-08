import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import AggregatorHeader from '../AggregatorHeader/AggregatorHeader';
import AgentsTransactions from '../Components/AgentsTransactions';
import SearchComponent from '../Components/SearchComponent';

import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';
import {Link} from 'react-router-dom';
import Spinner from '../../../Components/PreLoader/preLoader';
import swal from '../../../Utils/alert';
import baseUrl from '../../../baseUrl';
import PrintReceipt from '../../../Utils/print';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';

class AggregatorAllAgentTransactions extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      userDetails : {},
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
    await this.setState({userDetails: JSON.parse(sessionStorage.getItem('userDetails'))});
    await this.setState({AgentId: this.props.match.params.agentId})

    let reqBody = {
      page: this.state.page,
      size: this.state.size
    }
    if (this._isMounted){
      this.fetchHistory(reqBody);
    }
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
                      <button className="btn btn-sm" onClick={() => this.props.history.goBack()}> 
                        <i style={{fontSize: '8px'}} className="fa fa-chevron-left"></i> Back
                      </button>
                    </div>
                    <div id="income-wallet-div" style={{overflowX:'auto'}}>
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12" style={{paddingTop: '2vh'}}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div><h4><strong>Transactions History of {AgentId}</strong></h4></div>
                                    </div>
                                    <div className="dropdown" style={{textAlign: 'right'}}>
                                        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" id="pad-aggregator-items">Export <span className="fa fa-chevron-down"></span></button>
                                        <ul className="dropdown-menu dropdown">
                                          <li onClick={() => this.print('print-div')}><Link to="#">PDF</Link></li>
                                          <ExportToExcel />
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
                              showPrintButton="false"
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

export default withTimeout(withRouter(AggregatorAllAgentTransactions));                          