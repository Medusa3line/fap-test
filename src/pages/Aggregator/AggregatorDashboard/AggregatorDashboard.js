import React, { Component } from 'react';
import swal from '../../../Utils/alert';
import ExportToExcel from '../../../Components/ExportToExcel/ExportToExcel';
import AgentsPerformance from './AgentsPerformance';
import SearchComponent from '../Components/SearchComponent';
import './AggregatorDashboard.styles.scss'
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import ReactToPrint from 'react-to-print'

import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import {Link} from 'react-router-dom';
import { dashboardDetails, agentsList } from '../../../Utils/baseUrl';
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
    size: 20,
    totalSize: 0,
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
      this.setState({ 
        performance: performance.respBody.subAgentDetails.dashboardDetails,
        totalSize: performance.respBody.totalCount
      })
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
  changeCurrentPage = async (pageNumber) => {
    await this.setState({
      page: pageNumber - 1
    })
    await this.getPerformance()
  }

  render(){
    const { stats, showMore, finishedLoading, page, size, totalSize } = this.state;
    let { performance } = this.state;
    performance = performance.filter(agentPerformance => {
      return (agentPerformance.agentProfile.userName.toLowerCase()).includes(this.state.searchField.toLowerCase())
    });
      if (!finishedLoading){
        return <Spinner />
      }
      
      return(
        <div className="body">
          <div id="mainWrapper">
            <AggregatorHeader />
            <div id="main">
              <div id="wrapper">
                <div id="topPart">
                  <SwitchButton showMore={this.showMore} />
                </div>
                {
                  showMore ? 
                    <React.Fragment>
                      <TotalAggregatorStatistics stats={stats} />
                      <TodayAggregatorStatistics stats={stats} />
                    </React.Fragment>
                    : null
                }
                <div className="m-0 d-flex position-relative overflow-auto mb-1 mt-2" id="dashboard-wallet-div" ref={el => (this.componentRef = el)}>
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="toggleAgentPerformance">
                      <div className="col-lg-6"><h4><strong>Agents Performance</strong></h4></div>
                    </div>
                    
                    <div style={{paddingTop: '2vh'}} className="mb-4">
                      <div className="dropdown" style={{float: 'right'}}>
                          <button type="button" className="btn btn-danger  dropdown-toggle" data-toggle="dropdown" id="pad-aggregator-items">Export </button>
                          <ul className="dropdown-menu dropdown">
                            <li>                                    
                              <ReactToPrint
                                trigger={() => <Link to="#">PDF</Link>}
                                content={() => this.componentRef}
                              />                                    
                            </li>
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
                      <div id="table-nav-buttons" className="row">
                        <Pagination
                          currentPage={page + 1}
                          totalSize={totalSize}
                          sizePerPage={size}
                          changeCurrentPage={this.changeCurrentPage}
                          numberOfPagesNextToActivePage={2}
                          theme="bootstrap"
                        />
                      </div>
                    </React.Fragment>   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}
export default withTimeout(AggregatorDashboard);