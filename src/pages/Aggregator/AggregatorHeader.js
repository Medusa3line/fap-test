import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AggregatorHeader extends Component{
	constructor(){
    super()
    this.state = {
      userDetails : {},
      redirect: false
    }
  }

  componentDidMount = () => {
    localStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(localStorage.getItem('userDetails'))
    })
  }

  Logout = () => {
    localStorage.clear();
  }

	render(){
		return(
			<div style={{backgroundColor:'#c60115'}}>
				<div className="container-fluid" style={{ margin:'0 14%', padding: '0'}}>
	        <div className="nav navbar-header" style={{position: 'relative'}}>
	          <Link to="/aggregator" className="navbar-brand" style={{padding: '10px 0'}}><img src={require("../../img/logo1.png")} width="80vw" height="45vh" alt="" /></Link>
	        </div>
        
	        <ul className="nav navbar-nav navbar-right">
	           <div className="dropdown">
              <button className="btn btn-light btn-sm dropdown-toggle" 
                type="button" 
                data-toggle="dropdown" 
                style={{color: 'white', backgroundColor: '#c60115', marginTop: '4vh'}}>
                 {this.state.userDetails.agentName} <span style={{fontSize: '8px'}} className="fa fa-chevron-down"></span></button>
              <ul className="dropdown-menu dropdown">
                <li><Link to={"/passwordChange"}> Change Password</Link></li>
                <li><Link to={"/pinChange"}> Change Pin</Link></li>
                <li ><Link onClick={this.Logout} to={"/"}> Logout</Link></li>
              </ul>
            </div>
	        </ul> 
    		</div><br/>
			</div>
		)
	}
}
export default AggregatorHeader;