import React from 'react';

const ThriftBalanceSuccessful = ({thriftBalance, nextLiqDate, goBack}) => {
	return (
        <div>  
            <div id="thrift-container">
                <img style={{height: '10vh', width: '10vh'}} src={require("../../../img/account-balance.svg")} alt="" />
                <h5>Thrift balance is</h5>
                <h4>&#8358; {thriftBalance}</h4>
                <h6>Next Liquidation Date: {nextLiqDate}</h6>
                <button className="btn btn-success" onClick={goBack}>Back to thrift</button>               
            </div>
        </div>
	);
}

export default ThriftBalanceSuccessful;