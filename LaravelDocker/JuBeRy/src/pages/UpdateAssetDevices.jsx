import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import philtecLogo from '../Assets/philtecLogo.png';
import './UpdateAssetDevices.css';

function UpdateAssetDevices() {
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

    return(
        <div className='availableDevicesPage'>

        {/* Main Man Header */}
        <div className="landingPageMainHeader">
            <img src={philtecLogo} alt="rndmImg" onClick={goToDashboard} />
        </div>

        <div className='landingPageHeaderFooter'>
            <NavLink to="/Dashboard" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>DASHBOARD</NavLink>
            <NavLink to="/AvailableDevices" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>AVAILABLE DEVICES</NavLink>
            <NavLink to="/UpdateAssetDevices" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>UPDATE ASSET DEVICES</NavLink>
        </div>

        </div>
    );
}

export default UpdateAssetDevices;