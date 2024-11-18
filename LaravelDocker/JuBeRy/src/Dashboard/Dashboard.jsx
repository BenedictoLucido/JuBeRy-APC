import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const goToAvailableDevices = () => {
        navigate('/AvailableDevices');
    };

    return (
        <div className="landingPage">
    
          {/* Main Man Header */}
          <div className="landingPageMainHeader">
    
          </div>
    
          {/* Anything Header*/}
          <div className="landingPageHeader">
    
            <div className="titleContainer">
              <div className="title mt-7"> {/* Title */}
                JU BE RY <br /> Asset Movement
              </div>
    
              <div className="body"> {/* Body */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Faucibus in libero risus semper habitant arcu eget. 
              Et integer facilisi eget diam.Lorem ipsum dolor sit ame,consectetur 
              </div>
       
            </div>
    
          </div>
    
          {/* Anything Body*/}
          <div className="landingPageBody">
    
            <div className="navBox boxOne" onClick={goToAvailableDevices}>
              <div className="title">
                    Available Devices
              </div>
            </div>
    
            <div className="navBox boxTwo" onClick={goToAvailableDevices}>
              <div className="title">
                Update Devices
              </div>
            </div>
    
          </div>
    
        </div>
        );
}

export default Dashboard;