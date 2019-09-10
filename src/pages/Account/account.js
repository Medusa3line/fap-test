import React, { Component } from 'react';
import baseUrl from '../../baseUrl';
import swal from 'sweetalert';
import {TimeOut} from '../../timeOut';

import Header from '../Header/Header';
import AccountFields1 from './AccountFields1';
import AccountFields2 from './AccountFields2';
import AccountOpeningSuccess from './AccountOpeningSuccess';

class account extends Component {
    constructor(){
      super()
      this.state = {
        route: 'page1',
        userDetails : {},
        firstName: '',
        lastName: '',
        middleName: '',
        dob: '',
        gender: '',
        mothersMaidenName: '',
        state: '',
        bank: '',
        branchCode: '00001',
        phoneNumber: '',
        bvn: '',
        email: '',
        occupation: '',
        address: '',
        amount: '',
        hasBVN: false,
        showAccountOpeningFields: false,
        redirect: false,        
        makingPayment: false,
        showValidateBVNButton: false
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
  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, middleName, dob, mothersMaidenName, gender, state } = this.state;
    if (firstName === '' || lastName === '' || middleName === '' || dob === '' || mothersMaidenName === '' || gender === '' || state === '' ){
      swal("Failed Operation", "Fill all fields", "info")
    } else {
      this.setState ({route: 'page2'})
    }
  }

  goBack = () => { this.setState ({route: 'page1'}) }
  goBackToDashboard = () => {
    this.props.history.push('/dashboard')
  }
  validateBvn = () => {
    let id = 'bvnValidation';
    document.getElementById(id).disabled = true;
    this.setState({makingPayment: true})
    let reqBody = {
      bvn: this.state.bvn,
      };

      let auth_token = this.state.userDetails.auth_token;

      fetch(`${baseUrl}/account/bvn/validate`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
        body: JSON.stringify(reqBody)
      }).then(response => response.json())
        .then(result => {
          this.setState({makingPayment: false});
          document.getElementById(id).disabled = false;
          if(result.respCode === '00'){
            const { firstName, lastName, gender, email, phoneNumber, stateOfOrigin, dateOfBirth } = result.respBody;
            this.setState({
              showValidateBVNButton: false, 
              showAccountOpeningFields:true,
              firstName,
              lastName,
              gender,
              email,
              phoneNumber,
              state: stateOfOrigin,
              dob: dateOfBirth
            })
          } else {
            swal("Failed Operation", `${result.respDescription}`, "error")
          }
        })
        .catch(err => {
          document.getElementById(id).disabled = false;
          this.setState({makingPayment: false})
          swal('An Error Occured', 'There was an error while processing this request, please try again', 'info')
        });
    }

  openAccount = (e) => {
    e.preventDefault();
    let id = e.target.id;
    const { phoneNumber, address, email, occupation, bvn, amount } = this.state;
      if ( phoneNumber === '' || address === '' || email === '' || occupation === '' || bvn === '' || amount === '' ){
          swal("Failed Operation", "Fill all fields", "info")
      } else {
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        const { address, amount, bank, branchCode, bvn, dob, email, firstName, gender, lastName, middleName, mothersMaidenName, phoneNumber } = this.state;
        let reqBody = {
          address: address,
          amount: amount,
          bankCode: bank,
          branchCode: branchCode, // Change this
          bvn: bvn,
          dateOfBirth: dob,
          email: email,
          firstName: firstName,
          gender: gender,
          lastName: lastName,
          message: lastName, // Change this
          middleName: middleName,
          motherMaiden: mothersMaidenName,
          phoneNo: phoneNumber
        };

          let auth_token = this.state.userDetails.auth_token;

          fetch(`${baseUrl}/account/open`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify(reqBody)
          }).then(response => response.json())
            .then(result => {
              console.log(result)
              this.setState({makingPayment: false});
              document.getElementById(id).disabled = false;
              if(result.respCode === '00'){
                this.setState({ route: 'page1'})
              } else {
                swal("Failed Operation", `${result.respDescription}`, "error")
              }
            })
            .catch(err => {
              document.getElementById(id).disabled = false;
              this.setState({makingPayment: false})
              swal('An Error Occured', 'There was an error while processing this request, please try again', 'info')
            });
        }
  }

  onChange = async(event) => { await this.setState({[event.target.name]: event.target.value}); }
  onChangeBVN = async (event) => {
    await this.setState({bvn: event.target.value})
    if(this.state.bvn.length === 11){
      this.setState({showValidateBVNButton: true})
      // this.validateBvn();
    } else {
      this.setState({showValidateBVNButton: false})
    }
  }
  isThereBvn = async (e) => {
    if(e.target.value === 'yes'){
      await this.setState({hasBVN: true, showAccountOpeningFields: false})
    } else if (e.target.value === 'no') {
      await this.setState({
        hasBVN: false, 
        showAccountOpeningFields: true,
        firstName: '',
        lastName: '',
        middleName: '',
        dob: '',
        gender: '',
        mothersMaidenName: '',
        state: '',
        bank: '',
        phoneNumber: '',
        bvn: '',
        email: '',
        occupation: '',
        address: '',
        amount: ''
      })
    } else {
      await this.setState({hasBVN: false, showAccountOpeningFields: false})
    }    
  } 

  render() {
    const { route, hasBVN, showValidateBVNButton, showAccountOpeningFields, makingPayment, firstName, lastName, middleName, dob, gender, mothersMaidenName, state, bank, phoneNumber, bvn, email, occupation, address, amount} = this.state;
    if (this.state.redirect){
    this.props.history.push("/");  
  }
  if (route === 'receipt') {
    return <AccountOpeningSuccess 
      goBackToDashboard={this.goBackToDashboard} 
    />    
  } else {
    return (
    <div className="body">
      {/* <!-- Main Wrapper --> */}
      <div className="container-fluid" style={{padding: '0'}}>
        <Header 
          history={this.props.history.location.pathname}
        />
        <div className="container-fluid" id="bottom-content">    
          <div id="main">   
            <div id="container">
              <div id="panel">
                <h4> Open an Account </h4>
                <small style={{color: '#ff0014'}}>All fields are required * </small>
              </div>
              <div className="line"></div><br/>
              {
                route === 'page1' ? 
                  <AccountFields1 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    firstName={firstName} 
                    lastName={lastName} 
                    middleName={middleName} 
                    dob={dob} 
                    gender={gender} 
                    mothersMaidenName={mothersMaidenName} 
                    state={state}
                    bank={bank}
                    bvn={bvn}
                    isThereBvn={this.isThereBvn}
                    hasBVN={hasBVN}
                    validateBvn={this.validateBvn}
                    onChangeBVN={this.onChangeBVN}
                    showValidateBVNButton={showValidateBVNButton}
                    showAccountOpeningFields={showAccountOpeningFields}
                  />  :
                  (
                    route === 'page2' ? 
                      <AccountFields2 
                        onChange={this.onChange}
                        phoneNumber={phoneNumber}  
                        email={email}
                        occupation={occupation} 
                        address={address} 
                        amount={amount}
                        makingPayment={makingPayment}
                        goBack={this.goBack}
                        openAccount={this.openAccount}
                      />
                      : 
                    null
                  )                 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
  
  }
}
export default account;