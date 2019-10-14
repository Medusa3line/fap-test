import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import swal from '../../Utils/alert';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';
import baseUrl from '../../Utils/baseUrl';

import Balance from '../../Components/Balance/Balance';
import DepositFields from './DepositFields';
import DepositFields2 from './DepositFields2';
import DepositReceipt from './DepositReceipt';
import Layout from '../../Components/Layout/Layout.component';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

class deposit extends Component {
  _isMounted = false;
    
  state = {
    route: 'deposit', //Change back to deposit
    userDetails: {},
    transactionType: 'SAVING',
    amount: '',
    depositorName: '',
    depositorNumber: '',
    description: '',
    commission: '',
    pin: '',
    makingPayment: false,
    validAcct: false,
    validatedButton: false,
    bank: '',
    acctNumber: '',
    acctName: '',
    nameValidation: false,
    refNumber: '',
    showReadOnlyAccountName: true
  }

  changeBank = async (event) => {
    await this.setState({
      bank: event.target.value, 
      acctName: '', 
      acctNumber: '', 
      nameValidation: false, 
      validAcct: false, 
      validatedButton: false
    })
  }

  depositInitial = (e) => {
    const { amount, depositorName, depositorNumber, description, acctName } = this.state;
    if ( amount === '' || depositorName === '' || depositorNumber === '' || description === '' || acctName === ''){
        swal("Failed Operation", "Fill all fields", "info")
    } else {
      let id = e.target.id;
      document.getElementById(id).disabled = true;
      this.setState({makingPayment: true})
      let reqBody = {
        transactionType: this.state.transactionType,
        amount: this.state.amount
        };

        fetch(`${baseUrl}/commission/getCommissionFee`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(commission => {
            this.setState({makingPayment: false});
            document.getElementById(id).disabled = false;
            if(commission.respCode === '00'){
              this.setState({commission: commission.respBody.fee, route: 'deposit_1'})
            } else {
              swal("Failed Operation", `${commission.respDescription}`, "error")
            }
          })
          .catch(err => {
            document.getElementById(id).disabled = false;
            this.setState({makingPayment: false})
            swal('An Error Occured', 'There was an error while processing this request, please try again', 'info')
          });
      }
  }

  validateButton = () => {
    let id = 'validateButton';
    document.getElementById(id).disabled = true;

    let reqBody = {
      accountNumber: this.state.acctNumber,
      bankCode: this.state.bank
    };

    this.setState({nameValidation: true})

    fetch(`${baseUrl}/transactions/nameenquiry`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(validationStatus => {
        this.setState({nameValidation: false})
        document.getElementById(id).disabled = false;
        if(validationStatus.respCode === '999'){
          swal("Failed Operation", `Account Number ${validationStatus.respDescription}, please try again`, "error")
        } else if (validationStatus.respCode === '00'){
          this.setState({
            acctName: validationStatus.respBody.name, 
            validatedButton: false, 
            validAcct: true
          })
        } else {
          swal("Failed Attempt", `${validationStatus.respDescription}`, "info");
        }
      })
      .catch(err => {
        document.getElementById(id).disabled = false;
        this.setState({nameValidation: false})
        swal("Failed Operation", `${err}`, "info")
      })
  }

  manualValidation = async () => {
    await this.setState({ showReadOnlyAccountName: false, validAcct: true, validatedButton: false })
  }

  accountNumber = async (event) => {
    await this.setState({acctNumber: event.target.value});
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })

    if(this.state.acctNumber.length === 10){
      await this.setState({validatedButton: true});
      this.validateButton();
    } else if (this.state.acctNumber.length < 10) {
      await this.setState({validatedButton: false, validAcct: false, acctName: ''})
    }
  }

    validation = () => {
      let id = "validation";
      if (this.state.pin === '') {
        swal('Empty agentPin', 'Agent Pin cannot be empty, please enter Pin and retry', 'info');
      } else {
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true});
        const { acctNumber, pin, amount, bank, depositorName, depositorNumber, description } = this.state;
        let reqBody = {
          accountNumber: acctNumber,
          agentPin: pin,
          amount: amount,
          bankCode: bank,
          bankName: bank,
          customerEmail: '',
          customerName: depositorName,
          customerPhone: depositorNumber,
          deviceId: '',
          latitude: '',
          longitude: '',
          media: '',
          narration: description,
          totalAmount: ''
        };

          fetch(`${baseUrl}/transactions/savings`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify(reqBody)
          }).then(response => response.json())
            .then(successfulDeposit => {
              this.setState({makingPayment: true})
              if(successfulDeposit.respCode === '00'){
                swal("Successful Operation", "Deposit Successful", "success")
                this.setState({refNumber: successfulDeposit.respDescription, route: 'DepositReceipt'})
              } else {
                swal("Failed Attempt", `${successfulDeposit.respDescription}`, "info");
              }
              this.setState({makingPayment: false})
            })
            .catch(err => {
              this.setState({makingPayment: false})
              swal('An Error Occured', 'An error occured, please try again', 'info');
            });
            document.getElementById(id).disabled = false;
          }
        }

    onChange = async(event) => { 
      await this.setState({
        [event.target.name]: event.target.value
      }); 
    }

    goBack = () => { this.setState({route: "deposit"}) }

  render() {
  const { 
    makingPayment, 
    bank, 
    acctName, 
    nameValidation, 
    validatedButton, 
    validAcct, 
    acctNumber, 
    amount, 
    commission, 
    refNumber, 
    showReadOnlyAccountName,
    depositorNumber,
    depositorName,
    description,
    route
  } = this.state;

  if (route === 'DepositReceipt') {
    return <DepositReceipt 
      amount={amount}
      commission={commission}
      acctNumber={acctNumber}
      bank={bank}
      acctName={acctName}
      refNumber={refNumber}
    />
  } else {
    return (
      <Layout>
        <div id="panel">
          <h4> Deposit</h4>
          <h6> Send money into customer's account </h6>
        </div>
        <div className="line"></div><br/>
        {
          route === 'deposit' ?
            <div>
              <Balance /> 
              <DepositFields 
                depositInitial={this.depositInitial} 
                onChange={this.onChange}
                makingPayment={makingPayment}
                changeBank={this.changeBank}
                bank={bank}
                acctName={acctName}
                nameValidation={nameValidation} 
                validateButton={this.validateButton}
                validAcct={validAcct}
                accountNumber={this.accountNumber}
                acctNumber={acctNumber}
                validatedButton={validatedButton}
                manualValidation={this.manualValidation}
                showReadOnlyAccountName={showReadOnlyAccountName}
                amount={amount}
                depositorNumber={depositorNumber}
                depositorName={depositorName}
                description={description}
              />
            </div> : (
              route === 'deposit_1' ?
                <DepositFields2 
                  amount={amount}
                  onChange={this.onChange}
                  commission={commission}
                  validation={this.validation}
                  makingPayment={makingPayment}
                  acctNumber={acctNumber}
                  bank={bank}
                  acctName={acctName}
                  goBack={this.goBack}
                /> : 
                null
            )                        
        } 
      </Layout>           
              
  )
  }
    

    
  }
}
export default withTimeout(withRouter(deposit));