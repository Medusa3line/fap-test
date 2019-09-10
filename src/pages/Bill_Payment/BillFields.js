import React, { Component } from 'react';
import baseUrl from '../../baseUrl';

import AirtimeTopup from './AirtimeTopup';
import InternetServices from './InternetServices';
import UtilityBills from './UtilityBills';
import CableTv from './CableTv';
import FlightBooking from './FlightBooking';

 class BillFields extends Component {
  constructor(){
    super()
    this.state = {
      userDetails : {},
      route: 'airtime_topup',
      value: 1,
      serviceName: []
    }
  }

  onRouteChange = async (route, value) => {
    await this.setState({serviceName: [], route: route, value: value})

    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })

    let auth_token = this.state.userDetails.auth_token; 
    
    await fetch(`${baseUrl}/bills/category/${this.state.value}/service`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify({})
    }).then(response => response.json())
      .then(result => {
        this.setState({ serviceName: result.respBody })
      }); 
    }

    componentDidMount = async () => {
      await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })
    
    if(sessionStorage.getItem('userDetails')){
      let auth_token = this.state.userDetails.auth_token; 
      await fetch(`${baseUrl}/bills/category/1/service`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
        body: JSON.stringify({})
      }).then(response => response.json())
        .then(result => {
            this.setState({ serviceName: result.respBody })
          }
        ); //End of Get Bill Payment Details
    }

     
    }

  render(){
    const { serviceName, route }= this.state;
    return (
    <div>
      <div id="bill-list">
        <li className={route === 'airtime_topup' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('airtime_topup', '1')}><span><img src={require("../../img/arrow-up.svg")} alt="" /></span>Airtime Topup</li>
        <li className={route === 'internet_services' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('internet_services', '2')}><span><img src={require("../../img/wifi-symbol.svg")} alt="" /></span>Internet Services</li>
        <li className={route === 'utility_bills' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('utility_bills', '3')}><span><img src={require("../../img/billpayment.svg")} alt="" /></span>Utility Bills</li>
        <li className={route === 'cable_tv' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('cable_tv', '4')}><span><img src={require("../../img/television.svg")} alt="" /></span>Cable TV</li>
        <li className={route === 'flight_booking' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('flight_booking', '5')}><span><img src={require("../../img/plane.svg")} alt="" /></span>Flight Booking</li>
      </div>
      <div style={{marginBottom: '5%'}}>
        <div className="dropdown">
            {
              route === 'airtime_topup' ?
                <AirtimeTopup 
                  serviceName={serviceName}
                /> :
                (
                  this.state.route === 'internet_services' ?
                    <InternetServices 
                      serviceName={serviceName}
                    /> : 
                    (
                      this.state.route === 'utility_bills' ? 
                        <UtilityBills 
                          serviceName={serviceName} 
                        /> : 
                      (
                        this.state.route === 'cable_tv' ?
                          <CableTv 
                            serviceName={serviceName} 
                          />  : 
                          <FlightBooking 
                            serviceName={serviceName} 
                          />
                      )
                    )
                )   
            }
          </div>           
        </div>
    </div>
  );
  }	
}

export default BillFields;