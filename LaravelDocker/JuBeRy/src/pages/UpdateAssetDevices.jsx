import React from 'react';
import { useNavigate } from 'react-router-dom';
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
            <div className='text' onClick={goToDashboard}> 
              DASHBOARD
            </div>
            <div className='text' onClick={goToAvailableDevices}> 
              AVAILABLE DEVICES
            </div>
            <div className='text' onClick={goToUpdateAssetDevices}> 
              UPDATE ASSET DEVICES
            </div>
          </div>

        </div>
    );
}

export default UpdateAssetDevices;