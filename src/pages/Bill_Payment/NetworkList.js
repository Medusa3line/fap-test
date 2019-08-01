import React, { Component } from 'react';

class NetworkList extends Component {
  render() {
  	const { name, getServiceNames } = this.props;
    return (
      <div>
            <li id="NetworkList" onClick={() => getServiceNames(name)}> {name} </li>
      </div>
    );
  }
}

export default NetworkList;