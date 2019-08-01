import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AggregatorHeader from './AggregatorHeader';

import Spinner from '../../preLoader';
import baseUrl from '../../baseUrl';
import {TimeOut} from '../../timeOut';
import swal from 'sweetalert';

class AggregatorView extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      userDetails : {},
      AgentId: '',
      agentDetails: {},
      incomeWalletDetails: {},
      tradingWalletDetails: {},
      totalStats: {},
      dailyStats: {},
      redirect: false,
      finishedLoading: false
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

  componentDidMount = async () => {
    this._isMounted = true;
    if(!localStorage.getItem('userDetails')){
      this.setState({redirect: true})
    }

    await localStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(localStorage.getItem('userDetails'))
    })

   let reqBody = {};
    let auth_token = this.state.userDetails.auth_token;

      this.setState({ finishedLoading: false})
      await fetch(`${baseUrl}/aggregator/dashboard/${this.props.match.params.agentId}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(result => {
        this.setState({agentDetails: result.respBody.agent})
        this.setState({incomeWalletDetails: result.respBody.walletStatsDTO.incomeWalletDTO})
        this.setState({tradingWalletDetails: result.respBody.walletStatsDTO.tradingWalletDTO})
        this.setState({totalStats: result.respBody.totalDaysStats})
        this.setState({dailyStats: result.respBody.currentStats})
        } 
      )
      .catch(err => {
        swal('Error', 'An Error Occured while fetching details for this dashboard, please try again', 'info')
      });
      this.setState({ finishedLoading: true})

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

	render(){
    const { agentDetails, incomeWalletDetails, tradingWalletDetails, totalStats, dailyStats, finishedLoading } = this.state;
    if (this.state.redirect){
      this.props.history.push("/");   
  }
    if (!finishedLoading){
        return <Spinner />
      } else {
    		return (
    			<div className="body">
    				<div className="container-fluid" style={{padding: '0', backgroundColor: '#f3f3f3', boxSizing: 'border-box'}}>
          		<AggregatorHeader />
                <div id="main">
                	<div className="row" id="aggregator-container">
                    <div className="row" id="back-button">
                      <Link to="/aggregator">
                        <button className="btn btn-sm"> 
                          <i style={{fontSize: '8px'}} className="fa fa-chevron-left"></i> 
                            Back
                          </button>
                        </Link>
                      </div>
                		<div className="col-lg-6 col-md-12 col-sm-12" id="aggregator-view-card">
                		  <h4>Profile Details</h4>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Agent ID</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.agentId} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>User Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.username} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>First Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.firstName} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Last Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.lastName} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Email</label><br/>
                        <input type="email" className="form-control col-md-12 col-sm-12" readOnly defaultValue={agentDetails.email} />
                      </div>
                      <div className="form-group col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Month</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(agentDetails.dob) !== 'string' || agentDetails.dob === null ? null : agentDetails.dob.slice(5,7)} />
                      </div>
                      <div className="form-group col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Day</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(agentDetails.dob) !== 'string' || agentDetails.dob === null  ? null : agentDetails.dob.slice(8)}  />
                      </div>
                      <div className="form-group col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Year</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(agentDetails.dob) !== 'string' || agentDetails.dob === null  ? null : agentDetails.dob.slice(0,4)} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Phone Number</label><br/>
                        <input type="tel" className="form-control" readOnly defaultValue={agentDetails.phoneNumber} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Gender</label><br/>
                          <input type="tel" className="form-control" readOnly defaultValue={agentDetails.gender} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Address</label><br/>
                        <input type="address" className="form-control" readOnly defaultValue={agentDetails.address} />
                      </div>
                      <div className="form-group col-lg-3 col-md-6 col-sm-6">
                        <label>State</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.state} />
                      </div>
                      <div className="form-group col-lg-3 col-md-6 col-sm-6">
                        <label>Local Gov</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.lga} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Business Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.businessName} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Terminal ID</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.terminalId} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Business Location</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.businessLocation} />
                      </div>
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Agent Type</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentDetails.agentType} />
                      </div>
        	        	</div>

                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div id="aggregator-view-card-top">
                        <div id="toggleAgentPerformance">
                          <h5 style={{fontWeight: 'bold'}}>
                            <Link to={`/allWallet/${agentDetails.agentId}`}>
                              View All Transactions 
                            </Link>
                          </h5>                                 
                        </div><br/>
                        <div className="row" style={{display: 'flex', justifyContent: 'space-between'}}>
                          <div className="animated bounce delay-2s" id="view-card">
                            <div style={{display: 'flex', justifyContent:'space-between'}}>
                              <h6>Trading Wallet</h6>
                              <Link to={`/tradingWallet/${agentDetails.agentId}`}><button className="btn btn-sm" id="view-btn-1" >View</button></Link>
                            </div>
                            <div style={{display: 'flex', justifyContent:'space-between'}}>
                              <h4 style={{fontWeight: 'bold', letterSpacing: '1px'}}>
                                <sup style={{fontSize: '50%'}}>₦</sup>{tradingWalletDetails.availableBalance}
                              </h4>
                              <h6 style={{textAlign: 'right', fontSize: '10px'}}> <b style={{fontSize: '7px'}}>Wallet Number</b> <br/> {agentDetails.walletNumber}</h6>               
                            </div>
                          </div>
                          <div className="animated bounce delay-2s" id="view-card">
                            <div style={{display: 'flex', justifyContent:'space-between'}}>
                              <h6>Income Wallet</h6>
                              <Link to={`/incomeWallet/${agentDetails.agentId}`}><button className="btn btn-sm" id="view-btn-2">View</button></Link>
                            </div>
                            <div style={{display: 'flex', justifyContent:'space-between'}}>                                                  
                              <h4 style={{fontWeight: 'bold', letterSpacing: '1px'}}>
                                <sup style={{fontSize: '50%'}}>₦</sup>{incomeWalletDetails.availableBalance}                                                    
                              </h4>
                              <h6 style={{textAlign: 'right',fontSize: '10px'}}> <b style={{fontSize: '7px'}}>Wallet Number</b> <br/> {agentDetails.incomeWalletNumber}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div id="aggregator-container-view" style={{paddingTop: '0px'}}>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{padding: '0'}}>
                        <div className="row" style={{margin: '0px'}}>
                          <div className="row" id="stats-top-most-card" style={{padding: '0'}}>
                            <div className="row" style={{margin: '0px', padding: '0'}}>
                              <div className="row" id="stats-top-card">
                                <h6 className="col-lg-4" style={{ fontSize: '12px', fontWeight: 'bold'}}>Today's Statistics</h6>
                                <h4 className="col-lg-4" style={{textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#2e5a03'}}>Amount<br/><b style={{fontSize: '12px'}}> ₦ {dailyStats.totals}</b></h4>
                                <h6 className="col-lg-4" style={{textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#b11d11'}}>Count<br/><b style={{fontSize: '12px'}}> {dailyStats.totalCount} Counts</b></h6>
                              </div>
                              <div id="stats-card-row">
                                <div id="stats-card">
                                  <h6> Deposit</h6> 
                                  <h4 id="bold">₦ {dailyStats.deposits}</h4>
                                  <h6 id="first-aggregator-count" className="yellow">{dailyStats.depositCount} Counts </h6> <img id="aggregator-count-image" alt="" src={require("../../img/bar_chart_1.svg")} />
                                </div>
                                <div id="stats-card">
                                  <h6> Withdrawal</h6> 
                                  <h4 id="bold">₦ {dailyStats.withDrawals}</h4>
                                  <h6 id="first-aggregator-count" className="grey">{dailyStats.withDrawalsCount} Counts </h6> <img id="aggregator-count-image" alt="" src={require("../../img/bar_chart_3.svg")} />
                                </div>
                                <div id="stats-card">
                                  <h6> Bill Payment</h6> 
                                  <h4 id="bold">₦ {dailyStats.billPayments}</h4> 
                                  <h6 id="first-aggregator-count" className="green">{dailyStats.billPaymentsCount} Counts </h6> <img id="aggregator-count-image" alt="" src={require("../../img/bar_chart_2.svg")} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row" style={{margin: '0px'}}>
                          <div className="row" id="stats-top-most-card" style={{padding: '0'}}>
                            <div className="row" style={{margin: '0px', padding: '0'}}>
                              <div className="row" id="stats-top-card">
                                <h6 className="col-lg-4" style={{ fontSize: '12px', fontWeight: 'bold'}}>Total Statistics</h6>
                                <h4 className="col-lg-4 " style={{textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#2e5a03'}}>Amount<br/><b style={{fontSize: '12px'}}> ₦{totalStats.totals}</b></h4>
                                <h6 className="col-lg-4" style={{textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#b11d11'}}>Count<br/><b style={{fontSize: '12px'}}> {totalStats.totalCount} Counts</b></h6>
                              </div>
                              <div id="stats-card-row">
                                <div id="stats-card">
                                  <h6> Deposit</h6>
                                  <h4 id="bold">₦ {totalStats.deposits}</h4>
                                  <h6 id="first-aggregator-count" className="yellow">{totalStats.depositCount} Counts</h6> <img id="aggregator-count-image" alt="" src={require("../../img/bar_chart_1.svg")} />
                                </div>
                                <div id="stats-card">
                                  <h6> Withdrawal</h6>
                                  <h4 id="bold">₦ {totalStats.withDrawals}</h4>
                                  <h6 id="first-aggregator-count" className="grey">{totalStats.withDrawalsCount} Counts</h6> <img id="aggregator-count-image" alt="" src={require("../../img/bar_chart_3.svg")} />
                                </div>
                                <div id="stats-card">
                                  <h6> Bill Payment</h6>
                                  <h4 id="bold">₦ {totalStats.billPayments}</h4> 
                                  <h6 id="first-aggregator-count" className="green">{totalStats.billPaymentsCount} Counts</h6> <img id="aggregator-count-image" alt="" src={require("../../img/bar_chart_2.svg")} />
                                </div>
                              </div>
                            </div>
                          </div>
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

export default AggregatorView;     