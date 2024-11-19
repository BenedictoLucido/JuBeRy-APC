import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import philtecLogo from '../Assets/philtecLogo.png';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const goToDashboard = () => {
      navigate('/Dashboard');
    };

    const goToAvailableDevices = () => {
        navigate('/AvailableDevices');
    };

    const goToUpdateAssetDevices = () => {
      navigate('/UpdateAssetDevices');
    };

    return (
        <div className="landingPage">

          {/* Main Man Header */}
          <div className="landingPageMainHeader">
            <img src={philtecLogo} alt="rndmImg" onClick={goToDashboard} />
          </div>

          <div className='landingPageHeaderFooter'>
            <NavLink
                to="/Dashboard"
                className={({ isActive }) => `text ${isActive ? 'active' : ''}`}
            >
                DASHBOARD
            </NavLink>
            <NavLink
                to="/AvailableDevices"
                className={({ isActive }) => `text ${isActive ? 'active' : ''}`}
            >
                AVAILABLE DEVICES
            </NavLink>
            <NavLink
                to="/UpdateAssetDevices"
                className={({ isActive }) => `text ${isActive ? 'active' : ''}`}
            >
                UPDATE ASSET DEVICES
            </NavLink>
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
    
            <div className="navBox boxTwo" onClick={goToUpdateAssetDevices}>
              <div className="title">
                Update Asset Devices
              </div>
            </div>
    
          </div>
    
        </div>
        );
}

export default Dashboard;