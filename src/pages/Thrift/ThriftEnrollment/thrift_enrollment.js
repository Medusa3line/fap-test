import React, { Component } from 'react';
import swal from 'sweetalert';
import {TimeOut} from '../../../timeOut';
import baseUrl from '../../../baseUrl';

import ThriftEnrollmentFields from './ThriftEnrollmentFields';
import ThriftEnrollmentFields2 from './ThriftEnrollmentFields2';

class ThriftEnrollment extends Component {
  constructor(){
      super()
      this.state = {
          route: 'enrollment',
          redirect: false,
          userDetails: {},
          firstName: '',
          lastName: '',
          middleName: '',
          dob: '',
          email: '',
          address: '',
          saving_cycle: '',
          lastNine: '',
          firstNine: '6395879032',
          amount: "",
          pin: '',
          phone: '',
          gender: '',
          makingPayment: false
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

    initalSubmit = () => {
      const { firstName, lastName, gender, dob, email, address, middleName, phone } = this.state;
      if( firstName === '' || lastName === '' || middleName === '' || dob === '' || email === '' || address === '' || gender === '' || phone === '' ){
        alert('All fields are required')
      } else {
        this.setState({route: 'enrollment1'})
      }
    }

    finalSubmit = (e) => {
      const { amount, pin, saving_cycle, lastNine, firstNine } = this.state;
      if( amount === '' || pin === '' || saving_cycle === '' || lastNine === '' || firstNine === '' ){
        alert('All fields are required')
      } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
          agentName: this.state.userDetails.agentName,
          cardNumber: `${this.state.firstNine}${this.state.lastNine}`,
          customerAddress: this.state.address,
          customerDOB: this.state.dob,
          customerEmail: this.state.email,
          customerName: `${this.state.firstName} ${this.state.lastName} ${this.state.middleName}`,
          customerPhone: this.state.phone,
          cycle: this.state.saving_cycle,
          gender: this.state.gender,
          pin: this.state.pin,
          email: this.state.email,
          savingAmount: this.state.amount,
      };

      let auth_token = this.state.userDetails.auth_token;

      fetch(`${baseUrl}/thrift/registerForThrift`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
        body: JSON.stringify(reqBody)
      }).then(response => response.json())
        .then(result => {
          this.setState({makingPayment: false})
          document.getElementById(id).disabled = false;
          if(result.respCode === '00'){
            swal("Successful Enrollment", "Successful Thrift Enrollment", "success")
            this.props.history.push("/thrift");
          }else if (result.respCode === '96'){
            swal("Failed Operation", `${result.respDescription}`, "info")
          } else {
            swal("Failed Operation", `${result.respDescription}`, "error");
          }
        })
        .catch(err => {
          this.setState({makingPayment: false})
          document.getElementById(id).disabled = false;
          swal('An Error Occured', 'There was an error while processing this request, please try again', 'error')
        });
      }
    }

    changeRouteToMain = () => {
      this.setState({route: 'enrollment'})
    }

    onChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    // Manipulate Number input fields and Password fields for Pin to not accept anything other than numbers
    manipulateNumber = (e) => {
      var inputKeyCode = e.keyCode ? e.keyCode : e.which;
      if (((inputKeyCode >= 48 && inputKeyCode <= 57) || (inputKeyCode >= 96 && inputKeyCode <= 105)) && (inputKeyCode != null)){
          if((e.target.value.length === e.target.maxLength) || (inputKeyCode === 45)){
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    }

  render() {
    const { route, makingPayment, firstName, lastName, middleName, email, address, phone, gender, dob, pin, amount, saving_cycle, lastNine } = this.state;
    if (this.state.redirect){
      this.props.history.push("/");  
    }
    return (
      <div id="thrift-main">   
        <div id="thrift-acct-container">
          <div id="panel" style={{padding: '0px'}}>
            <h5>Thrift Enrollment </h5>
          </div>
          <div id="panel-bottom">
            {
              route === 'enrollment' ?
                <ThriftEnrollmentFields 
                  initalSubmit={this.initalSubmit} 
                  onChange={this.onChange} 
                  firstName={firstName}
                  lastName={lastName}
                  middleName={middleName}
                  email={email}
                  address={address}
                  phone={phone}
                  gender={gender}
                  dob={dob}
                /> :
                (
                  route === 'enrollment1' ? 
                    <ThriftEnrollmentFields2 
                      finalSubmit={this.finalSubmit} 
                      changeRouteToMain={this.changeRouteToMain} 
                      onChange={this.onChange} 
                      lastNine={lastNine}
                      cycle={saving_cycle}
                      amount={amount}
                      pin={pin}
                      makingPayment = { makingPayment }
                    /> :
                    null
                )  
            }
          </div> 
        </div>
      </div>
    )
  }
}
export default ThriftEnrollment;