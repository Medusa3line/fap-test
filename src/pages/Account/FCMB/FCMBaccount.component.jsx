import React, { Component } from 'react';
import {accountOpening, validateBVN } from '../../../Utils/baseUrl';
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
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        mothersMaidenName: '',
        bankCode: '',
        phoneNumber: '',
        bvn: '',
        email: '',
        residentAddress: '', 
        lgOfResidence: '', 
        stateOfResidence: '',
        nextOfKin: '', 
        occupation: '', 
        nationality: '',
        hasBVN: '',
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
    const { firstName, lastName, dob, mothersMaidenName, gender, maritalStatus, middleName } = this.state;
    if (firstName.trim() === '' || lastName.trim() === '' || dob.trim() === '' || mothersMaidenName.trim() === '' || gender.trim() === '' || maritalStatus.trim() === '' || middleName.trim() === '' ){
      swal("Failed Operation", "Fill all fields", "info")
    } else {
      this.setState ({route: 'page2'});
    }
  }

  goBack = () => { 
    this.setState ({route: 'page1'})
  }

  validateBvn = (e) => {
    let id = e.target.id;
    document.getElementById(id).disabled = true;
    this.setState({makingPayment: true})

      let auth_token = this.state.userDetails.auth_token;

      fetch(`${validateBVN}/${this.state.bvn}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        }
      }).then(response => response.json())
        .then(result => {
          this.setState({makingPayment: false});
          document.getElementById(id).disabled = false;
          if(result.respCode === '00'){
            this.setState({
              showValidateBVNButton: false, 
              showAccountOpeningFields:true
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
    const { phoneNumber, email, lgOfResidence, nationality, occupation, nextOfKin, residentAddress, stateOfResidence } = this.state;
      if ( phoneNumber.trim() === '' || email.trim() === '' || nextOfKin.trim() === '' || nationality.trim() === '' || residentAddress.trim() === '' || lgOfResidence.trim() === '' || occupation.trim() === '' || stateOfResidence.trim() === ''){
          swal("Required Fields", "Fill all fields", "info")
      } else {
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        const { firstName, gender, lastName, phoneNumber, bvn, dob, email, mothersMaidenName, residentAddress, lgOfResidence, nextOfKin, occupation, nationality, middleName, maritalStatus, stateOfResidence, hasBVN } = this.state;
          let day = dob.slice(8);
          let month = dob.slice(5,7);
          let year = dob.slice(0,4);
          let dateOfBirth = `${month}/${day}/${year}`;
            let reqBody = {
              firstName,
              gender,
              lastName,
              middleName,
              maritalStatus,
              residentAddress,
              lgOfResidence,
              nextOfKin, 
              occupation, 
              nationality,
              dateOfBirth: dateOfBirth,
              phoneNumber,
              motherMaidenName: mothersMaidenName,
              BVN: hasBVN ? bvn : '',
              countryCode: 'NG',
              email, 
              stateOfResidence
            };

          let auth_token = this.state.userDetails.auth_token;

          fetch(`${accountOpening}`, {
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
    const { route, hasBVN, showValidateBVNButton, generatedAccountNumber, showAccountOpeningFields, makingPayment, firstName, lastName, dob, gender, mothersMaidenName, phoneNumber, bvn, email, maritalStatus, residentAddress, lgOfResidence, nextOfKin, occupation, nationality, middleName, stateOfResidence } = this.state;
  if (route === 'receipt') {
    return <AccountOpeningSuccess 
      generatedAccountNumber = {generatedAccountNumber}
      firstName = {firstName}
      lastName = {lastName} 
      middleName={middleName}
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
                    middleName={middleName} 
                    dob={dob} 
                    gender={gender} 
                    maritalStatus={maritalStatus}
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
                      residentAddress={residentAddress}
                      lgOfResidence={lgOfResidence}
                      stateOfResidence={stateOfResidence}
                      nextOfKin={nextOfKin}
                      occupation={occupation}
                      nationality={nationality}
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