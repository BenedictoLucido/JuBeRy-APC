import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import philtecLogo from '../Assets/philtecLogo.png';
import './UpdateAssetDevices.css';

function UpdateAssetDevices() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/Dashboard');
    };

    const [data, setData] = useState([
        { assetTag: 1960000, deviceName: "Laptop", model: "5400", brand: "Dell", type: "Service Unit", status: "Issued" },
        { assetTag: 1960001, deviceName: "Laptop", model: "T14", brand: "Lenovo", type: "Inventory", status: "Issued" },
        { assetTag: 1960002, deviceName: "Laptop", model: "T490", brand: "Lenovo", type: "Service Unit", status: "Issued" },
        { assetTag: 1960003, deviceName: "Laptop", model: "5440", brand: "Dell", type: "Inventory", status: "Issued" },
    ]);

    const [isViewAssetModalOpen, setIsViewAssetModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    // Load data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('assets');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    setData(parsedData);
                } else {
                    console.error('Stored data is not in the expected format');
                }
            } catch (error) {
                console.error('Error parsing stored data', error);
            }
        }
    }, []);

    // Save data to localStorage whenever data changes
    useEffect(() => {
        console.log('Updating localStorage:', data); // Debugging: Log data before saving
        localStorage.setItem('assets', JSON.stringify(data));
    }, [data]);
    const closeViewAssetModal = () => {
        setIsViewAssetModalOpen(false);
        setSelectedAsset(null);
    };

    // Update status of the asset and persist the change
    const handleReturnAsset = (assetTag) => {
        const updatedData = data.map((asset) =>
            asset.assetTag === assetTag
                ? { ...asset, status: "Not Issued" }
                : asset
        );
        setData(updatedData);
        localStorage.setItem('assets', JSON.stringify(updatedData)); // Save changes immediately
        console.log('Asset returned and saved to localStorage:', updatedData); // Debugging
        closeViewAssetModal();
    };

    return (
        <div className='updateAssetDevicesPage'>
            {/* Main Header */}
            <div className="landingPageMainHeader">
                <img src={philtecLogo} alt="logo" onClick={goToDashboard} />
            </div>

            <div className='landingPageHeaderFooter'>
                <NavLink to="/Dashboard" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>DASHBOARD</NavLink>
                <NavLink to="/AvailableDevices" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>AVAILABLE DEVICES</NavLink>
                <NavLink to="/UpdateAssetDevices" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>UPDATE ASSET DEVICES</NavLink>
            </div>

            <div className="updateAssetDevicesTableContainer">
                <h3>Issued Assets</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='tableHeader'>Asset Tag</th>
                            <th className="tableHeader">Device</th>
                            <th className="tableHeader">Model</th>
                            <th className="tableHeader">Brand</th>
                            <th className="tableHeader">Type</th>
                            <th className="tableHeader">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((asset) => (
                            <tr key={asset.assetTag}>
                                <td
                                    className='tableCell idColumn'
                                    onClick={() => {
                                        setSelectedAsset(asset);
                                        setIsViewAssetModalOpen(true);
                                    }}
                                >
                                    {asset.assetTag}
                                </td>
                                <td className="tableCell">{asset.deviceName}</td>
                                <td className="tableCell">{asset.model}</td>
                                <td className="tableCell">{asset.brand}</td>
                                <td className="tableCell">{asset.type}</td>
                                <td className="tableCell">{asset.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isViewAssetModalOpen && selectedAsset && (
                <div className='viewAssetModal'>
                    <div className='viewAssetModalContent'>
                        <h4 className='modalTitle'>Asset Details</h4>
                        <div className='assetInfo'>
                            <p><strong>Asset Tag:</strong> {selectedAsset.assetTag}</p>
                            <p><strong>Device Name:</strong> {selectedAsset.deviceName}</p>
                            <p><strong>Model:</strong> {selectedAsset.model}</p>
                            <p><strong>Brand:</strong> {selectedAsset.brand}</p>
                            <p><strong>Type:</strong> {selectedAsset.type}</p>
                            <p><strong>Status:</strong> {selectedAsset.status}</p>
                        </div>
                        <div className='modalActions'>
                            <button className='btn closeBtn' onClick={closeViewAssetModal}>Close</button>
                            {selectedAsset.status === "Issued" && (
                                <button
                                    className='btn returnBtn'
                                    onClick={() => handleReturnAsset(selectedAsset.assetTag)}
                                >
                                    Return
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateAssetDevices;
