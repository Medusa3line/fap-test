import React, { Component } from 'react';
import swal from '../../../Utils/alert';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';
import AgentsPerformance from './AgentsPerformance';
import SearchComponent from '../Components/SearchComponent';
import './AggregatorDashboard.styles.scss'

import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import {Link} from 'react-router-dom';
import { dashboardDetails, agentsList } from '../../../Utils/baseUrl';
import PrintReceipt from '../../../Utils/print';
import SwitchButton from '../Components/SwitchButton/SwitchButton';
import AggregatorHeader from '../AggregatorHeader/AggregatorHeader';
import TotalAggregatorStatistics from '../Components/AggregatorStatistics/TotalAggregatorStatistics';
import TodayAggregatorStatistics from '../Components/AggregatorStatistics/TodayAggregatorStatistics';

const { auth_token, username } = JSON.parse(sessionStorage.getItem('userDetails'));
const today = new Date();
const todaysDate = today.getDate()+'-'+(today.getMonth()+1).toString().padStart(2, '0')+'-'+today.getFullYear();

class AggregatorDashboard extends Component{
  _isMounted = false;

  state = {
    stats: {},
    page: 0,
    size: 5,
    fromDate: '01-01-2012',
    fromDateTransactions: '01-01-2012', 
    toDate: todaysDate,
    toDateTransactions: todaysDate,
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
      swal('Select Valid Date Range', 'Select a valid date range', 'info')
    } else {
      this.getPerformance()
    }
}

getPerformance = async () => {
  // Fetch Performance List
  const { fromDate, toDate, size, page } = this.state;
  let reqBody = {
    from: fromDate,
    to: toDate,
    agentId: username,
    pageNumber: page,
    pageSize: size
  }
  await fetch(`${agentsList}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    },
    body: JSON.stringify(reqBody)
  }).then(response => response.json())
    .then(performance => {
      // console.log(performance.respBody, 'performance')
      this.setState({ performance: performance.respBody.subAgentDetails.dashboardDetails})
    })
    .catch(err => {
      swal('Error', `${err}`, 'error')
    });
}


showMore = () => {this.setState({showMore: !this.state.showMore})}

componentDidMount = async () => {
  this._isMounted = true;

  if (this._isMounted){
    let reqBody = {
      agentId: username
    }
    this.setState({ finishedLoading: false})

  // Fetch Dashboard Statistics
    await fetch(`${dashboardDetails}`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
      }).then(response => response.json())
        .then(aggregatorDetails => {
          this.setState({
            stats: aggregatorDetails.respBody
          })
        })
        .catch(err => {
          swal('Error', `${err}`, 'error')
        });
      
      //Fetch Agent Performance
      this.getPerformance();
      
      this.setState({ finishedLoading: true})
  }   
} // End of componentDidMount

  searchAgents = (event) => { this.setState({searchField: event.target.value}) }

  render(){
    const { stats, showMore, finishedLoading } = this.state;
    let { performance } = this.state;
    performance = performance.filter(agentPerformance => {
      return (agentPerformance.agentProfile.userName.toLowerCase()).includes(this.state.searchField.toLowerCase())
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
                          <TotalAggregatorStatistics stats={stats} />
                          <TodayAggregatorStatistics stats={stats} />
                        </React.Fragment>
                        : null
                    }
                    <div id="dashboard-wallet-div">
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="row" style={{paddingTop: '2vh'}}>
                          <div className="col-lg-6"><h4><strong>Agents Performance</strong></h4></div>
                          <div className="dropdown" style={{textAlign: 'right'}}>
                            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" id="pad-aggregator-items">Export <span style={{fontSize: '8px'}} className="fa fa-chevron-down"></span></button>
                            <ul className="dropdown-menu dropdown">
                              <li onClick={() => PrintReceipt('right-aggregator-view')}><Link to="#">PDF</Link></li>
                              <ExportToExcel />
                            </ul>
                          </div>
                        </div><br/>
                          
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