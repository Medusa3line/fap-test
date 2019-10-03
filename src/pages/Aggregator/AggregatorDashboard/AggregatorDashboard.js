import React, { Component } from 'react';
import swal from 'sweetalert';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';
import AgentsPerformance from './AgentsPerformance';
import AgentsTransactions from '../Components/AgentsTransactions';
import SearchComponent from '../Components/SearchComponent';
import './AggregatorDashboard.styles.scss'

import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import {Link} from 'react-router-dom';
import baseUrl from '../../../baseUrl';
import PrintReceipt from '../../../print';
import SwitchButton from '../Components/SwitchButton/SwitchButton';
import AggregatorHeader from '../AggregatorHeader/AggregatorHeader';
import AggregatorStatistics from '../Components/AggregatorStatistics/AggregatorStatistics';

class AggregatorDashboard extends Component{
    _isMounted = false;
    today = new Date();
    todaysDate = this.today.getDate()+'-'+(this.today.getMonth()+1).toString().padStart(2, '0')+'-'+this.today.getFullYear();
    constructor(){
    super()
    this.state = {
      userDetails : {},
      dailyStats: {},
      totalStats: {},
      page: 0,
      size: 20,
      fromDate: '01-01-2012',
      fromDateTransactions: '01-01-2012', 
      toDate: this.todaysDate,
      toDateTransactions: this.todaysDate,
      transactions: [],
      transactionsCount: '',
      hasNextRecord: false,
      performance: [],
      searchField: '',
      searchFieldTransactions: '',
      showMore: true,
      finishedLoading: false,
      agentsPerformanceTitle: true,
      showAgentsPerformance: true
    }
  }

print = (divName) => {
    PrintReceipt(divName);
  }

  fromDate = async (event) => { 
    const { fromdate } = this.dateModifier(event)
    await this.setState({fromDate: fromdate})
  }
  fromDateTransactions = async (event) => { 
    const { fromdate } = this.dateModifier(event)  
    await this.setState({fromDateTransactions: fromdate})
  }

  toDate = async (event) => { 
    const { todate } = this.dateModifier(event)
    await this.setState({toDate: todate})
  }
  toDateTransactions = async (event) => { 
    const { todate } = this.dateModifier(event)
    await this.setState({toDateTransactions: todate})
  }

  dateModifier = (event) => {
    let date = event.target.value;
    let day = date.slice (8);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let todate = `${day}-${month}-${year}`;
    let fromdate = `${day}-${month}-${year}`;
    return{todate, fromdate}
  }

  filterPerformance = async () => {
    const { fromDate, toDate } = this.state;
    if(fromDate === '' || toDate === ''){
      swal('Select Valid Date Range', 'Select the appropriate date range', 'info')
    } else {
      this.getPerformance()
    }
}

getTransactions = async() => {
  const { page, size, toDateTransactions, fromDateTransactions } = this.state;
  let reqBody = {
    agentName: "",
    fromDate: fromDateTransactions,
    page: page,
    size: size,
    toDate: toDateTransactions,
    tranType: ""
  }
  
  let auth_token = this.state.userDetails.auth_token;
  await fetch(`${baseUrl}/transactions/agenttransactions/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    },
    body: JSON.stringify(reqBody)
  }).then(response => response.json())
    .then(transactions => {
      if (transactions.respBody.transactions && transactions.respBody.totalCount){
        this.setState({
          transactions: transactions.respBody.transactions, 
          transactionsCount: transactions.respBody.totalCount,
          hasNextRecord: transactions.respBodyhasNextRecord
        })
      }else {
        this.setState({transactions: [], transactionsCount: 1, hasNextRecord: false})
      }
    })
    .catch(err => {
      swal('Error', `${err}`, 'error')
    });
}

getPerformance = async () => {
  // Fetch Performance List
  const { fromDate, toDate } = this.state;
  let reqBody = {
    from: fromDate,
    to: toDate
  }
  const auth_token = this.state.userDetails.auth_token;

  await fetch(`${baseUrl}/aggregator/agent_performance/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    },
    body: JSON.stringify(reqBody)
  }).then(response => response.json())
    .then(performance => {
      this.setState({performance: performance.respBody})
    })
    .catch(err => {
      swal('Error', `${err}`, 'info')
    });
}

  filterTransactions = async () => {
    const { fromDateTransactions, toDateTransactions, } = this.state;
    if(fromDateTransactions === '' || toDateTransactions === ''){
      swal('Select Valid Date Range', 'Select the appropriate date range', 'info')
    } else {
      this.getTransactions()
  }
}

// Fetch All Agents Transactions
fetchTransactions = async () => {
  this.getTransactions()
} 

showMore = () => {this.setState({showMore: !this.state.showMore})}

