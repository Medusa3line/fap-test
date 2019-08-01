import React from 'react';
import {Link} from 'react-router-dom';

const ThriftBalanceSuccessful = ({thriftBalance, nextLiqDate}) => {
	return (
        <div>  
            <div id="thrift-container">
                <img src={require("../../../img/account-balance.svg")} alt="" />
                <h5>Thrift balance is</h5>
                <h4>&#8358; {thriftBalance}</h4>
                <h6>Next Liquidation Date: {nextLiqDate}</h6>
                <button className="btn btn-success"><Link to="/thrift">Back to thrift</Link></button>               
            </div>
        </div>
	);
}

export default ThriftBalanceSuccessful;