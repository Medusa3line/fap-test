import React from 'react';

const ErrorNotification = () => {
  return (
    <div className="alert alert-danger alert-dismissible out" style={{padding: '5px 50px',width: '20%', position: 'fixed', right: '1%', top: '1%'}}>
      <a href="#" class="close" data-dismiss="alert"></a>
      Please enter correct username and password
    </div>
    )
}

export default ErrorNotification;