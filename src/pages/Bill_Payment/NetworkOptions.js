import React, { Component } from 'react';

class NetworkOptions extends Component {
  render() {
  	const { optionName, amount, getServiceAmount } = this.props;
    return (
        <option id="NetworkList" onClick={() => getServiceAmount(amount, optionName)}> {optionName} </option>
    );
  }
}

export default NetworkOptions;