componentDidMount = async () => {
    this._isMounted = true;
        await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    }) 

    if (this._isMounted){
      let reqBody = { }
      let auth_token = this.state.userDetails.auth_token;

      this.setState({ finishedLoading: false})

  // Fetch Dashboard Statistics
      await fetch(`${baseUrl}/aggregator/dashboard`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        },
        body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(aggregatorDetails => {
            this.setState({dailyStats: aggregatorDetails.currentStats})
            this.setState({totalStats: aggregatorDetails.totalDaysStats})
            this.setState({agentsList: aggregatorDetails.agentPerformances})
          })
          .catch(err => {
            swal('Error', 'An Error Occured while fetching dashboard details, please try again', 'info')
          });
        
        //Fetch Agent Performance
        this.getPerformance();

        //Fetch Transactions as well
        this.fetchTransactions();
        
        this.setState({ finishedLoading: true})
    }

    
} // End of componentDidMount

  searchAgents = (event) => { this.setState({searchField: event.target.value}) }
  searchAgentsTransactions = (event) => { this.setState({searchFieldTransactions: event.target.value}) }

  showAgentsPerformance = async (value) => {
    await this.setState({showAgentsPerformance: value, agentsPerformanceTitle: value})
    if(value !== this.state.showAgentsPerformance){
      await this.setState({fromDate: '01-01-2012', toDate: this.todaysDate, searchField: ''})
    }
  }

  showLessTransactions = async () => {
    if(this.state.page > 0){
      await this.setState({page: this.state.page - 1});
      this.fetchTransactions();
    }
  }

  showMoreTransactions = async() => {
    if (this.state.transactions.length === this.state.size){
      await this.setState({page: this.state.page + 1});
      this.fetchTransactions();
    }
  }

  render(){
    const { totalStats, dailyStats, showMore, finishedLoading, agentsPerformanceTitle, showAgentsPerformance, page, size, transactionsCount, hasNextRecord } = this.state;
    const performance = this.state.performance.filter(agentPerformance => {
      return (agentPerformance.agentName.toLowerCase()).includes(this.state.searchField.toLowerCase())
    });
    const transactions = this.state.transactions.filter(transaction => {
      return (transaction.agentName.toLowerCase()).includes(this.state.searchFieldTransactions.toLowerCase())
    });
      if (!finishedLoading){
        return <Spinner />
      } else {
          return(
            <div className="body">
              <div style={{backgroundColor: '#f3f3f3'}}>
                <AggregatorHeader />
                <div id="main">
                <div style={{width: '100%'}}>
                  <div>
                    <SwitchButton showMore={this.showMore} />
                    {
                      showMore ? 
                        <React.Fragment>
                          <AggregatorStatistics stats={totalStats} />
                          <AggregatorStatistics stats={dailyStats} />
                        </React.Fragment>
                        : null
                    }
                    <div id="dashboard-wallet-div">
                      <div>
                        <div className="toggleAgentPerformance">
                          {
                            !agentsPerformanceTitle ? 
                              <button className="btn btn-xs btn-primary" onClick={() => this.showAgentsPerformance(true)}>Show Agents Performance</button> 
                              : 
                              <button className="btn btn-xs btn-primary" onClick={() => {this.showAgentsPerformance(false); this.fetchTransactions()}}>
                                Show My Transactions
                              </button>
                          }                                  
                        </div>
                        <div className="row" style={{paddingTop: '2vh'}}>
                          <div className="col-lg-6"><h4><strong>{agentsPerformanceTitle ? 'Agents Performance' : 'My Transactions'}</strong></h4></div>
                          <div className="dropdown" style={{textAlign: 'right'}}>
                              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" id="pad-aggregator-items">Export <span style={{fontSize: '8px'}} className="fa fa-chevron-down"></span></button>
                              <ul className="dropdown-menu dropdown">
                                <li onClick={() => this.print('right-aggregator-view')}><Link to="#">PDF</Link></li>
                                <ExportToExcel />
                              </ul>
                          </div>
                        </div><br/>
                          
                          <React.Fragment>
                          {
                            showAgentsPerformance ? 
                            <React.Fragment>
                              <SearchComponent 
                                searchAgents={this.searchAgents}
                                fromDate={this.fromDate}
                                toDate={this.toDate} 
                                filter={this.filterPerformance}
                              />
                              <AgentsPerformance 
                                performance={performance}  
                              />
                            </React.Fragment>
                              :
                            <React.Fragment>
                              <SearchComponent 
                                searchAgents={this.searchAgentsTransactions}
                                fromDate={this.fromDateTransactions}
                                toDate={this.toDateTransactions} 
                                filter={this.filterTransactions}
                              />
                              <AgentsTransactions 
                                transactions={transactions} 
                                page={page}
                                size={size}
                                showLessTransactions={this.showLessTransactions}
                                showMoreTransactions={this.showMoreTransactions}
                                transactionsCount={transactionsCount}
                                hasNextRecord={hasNextRecord}                                   
                                showPrintButton="true"
                              />
                            </React.Fragment>                                    
                          }
                        </React.Fragment>   
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
export default withTimeout(AggregatorDashboard);