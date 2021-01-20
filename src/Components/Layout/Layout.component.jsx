import React, { useState, useLayoutEffect, useEffect } from 'react';
import './Layout.styles.scss';
import Sidebar from '../Sidebar/sidebar.component';
import FreedomLogo from '../../img/logo.png'

export default function Layout ({ children }) {
  const [sidebar, setSidebar] = useState(true);
  useLayoutEffect(() => {
    // Setting Sidebar Dynamically based on window screen width
    if(window.innerWidth < 900){
      setSidebar(false)
    }
  }, [])
  useEffect(() => {
    if(sidebar){
      if(window.innerWidth < 960){
        //View on Mobile devices. The sidebar should cover the entire screen and have a padding top of 50px
        document.getElementById("mySidebar").style.width = "100%";
        document.getElementById("mySidebar").style.paddingTop = "50px";
      } else {
        //View on Computer devices. The sidebar should take 15% of the screen and the main screen have a mergin left of 15%
        document.getElementById("mainPage").style.marginLeft = "15%";
        document.getElementById("mySidebar").style.width = "15%";

      }
      //Whether the device is mobile or computer, the sidebar will always be displayed if sidebar state is true
      document.getElementById("mySidebar").style.display = "block";
    } else {
      // Display the fancy sidebar if the device is a computer. Since the sidebar has a width of 50px, the main content should have a margin left of 50px too
      document.getElementById("mainPage").style.marginLeft = "0px";
      document.getElementById("manipulateChildren").style.display = "block"
    }
  }, [sidebar])
  
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  }
 
  return (
    <React.Fragment>
      {/* <Header />  */}
      <div id="wrapper">
        {
          sidebar ? 
          <div id="mySidebar">
            <Sidebar />         
          </div>
          :
          null
        }
        <div id="mainPage" className="position-relative">
          <div className="children">
            <div 
              className={sidebar ? "menu-toggle-btn open" : "menu-toggle-btn"}
              onClick={toggleSidebar}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <img src={FreedomLogo} className="d-none" alt="Freedom Logo" />
            <div id="manipulateChildren">
              {children}
            </div>              
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
