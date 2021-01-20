import React, { Component } from 'react';
import baseUrl from '../../Utils/baseUrl';

import InternetServices from './InternetServices/InternetServices';
import UtilityBills from './UtilityBills/UtilityBills';
import CableTv from './CableTv/CableTv';

 class BillFields extends Component {
  constructor(){
    super()
    this.state = {
      userDetails : {},
      route: 'internet_services',
      value: 2,
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
      await fetch(`${baseUrl}/bills/category/2/service`, {
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
        <li className={route === 'internet_services' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('internet_services', '2')}><span><img src={require("../../img/wifi-symbol.svg")} alt="" /></span>Internet Services</li>
        <li className={route === 'utility_bills' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('utility_bills', '3')}><span><img src={require("../../img/billpayment.svg")} alt="" /></span>Utility Bills</li>
        <li className={route === 'cable_tv' ? 'underline-thrift-panel': null} onClick={() =>this.onRouteChange('cable_tv', '4')}><span><img src={require("../../img/television.svg")} alt="" /></span>Cable TV</li>
      </div>
      <div style={{marginBottom: '5%'}}>
        <div className="dropdown">
          {(function() {
            switch(route) {
              case 'internet_services':
                return <InternetServices serviceName={serviceName} />;
              case 'utility_bills':
                return <UtilityBills serviceName={serviceName} />;
              case 'cable_tv':
                return <CableTv serviceName={serviceName} />;
              default:
                return null;
            } 
          })()}
        </div>           
      </div>
    </div>
  );
  }	
}

export default BillFields;