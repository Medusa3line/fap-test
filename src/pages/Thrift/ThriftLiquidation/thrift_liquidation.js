import React, { Component } from 'react';
import swal from 'sweetalert';
import baseUrl from '../../../baseUrl';

import ThriftLiquidationFields from './ThriftLiquidationFields';
import ThriftLiquidationSuccessful from './ThriftLiquidationSuccessful';

class ThriftLiquidation extends Component {
    state = {
        route: "liquidation",
        userDetails: {},
        phoneNumber: '',
        cardPin: '',
        phonePin: '',
        firstNine: '6395879032',
        lastNine: '',
        makingPayment: false   
    }

  cardLiquidate = (e) => {
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

        fetch(`${baseUrl}/thrift/prematureLiquidation`, {
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
              this.setState ({route: 'receipt'})
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

    phoneLiquidate = (e) => {
        const { phonePin, phoneNumber } = this.state;
        if( phonePin === '' || phoneNumber === '' ){
            alert('All fields are required')
        } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
          cardNumber: this.state.phoneNumber,
          agentPin: this.state.phonePin
        };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/thrift/prematureLiquidation`, {
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
                this.setState ({route: 'receipt'})
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

    select_transaction = async (e) => {
        this.setState({route: e.target.value})
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    goBack = () => {
      this.setState({route: 'liquidation'})
    }  

  render() {
    const { route, phoneNumber, firstNine, lastNine, cardPin, phonePin, makingPayment } = this.state;
    return (
      <div id="thrift-main">   
        <div id="thrift-container">
          <div id="panel" style={{padding: '0px'}}>
            <h5> Thrift Liquidation </h5>
          </div>
            {
              route === 'liquidation' ? 
                <ThriftLiquidationFields 
                  cardLiquidate={this.cardLiquidate} 
                  phoneLiquidate={this.phoneLiquidate} 
                  phoneNumber = {phoneNumber}
                  cardPin = {cardPin}
                  firstNine = {firstNine}
                  lastNine = {lastNine}
                  phonePin = {phonePin}
                  onChange = {this.onChange}
                  makingPayment = { makingPayment }
                /> :
              (
                route === 'receipt' ? 
                    <ThriftLiquidationSuccessful 
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
export default ThriftLiquidation;