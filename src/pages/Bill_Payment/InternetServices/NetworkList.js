import React from 'react';

const NetworkList = ({ name, getServiceNames, index }) => {
  const Logo = require(`../../../img/InternetServicesLogos/${index}.png`);
  return (
    <div>
      <li id="NetworkList" onClick={() => getServiceNames(name)}>
        <div>
          <img src={Logo}  alt={name} /> 
        </div>
        <div>
          {name}
        </div> 
      </li>
    </div>
  );
}

export default NetworkList;