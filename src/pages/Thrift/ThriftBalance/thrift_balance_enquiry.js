import React, { Component } from 'react';
import swal from 'sweetalert';
import baseUrl from '../../../baseUrl';

import ThriftBalanceEnquiryFields from './ThriftBalanceEnquiryFields';
import ThriftBalanceSuccessful from './ThriftBalanceSuccessful';

class ThriftBalanceEnquiry extends Component {
        state = {
          route : 'balance',
          userDetails: {},
          phoneNumber: '',
          cardPin: '',
          phonePin: '',
          firstNine: '6395879032',
          lastNine: '',
          thriftBalance: '',
          nextLiqDate: '',
          makingPayment: false
        }

cardBalance = (e) => {
    const { cardPin, lastNine, firstNine } = this.state;
      if( cardPin === '' || lastNine === '' || firstNine === '' ){
        alert('All fields are required')
      } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
          cardNumber: `${this.state.firstNine}${this.state.lastNine}`,
          agentPin: this.state.cardPin
        };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/thrift/thriftDetails`, {
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
                this.setState ({
                  thriftBalance: result.respBody.savingBalance,
                  nextLiqDate: result.respBody.nextLiqDate,
                  route: 'receipt'
                })
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

    phoneBalance = (e) => {
        const { phonePin, phoneNumber } = this.state;
        if( phonePin === '' || phoneNumber === '' ){
            alert('All fields are required')
        } else {
        let id = e.target.id;
        this.setState({makingPayment: true})
        document.getElementById(id).disabled = true;
        let reqBody = {
          cardNumber: this.state.phoneNumber,
          agentPin: this.state.phonePin
        };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/thrift/thriftDetails`, {
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
              this.setState ({
                thriftBalance: result.respBody.savingBalance,
                nextLiqDate: result.respBody.nextLiqDate,
                route: 'receipt'
              })
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

  componentDidMount = async () => {
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })

  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  goBack = () => {
    this.setState({route: 'balance'})
  }
    
  render() {
    const { route, phoneNumber, firstNine, lastNine, cardPin, phonePin, thriftBalance, makingPayment, nextLiqDate } = this.state;
    return (
      <div id="thrift-main">   
          <div id="thrift-container">
              <div id="panel"  style={{padding: '0px'}}>
                <h5>Thrift Balance Enquiry</h5>
              </div>
              {
                route === 'balance' ? 
                  <ThriftBalanceEnquiryFields 
                    cardBalance ={this.cardBalance} 
                    phoneBalance ={this.phoneBalance} 
                    phoneNumber = {phoneNumber}
                    cardPin = {cardPin}
                    firstNine = {firstNine}
                    lastNine = {lastNine}
                    phonePin = {phonePin}
                    onChange = {this.onChange}
                    makingPayment = {makingPayment}
                  /> :
                (
                  route === 'receipt' ? 
                      <ThriftBalanceSuccessful 
                        thriftBalance = {thriftBalance}
                        nextLiqDate = {nextLiqDate}
                        goBack={this.goBack}
                      /> : 
                      null
                )                                    
              }
          </div>
      </div>
    )
  }
}
export default ThriftBalanceEnquiry;