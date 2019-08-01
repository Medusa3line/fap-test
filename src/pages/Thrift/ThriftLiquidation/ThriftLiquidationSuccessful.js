import React from 'react';
import {Link} from 'react-router-dom';

const ThriftLiquidationSuccessful = () => {
    return (
        <div>  
            <div id="thrift-container">
                <img src={require("../../../img/transfer-success.svg")} alt="" />
                <h2>Liquidation Successful</h2>
                <h3>Please Check your thrift card.</h3>
                <button className="btn btn-md btn-danger"><Link to="/thrift">Back to thrift</Link></button>               
            </div>
        </div>
    )
}
export default ThriftLiquidationSuccessful;