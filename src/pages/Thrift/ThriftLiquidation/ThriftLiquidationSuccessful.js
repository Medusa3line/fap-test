import React from 'react';

const ThriftLiquidationSuccessful = ({goBack}) => {
    return (
        <div>  
            <div id="thrift-container">
                <img src={require("../../../img/transfer-success.svg")} style={{height: '10vh', width: '10vh'}} alt="" />
                <h4>Liquidation Successful</h4>
                <h6>Please Check your registered account.</h6>
                <button className="btn btn-success" onClick={goBack}>Back to thrift</button>               
            </div>
        </div>
    )
}
export default ThriftLiquidationSuccessful;