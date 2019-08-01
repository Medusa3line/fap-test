import React, { Component } from 'react';

import ThriftContributionFields from './ThriftContributionFields';

class ThriftContribution extends Component {
  render() {
    return (
        <div id="thrift-main">   
            <div id="thrift-container">
                <div id="panel"  style={{padding: '0px'}}>
                    <h5>Thrift Contribution </h5>
                </div>
                <ThriftContributionFields />
            </div>
        </div>
    )
  }
}
export default ThriftContribution;