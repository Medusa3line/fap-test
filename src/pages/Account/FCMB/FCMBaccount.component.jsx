import React, { Component } from 'react';
import baseUrl from '../../../Utils/baseUrl';
import swal from '../../../Utils/alert';

import AccountFields1 from './FCMBAccountFields1';
import AccountFields2 from './FCMBAccountFields2';
import AccountOpeningSuccess from './FCMBAccountOpeningSuccess';

class FCMBAccount extends Component {
    constructor(){
      super()
      this.state = {
        route: 'page1',
        userDetails : {},
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        mothersMaidenName: '',
        bankCode: '058',
        phoneNumber: '',
        bvn: '',
        email: '',
        address: '',
        hasBVN: null,
        showAccountOpeningFields: false,       
        makingPayment: false,
        showValidateBVNButton: false,
        generatedAccountNumber: ''
      }
    }

componentDidMount = async () => {
  await sessionStorage.getItem('userDetails') && this.setState ({
    userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
  })
}
  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, dob, mothersMaidenName, gender } = this.state;
    if (firstName === '' || lastName === '' || dob === '' || mothersMaidenName === '' || gender === '' ){
      swal("Failed Operation", "Fill all fields", "info")
    } else {
      this.setState ({route: 'page2'});
      this.props.toShowSelectBank(false);
    }
  }

  goBack = () => { 
    this.setState ({route: 'page1'})
    this.props.toShowSelectBank(true);
  }
  validateBvn = (e) => {
    let id = e.target.id;
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
            const { firstName, lastName, gender, email, phoneNumber } = result.respBody;
            this.setState({
              showValidateBVNButton: false, 
              showAccountOpeningFields:true,
              firstName,
              lastName,
              gender,
              email,
              phoneNumber,
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
    const { phoneNumber, address, email } = this.state;
      if ( phoneNumber === '' || address === '' || email === ''){
          swal("Failed Operation", "Fill all fields", "info")
      } else {
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        const { firstName, gender, lastName, address, phoneNumber, bankCode,  bvn, dob, email, mothersMaidenName } = this.state;
          let day = dob.slice(8);
          let month = dob.slice(5,7);
          let year = dob.slice(0,4);
          let dateOfBirth = `${month}/${day}/${year}`;
            let reqBody = {
              firstName: firstName,
              gender: gender,
              lastName: lastName,
              address: address,
              dateOfBirth: dateOfBirth,
              phoneNo: phoneNumber,
              motherMaiden: mothersMaidenName,
              bvn: bvn,
              bankCode: bankCode,
              email: email
            };

          let auth_token = this.state.userDetails.auth_token;

          fetch(`${baseUrl}/account/gtb/open`, {
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
                this.setState({ 
                  generatedAccountNumber: result.respBody.accountNumber, 
                  route: "receipt"
                })
                this.props.toShowSelectBank(false);
              } else {
                swal("Failed Operation", `${result.respDescription}`, "error")
              }
            })
            .catch(err => {
              document.getElementById(id).disabled = false;
              this.setState({makingPayment: false})
              swal('An Error Occured', `${err}`, 'error')
            });
        }
  }

  onChange = async(event) => { 
    await this.setState({[event.target.name]: event.target.value}); 
  }
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
    if(e.target.value === 'true'){
      await this.setState({hasBVN: true, showAccountOpeningFields: false})
    } else if (e.target.value === 'false') {
      await this.setState({
        hasBVN: false, 
        showAccountOpeningFields: true,
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        mothersMaidenName: '',
        phoneNumber: '',
        bvn: '',
        email: '',
        address: ''
      })
    } else {
      await this.setState({hasBVN: false, showAccountOpeningFields: false})
    }    
  } 

  render() {
    const { route, hasBVN, showValidateBVNButton, generatedAccountNumber, showAccountOpeningFields, makingPayment, firstName, lastName, dob, gender, mothersMaidenName, phoneNumber, bvn, email, address } = this.state;
  if (route === 'receipt') {
    return <AccountOpeningSuccess 
      generatedAccountNumber = {generatedAccountNumber}
      firstName = {firstName}
      lastName = {lastName} 
    />    
  } else {
    return (               
        <React.Fragment>
          <div id="panel-bottom">
            {
              route === 'page1' ?
                <React.Fragment>                   
                  <AccountFields1 
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  firstName={firstName} 
                  lastName={lastName} 
                  dob={dob} 
                  gender={gender} 
                  mothersMaidenName={mothersMaidenName} 
                  bvn={bvn}
                  isThereBvn={this.isThereBvn}
                  hasBVN={hasBVN}
                  validateBvn={this.validateBvn}
                  onChangeBVN={this.onChangeBVN}
                  showValidateBVNButton={showValidateBVNButton}
                  showAccountOpeningFields={showAccountOpeningFields}
                  />  
                  </React.Fragment>:
                  (
                  route === 'page2' ? 
                    <AccountFields2 
                    onChange={this.onChange}
                    phoneNumber={phoneNumber}  
                    email={email} 
                    address={address} 
                    makingPayment={makingPayment}
                    goBack={this.goBack}
                    openAccount={this.openAccount}
                    />
                    : 
                    null
                  )                 
            }
          </div>
        </React.Fragment>
      )
    }
  }
}
export default FCMBAccount;