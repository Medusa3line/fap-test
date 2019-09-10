import React, { Component } from 'react';
import baseUrl from '../../../baseUrl';
import swal from 'sweetalert';

import AccountFields1 from './FidelityAccountFields1';
import AccountFields2 from './FidelityAccountFields2';
import AccountOpeningSuccess from './FidelityAccountOpeningSuccess';

class FidelityAccount extends Component {
    constructor(){
      super()
      this.state = {
        route: 'receipt',
        userDetails : {},
        firstName: '',
        lastName: '',
        middleName: '', 
        title: '', 
        maritalStatus: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        bvn: '',
        email: '',
        address: '',
        occupation: '',
        lga: '',
        state: '',
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
    const { firstName, lastName, dob, gender, title, middleName, maritalStatus } = this.state;
    if (firstName === '' || lastName === '' || dob === '' ||
        gender === '' || title === '' || middleName === '' || maritalStatus === '' ){
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
    const { phoneNumber, address, email, occupation, lga, state } = this.state;
      if ( phoneNumber === '' || address === '' || email === '' || occupation === '' || lga === '' || state === ''){
          swal("Failed Operation", "Fill all fields", "info")
      } else {
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        const { 
          firstName, gender, lastName, address, phoneNumber, bvn, dob, email,
          middleName, title, maritalStatus, occupation, lga, state
        } = this.state;
          let day = dob.slice(8);
          let month = dob.slice(5,7);
          let year = dob.slice(0,4);
          let dateOfBirth = `${day}/${month}/${year}`;
            let reqBody = {
              firstName: firstName,
              gender: gender,
              lastName: lastName,
              address: address,
              dateOfBirth: dateOfBirth,
              phoneNo: phoneNumber,
              bvn: bvn,
              email: email,
              maritalStatus: maritalStatus,
              title: title,
              middleName: middleName,
              occupation: occupation,
              lga: lga,
              state: state,
              country: "NG",
              customerMandate: "",
            };

          let auth_token = this.state.userDetails.auth_token;

          fetch(`${baseUrl}/account/fidelity/open`, {
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
              swal('An Error Occured', `${err}`, 'info')
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
    const { 
      route, hasBVN, showValidateBVNButton, 
      generatedAccountNumber, showAccountOpeningFields, 
      makingPayment, firstName, lastName, dob, gender,
      middleName, title, maritalStatus, occupation, lga, state,
      phoneNumber, bvn, email, address } = this.state;
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
                  middleName={middleName} 
                  title={title}
                  maritalStatus={maritalStatus}
                  dob={dob} 
                  gender={gender}  
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
                      occupation={occupation} 
                      lga={lga}
                      state={state}
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
export default FidelityAccount;