import React from 'react';

const NetworkList = ({ name, getServiceNames, index }) => {
  const Logo = require(`../../../img/CableTVLogos/${index}.png`);
  return (
    <div>
      <li id="NetworkList" onClick={() => getServiceNames(name)}>
        <img src={Logo}  alt={name} />
        {name} 
      </li>
    </div>
  );
}

export default NetworkList;