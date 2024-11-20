import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import philtecLogo from '../Assets/philtecLogo.png';
import './AvailableDevices.css';

function AvailableDevices() {
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

    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem('users');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    return parsedData; // Use stored data if available
                }
            } catch (error) {
                console.error('Error parsing stored data', error);
            }
        }
        // Fallback to default data
        return [
            { assetTag: 1960000, deviceName: "Laptop", model: "5400", brand: "Dell", type: "Service Unit", status: "Not Issued" },
            { assetTag: 1960001, deviceName: "Laptop", model: "T14", brand: "Lenovo", type: "Inventory", status: "Not Issued"},
            { assetTag: 1960002, deviceName: "Laptop", model: "T490", brand: "Lenovo", type: "Service Unit", status: "Not Issued"},
            { assetTag: 1960003, deviceName: "Laptop", model: "5440", brand: "Dell", type: "Inventory", status: "Not Issued"},
        ];
    });


    const [newUser, setNewUser] = useState({
        assetTag: '',
        deviceName: 'Laptop',
        model: '',
        brand: '',
        type: '',
        status: 'Not Issued'
    });

    const [isAddNewUserModalOpen, setIsAddNewUserModalOpen] = useState(false);
    const [isViewAssetModalOpen, setIsViewAssetModalOpen] = useState(false);
    const [isNameInputModalOpen, setIsNameInputModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [issuerName, setIssuerName] = useState('');

    // Load data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('users');
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
        if (data && data.length > 0) {
            localStorage.setItem('users', JSON.stringify(data));
            console.log(localStorage);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleAddUser = () => {
        if (newUser.assetTag && newUser.deviceName && newUser.model && newUser.brand && newUser.type) {
            setData([
                ...data,
                {
                    assetTag: parseInt(newUser.assetTag),
                    deviceName: newUser.deviceName,
                    model: newUser.model,
                    brand: newUser.brand,
                    type: newUser.type,
                    status: newUser.status,  // status will always be "Not Issued" by default
                }
            ]);
            setNewUser({ assetTag: '', deviceName: 'Laptop', model: '', brand: '', type: '', status: 'Not Issued' }); // reset values
            setIsAddNewUserModalOpen(false);
        } else {
            alert('Please fill in all fields');
        }

    };    
    const handleDeleteAsset = () => {
        if (selectedAsset) {
            // Delete the selected asset using the assetTag
            deleteAsset(selectedAsset.assetTag);
    
            // Close the modal after deletion
            closeViewAssetModal();
        }
    };
    
    const deleteAsset = (assetTag) => {
        setData(prevData => prevData.filter(asset => asset.assetTag !== assetTag));
    };  
    const toggleAddNewUserModal = () => {
        setIsAddNewUserModalOpen(!isAddNewUserModalOpen);
    };

    const closeViewAssetModal = () => {
        setIsViewAssetModalOpen(false);
        setSelectedAsset(null);
    };

    const handleIssuedButtonClick = () => {
        setIsNameInputModalOpen(true);
    };

    const handleNameInputChange = (e) => {
        setIssuerName(e.target.value);
    };

    const handleDone = () => {
        setIsNameInputModalOpen(false);
        setIsConfirmModalOpen(true);
    };

    const handleConfirm = () => {
        // Update the status to "Issued" and add the issuer's name
        const updatedData = data.map((asset) =>
            asset.assetTag === selectedAsset.assetTag ? { ...asset, status: 'Issued', issuedBy: issuerName } : asset
        );
        setData(updatedData);
        setIsConfirmModalOpen(false);
        setIsViewAssetModalOpen(false);
        setSelectedAsset(null);
    };

    const handleCancelConfirm = () => {
        setIsConfirmModalOpen(false);
    };


    return (
        <div className='availableDevicesPage'>
            {/* Main Header */}
            <div className="landingPageMainHeader">
                <img src={philtecLogo} alt="rndmImg" onClick={goToDashboard} />
            </div>

            <div className='landingPageHeaderFooter'>
                <NavLink to="/Dashboard" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>DASHBOARD</NavLink>
                <NavLink to="/AvailableDevices" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>AVAILABLE DEVICES</NavLink>
                <NavLink to="/UpdateAssetDevices" className={({ isActive }) => `text ${isActive ? 'active' : ''}`}>UPDATE ASSET DEVICES</NavLink>
            </div>

            <div className="availableDevicesTableContainer">
                <div className='tableContainerHeader'>
                    <h3>Available Assets</h3>
                    <button onClick={toggleAddNewUserModal} className="addUserButton">Add Asset</button>
                </div>

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
                        {data.map((user) => (
                            <tr key={user.assetTag}>
                                <td
                                    className='tableCell idColumn'
                                    onClick={() => {
                                        setSelectedAsset(user);
                                        setIsViewAssetModalOpen(true);
                                    }}
                                >
                                    {user.assetTag}
                                </td>
                                <td className="tableCell">{user.deviceName}</td>
                                <td className="tableCell">{user.model}</td>
                                <td className="tableCell">{user.brand}</td>
                                <td className="tableCell">{user.type}</td>
                                <td className="tableCell">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddNewUserModalOpen && (
                <div className="addNewUserModal">
                    <div className="addNewUserModalContent">
                        <h1>Add New Asset</h1>

                        <form className="addNewUserForm">
                            <div className="formGroup">
                                <label htmlFor="assetTag">Asset Tag</label>
                                <input
                                    type="number"
                                    name="assetTag"
                                    id="assetTag"
                                    placeholder="Asset Tag"
                                    value={newUser.assetTag}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="deviceName">Device Name</label>
                                <input
                                    type="text"
                                    name="deviceName"
                                    id="deviceName"
                                    value="Laptop"
                                    readOnly
                                />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="model">Model</label>
                                <select
                                    name="model"
                                    id="model"
                                    value={newUser.model}
                                    onChange={handleInputChange}
                                >
                                    <option value="5400">5400</option>
                                    <option value="T14">T14</option>
                                    <option value="T490">T490</option>
                                    <option value="5440">5440</option>
                                </select>
                            </div>

                            <div className="formGroup">
                                <label>Brand</label>
                                <div className="radioGroup">
                                    <label>
                                        <input
                                            type="radio"
                                            name="brand"
                                            value="Dell"
                                            checked={newUser.brand === 'Dell'}
                                            onChange={handleInputChange}
                                        /> Dell
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="brand"
                                            value="Lenovo"
                                            checked={newUser.brand === 'Lenovo'}
                                            onChange={handleInputChange}
                                        /> Lenovo
                                    </label>
                                </div>
                            </div>

                            <div className="formGroup">
                                <label>Type</label>
                                <div className="radioGroup">
                                    <label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="service unit"
                                            checked={newUser.type === 'service unit'}
                                            onChange={handleInputChange}
                                        /> Service Unit
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="inventory"
                                            checked={newUser.type === 'inventory'}
                                            onChange={handleInputChange}
                                        /> Inventory
                                    </label>
                                </div>
                            </div>

                            {/* Adding status field with default value */}
                            <div className="formGroup">
                                <label htmlFor="status">Status</label>
                                <input
                                    type="text"
                                    name="status"
                                    id="status"
                                    value="Not Issued"
                                    readOnly
                                />
                            </div>

                            <button type="button" className="addNewUserModalButton" onClick={handleAddUser}>Add Asset</button>
                            <button type="button" className="closeAddNewUserModalButton" onClick={toggleAddNewUserModal}>Close</button>
                        </form>
                    </div>
                </div>
            )}

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
                            <button className='btn issueBtn' onClick={handleIssuedButtonClick}>Issue</button>
                            <button className='btn deleteBtn' onClick={handleDeleteAsset}>Delete</button>
                            <button className='btn closeBtn' onClick={closeViewAssetModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {isNameInputModalOpen && (
                <div className='modal z-index-10'>
                    <div className='modalContent'>
                        <h4>Enter Issuer Name</h4>
                        <input
                            type="text"
                            value={issuerName}
                            onChange={handleNameInputChange}
                            placeholder="Enter the issuer's name"
                        />
                        <button onClick={handleDone}>Done</button>
                        <button onClick={() => setIsNameInputModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {isNameInputModalOpen && (
                <div className='issuedNameInputOverlay'>
                    <div className='modalContentContainer'>
                        <h4>Enter Issuer Name</h4>
                        <input
                            type="text"
                            value={issuerName}
                            onChange={handleNameInputChange}
                            placeholder="Enter the issuer's name"
                        />
                        <button onClick={handleDone}>Done</button>
                        <button onClick={() => setIsNameInputModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {isConfirmModalOpen && (
                <div className='confirmationModalOverlay'>
                    <div className='modalContentContainer'>
                        <h4>Are you sure you want to mark this asset as Issued?</h4>
                        <button onClick={handleConfirm}>Yes</button>
                        <button onClick={handleCancelConfirm}>No</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AvailableDevices;
