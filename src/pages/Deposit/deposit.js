import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';
import baseUrl from '../../Utils/baseUrl';

import Balance from '../../Components/Balance/Balance';
import DepositFields from './DepositFields';
import DepositFields2 from './DepositFields2';
import DepositReceipt from './DepositReceipt';
import AuthenticatedPagesLayoutWrapper from '../../Components/AuthenticatedPagesLayoutWrapper/authenticatedPagesLayoutWrapper';
import Panel from '../../Components/Panel/panel';
import SlimContentCardWrapper from '../../Components/SlimContentCardWrapper/slimContentCardWrapper';
import FancyLine from '../../Components/FancyLine/fancyLine';

class deposit extends Component {
  _isMounted = false;
    constructor(){
      super()
      this.state = {
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
    }

  componentDidMount = async () => {
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })
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
        return swal("Failed Operation", "Fill all fields", "info")
      } 
      if(depositorNumber.length < 11){
        return swal("Failed Operation", "Phone Number is invalid", "info")
      }

      
      this.setState({makingPayment: true})
      let reqBody = {
        transactionType: this.state.transactionType,
        amount: this.state.amount
        };

        let auth_token = this.state.userDetails.auth_token;

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
            ;
            if(commission.respCode === '00'){
              this.setState({commission: commission.respBody.fee, route: 'deposit_1'})
            } else {
              swal("Failed Operation", `${commission.respDescription}`, "error")
            }
          })
          .catch(err => {
            this.setState({makingPayment: false})
            swal('An Error Occured', 'There was an error while processing this request, please try again', 'info')
          });
    }

  validateButton = () => {
    let reqBody = {
      accountNumber: this.state.acctNumber,
      bankCode: this.state.bank
    };

    let auth_token = this.state.userDetails.auth_token;

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
        ;
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
        ;
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
      if (this.state.pin === '') {
        swal('Empty agentPin', 'Agent Pin cannot be empty, please enter Pin and retry', 'info');
      } else {
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

          let auth_token = this.state.userDetails.auth_token;
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
    description 
  } = this.state;

  if (this.state.route === 'DepositReceipt') {
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
    <AuthenticatedPagesLayoutWrapper>
      <SlimContentCardWrapper>
        <Panel 
          title="Deposit" 
          snippet="Send money into customer's account " 
        />
        <FancyLine />
        {
          this.state.route === 'deposit' ?
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
              this.state.route === 'deposit_1' ?
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
      </SlimContentCardWrapper>
    </AuthenticatedPagesLayoutWrapper>
  )
  }
  }
}
export default withTimeout(withRouter(deposit));