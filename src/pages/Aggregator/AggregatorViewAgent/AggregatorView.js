import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom'
import {Link} from 'react-router-dom';
import AggregatorHeader from '../AggregatorHeader/AggregatorHeader';
import './AggregatorView.styles.scss';

import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import {agentDashboard} from '../../../Utils/baseUrl';
import swal from '../../../Utils/alert';
import AgentViewInputField from './AgentViewInputField';
import TotalAggregatorStatistics from '../Components/AggregatorStatistics/TotalAggregatorStatistics';
import TodayAggregatorStatistics from '../Components/AggregatorStatistics/TodayAggregatorStatistics';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

const AggregatorView = () => {
  const [ initialState, setState ] = useState({
    userDetails : {},
    AgentId: '',
    agentDetails: {},
    stats: {},
    finishedLoading: false
  })

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    let reqBody = {
      agentId: params.agentId
    };
      setState(state => ({ 
        ...state, 
        finishedLoading: false
      }))
      fetch(`${agentDashboard}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(result => {
        // console.log(result)
        setState(state => ({
          ...state,
          agentDetails: result.respBody.agentProfile,
          stats: result.respBody
        }))
      })
      .catch(err => {
        swal('Error', `${err}`, 'error')
      });
      setState(state => ({ 
        ...state, 
        finishedLoading: true
      }))
  }, [params.agentId])

    const { agentDetails, stats, finishedLoading } = initialState;
    const { agentId, userName, firstName, lastName, email, dob, phoneNumber, address, gender, state, lga, businessName, terminalId, buisnessLoc, agentType } = agentDetails;
    if (!finishedLoading){
        return <Spinner />
      } else {
    		return (
    			<div className="body">
    				<div className="AggregatorViewcontainer">
          		<AggregatorHeader />
                <div id="main">
                	<div className="row" id="aggregator-container">
                    <div id="back-button">
                      <button className="btn btn-sm" onClick={() => history.goBack()}> 
                        <i className="fa fa-chevron-left"></i> 
                          Back
                      </button>
                    </div>
                		<div className="col-lg-6 col-md-12 col-sm-12" id="aggregator-view-card">
                		  <h4>Profile Details</h4>
                      <AgentViewInputField label="Agent ID" value={agentId} />
                      <AgentViewInputField label="User Name" value={userName} />
                      <AgentViewInputField label="First Name" value={firstName} />
                      <AgentViewInputField label="Last Name" value={lastName} />
                      <AgentViewInputField label="Email" value={email} />
                      <div className="form-group col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Month</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(dob) !== 'string' || dob === null ? null : dob.slice(5,7)} />
                      </div>
                      <div className="form-group col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Day</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(dob) !== 'string' || dob === null  ? null : dob.slice(8)}  />
                      </div>
                      <div className="form-group col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Year</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(dob) !== 'string' || dob === null  ? null : dob.slice(0,4)} />
                      </div>
                      <AgentViewInputField label="Phone Number" value={phoneNumber} />
                      <AgentViewInputField label="Gender" value={gender} />
                      <AgentViewInputField label="Address" value={address} />
                      <div className="form-group col-lg-3 col-md-6 col-sm-6">
                        <label>State</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={state} />
                      </div>
                      <div className="form-group col-lg-3 col-md-6 col-sm-6">
                        <label>Local Gov</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={lga} />
                      </div>
                      <AgentViewInputField label="Business Name" value={businessName} />
                      <div className="form-group col-lg-6 col-md-12 col-sm-12">
                        <label>Terminal ID</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={terminalId} />
                      </div>
                      <AgentViewInputField label="Email" value={email} />
                      <AgentViewInputField label="Business Location" value={buisnessLoc} />
                      <AgentViewInputField label="Agent Type" value={agentType ? agentType.replace(/[_]/g, ' '): null} />
        	        	</div>

                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div id="aggregator-view-card-top">
                        <div id="toggleAgentPerformance">
                          <h5 style={{fontWeight: 'bold'}}>
                            <Link to={`/allWallet/${agentId}`}>
                              View All Transactions 
                            </Link>
                          </h5>                                 
                        </div><br/>
                      </div>
                    <div id="aggregator-container-view">
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{padding: '0'}}>
                        <div className="row" style={{margin: '0px'}}>
                          <div className="row" id="stats-top-most-card" style={{padding: '0'}}>
                            <TotalAggregatorStatistics stats={stats} />
                          </div>
                        </div>

                        <div className="row" style={{margin: '0px'}}>
                          <div className="row" id="stats-top-most-card" style={{padding: '0'}}>
                            <TodayAggregatorStatistics stats={stats} />
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

export default withTimeout(AggregatorView);     