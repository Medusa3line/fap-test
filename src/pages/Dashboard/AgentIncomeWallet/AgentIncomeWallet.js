import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import AgentsAllTransactionsList from '../AgentsAllTransactionsList';
import Header from '../../Header/Header';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

import NoResultFound from '../../../Components/NoResultFound/NoResultfound';
import Spinner from '../../../Components/PreLoader/preLoader';
import baseUrl from '../../../baseUrl';
import withTimeout from '../../../Components/HOCs/withTimeout.hoc';
import PrintReceipt from '../../../print';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';

class AgentIncomeWallet extends Component {
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
      totalCount: 0,
      finishedLoading: false
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
    await this.setState({page: 0})
    const { fromDate, toDate } = this.state;
    if(fromDate === '' || toDate === ''){
      swal('Select Valid Date Range', 'Select the appropriate date range', 'info')
    } else {
      let reqBody = {
        from: this.state.fromDate,
        to: this.state.toDate,
        page: this.state.page,
        size: this.state.size
      }
      this.fetchHistory(reqBody);
      }  
  }

  fetchHistory = async (reqBody) => {
    let auth_token = this.state.userDetails.auth_token;
    this.setState({ finishedLoading: false})

    await fetch(`${baseUrl}/wallet/walletHistory/income`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(allAgentsDetails => {
        if(allAgentsDetails.respBody){
          this.setState({transactions: allAgentsDetails.respBody})
        }else {
          this.setState({transactions: []})
        }
      })
      .catch(err => {
        swal('Connection Problem', 'There was an error while fetching transactions, please check your network connection', 'info')
      });
      this.setState({ finishedLoading: true})
  }

  componentDidMount = async() => {
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails')),
      AgentId: this.props.match.params.agentId
    })

    let reqBody = {
      page: this.state.page,
      size: this.state.size
    }

    if (sessionStorage.getItem('userDetails')){
      this.fetchHistory(reqBody);
    }
    
  }

  showLess = async () => {
    if(this.state.page > 0){
      await this.setState({page: this.state.page - 1});
      let reqBody={
        page: this.state.page,
        size: this.state.size
      }
      this.fetchHistory(reqBody);
    }
  }

  showMore = async() => {
    if (this.state.transactions.length === this.state.size){
      await this.setState({page: this.state.page + 1});
      let reqBody={
        page: this.state.page,
        size: this.state.size
      }
      this.fetchHistory(reqBody);
    }
  }

  render(){
    const { transactions, page, size, finishedLoading } = this.state;

  if (!finishedLoading){
        return <Spinner />
      } else {
        return (
          <div className="body">
            <div className="container-fluid" style={{padding: '0', backgroundColor: '#f3f3f3'}}>
              <Header />
              <div  className="container">
                <div className="row" id="aggregator-container">
                  <div className="row" style={{marginLeft: '0'}} id="back-button">
                    <button className="btn btn-sm" onClick={() => this.props.history.goBack()}> 
                      <i style={{fontSize: '8px'}} className="fa fa-chevron-left"></i> Back
                    </button>
                  </div>
                    <div id="income-wallet-div">
                      <div className="row">
                        <div className="col-lg-12 col-sm-12 col-md-12" style={{paddingTop: '2vh'}}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="col-lg-6"><h4><strong>Income Wallet</strong></h4></div>
                            </div>
                            <div className="dropdown" style={{textAlign: 'right'}}>
                              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" id="pad-aggregator-items">Export <span className="fa fa-chevron-down"></span></button>
                              <ul className="dropdown-menu dropdown">
                                <li onClick={() => this.print('print-div')}><Link to="#">PDF</Link></li>
                                <ExportToExcel />
                              </ul>
                            </div>
                          </div><br/>
                        </div>

                        <div id="income-wallet-topRight" className="form-inline">
                          <label id="pad-aggregator-items">Select Date Range </label>
                          <input type="date" onChange={this.fromDate} className="form-control" id="pad-aggregator-items" />
                          <label id="pad-aggregator-items">To </label>
                          <input type="date" onChange={this.toDate} className="form-control" id="pad-aggregator-items" />
                          <button type="button" onClick={this.filter} className="btn btn-success" id="pad-aggregator-items">Filter</button>
                        </div>

                      </div>
                    <div className="row" id="print-div">
                      <div id="right-aggregator-view" style={{overflowX:'auto'}}>
                        <table className="table table-responsive" id="table-to-xls">
                            <thead>
                              <tr>
                                <th>S/N</th>
                                <th>Trans ID</th>
                                <th>Amount</th>
                                <th>Trans Type</th>
                                <th>Remark</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Balance Before</th>
                                <th>Balance After</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                 transactions === null ? null : (transactions.length === 0 ? 
                                  <NoResultFound /> : 
                                  transactions.map((agent,i) => {
                                    return <AgentsAllTransactionsList
                                      transId={agent.tranID}
                                      amount={agent.amount}
                                      transactionType={agent.tranType}
                                      remark={agent.remark}
                                      date={agent.tranDate}
                                      time={agent.tranDate}
                                      balanceBefore={agent.balanceBefore}
                                      balanceAfter={agent.balanceAfter}
                                      i={i}
                                      key={i} />
                                      }
                                    )
                                    )
                              }
                            </tbody>
                          </table>
                          <div id="table-nav-buttons" className="row">
                            {
                              page > 0 ? 
                              <button className="btn btn-success btn-xs" onClick={this.showLess}>
                                Prev
                              </button>
                              : null
                            }
                            <h6> Page { page + 1 } </h6>
                            {
                              transactions.length === size ? 
                              <button className="btn btn-success btn-xs" onClick={this.showMore}>
                                Next
                              </button>
                              : null
                            }
                          </div>
                        </div>
                      </div>
                    </div> 
                </div>
              </div>
            </div>
          </div>
        )
      }
  }
}

export default withTimeout(withRouter(AgentIncomeWallet));                       