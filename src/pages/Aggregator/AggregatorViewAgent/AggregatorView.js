import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom';

import withTimeout from '../../../Components/HOCs/withTimeoutAggregator.hoc';
import Spinner from '../../../Components/PreLoader/preLoader';
import {agentDashboard} from '../../../Utils/baseUrl';
import swal from '../../../Utils/alert';
import TotalAggregatorStatistics from '../Components/AggregatorStatistics/TotalAggregatorStatistics';
import TodayAggregatorStatistics from '../Components/AggregatorStatistics/TodayAggregatorStatistics';
import AggregatorPagesLayoutWrapper from '../../../Components/AggregatorPagesLayoutWrapper/AggregatorPagesLayoutWrapper';
import BackButton from '../../../Components/BackButton/backButton';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

const AggregatorView = () => {
  const [ initialState, setState ] = useState({
    userDetails : {},
    AgentId: '',
    agentDetails: {},
    stats: {},
    finishedLoading: false
  })

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
    			<AggregatorPagesLayoutWrapper>
            <div id="main">
              <div id="aggregator-container">
                <div className="col-lg-6" id="terminalIDSpacing">
                  <BackButton />               
                </div>                
                <div className="aggregator-layout">
                  <div id="aggregator-view-card">
                    <h4>Profile Details</h4>
                    <form>
                      <div className="row">
                      <div className="col-md-6">
                        <label>Agent ID</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentId} />
                      </div>
                      <div className="col-md-6">
                        <label>User Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={userName} />
                      </div>
                      <div className="col-md-6">
                        <label>First Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={firstName} />
                      </div>
                      <div className="col-md-6">
                        <label>Last Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={lastName} />
                      </div>
                      <div className="col-md-6">
                        <label>Email</label><br/>
                        <input type="email" className="form-control col-md-12 col-sm-12" readOnly defaultValue={email} />
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Month</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(dob) !== 'string' || dob === null ? null : dob.slice(5,7)} />
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Day</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(dob) !== 'string' || dob === null  ? null : dob.slice(8)}  />
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="month">Year</label>
                        <input type="text" className="form-control" readOnly defaultValue={typeof(dob) !== 'string' || dob === null  ? null : dob.slice(0,4)} />
                      </div>
                      <div className="col-md-6">
                        <label>Phone Number</label><br/>
                        <input type="tel" className="form-control" readOnly defaultValue={phoneNumber} />
                      </div>
                      <div className="col-md-6">
                          <label>Gender</label><br/>
                          <input type="tel" className="form-control" readOnly defaultValue={gender} />
                      </div>
                      <div className="col-md-6">
                        <label>Address</label><br/>
                        <input type="address" className="form-control" readOnly defaultValue={address} />
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6">
                        <label>State</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={state} />
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6">
                        <label>Local Gov</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={lga} />
                      </div>
                      <div className="col-md-6">
                        <label>Business Name</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={businessName} />
                      </div>
                      <div className="col-md-6">
                        <label>Terminal ID</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={terminalId} />
                      </div>
                      <div className="col-md-6">
                        <label>Business Location</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={buisnessLoc} />
                      </div>
                      <div className="col-md-6">
                        <label>Agent Type</label><br/>
                        <input type="text" className="form-control" readOnly defaultValue={agentType} />
                      </div>
                      </div>
                    </form>
                  </div>

                  <div>
                    <div id="aggregator-view-card-top">
                      <div id="toggleAgentPerformance">
                        <h5 className="font-weight-bold">
                          <Link to={`/allWallet/${agentDetails.agentId}`}>
                            View All Transactions 
                          </Link>
                        </h5>                                 
                      </div><br/>
                    </div>
                  <div id="aggregator-container-view" style={{paddingTop: '0px'}}>
                    <div className="col-lg-12 col-md-12 col-sm-12" style={{padding: '0'}}>
                      <div style={{margin: '0px'}}>
                        <TodayAggregatorStatistics stats={stats} />
                      </div>

                      <div style={{margin: '0px'}}>
                        <TotalAggregatorStatistics stats={stats} />
                      </div>
                    </div>
                  </div>
                  </div>
                
                </div>
              </div>
            </div>
          </AggregatorPagesLayoutWrapper>
    		)
    }
}

export default withTimeout(AggregatorView);     