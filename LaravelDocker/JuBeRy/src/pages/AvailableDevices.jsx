import React, { useState } from 'react';
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

    const [data, setData] = useState([
        { id: 1960000, name: "John Doe", age: 25, gender: "Male", number: "123-456-7890", status: "Not Issued" },
        { id: 1960001, name: "Jane Smith", age: 30, gender: "Female", number: "987-654-3210", status: "Not Issued"},
        { id: 1960002, name: "Alice Brown", age: 22, gender: "Female", number: "555-123-4567", status: "Not Issued"},
        { id: 1960003, name: "Bob Johnson", age: 28, gender: "Male", number: "444-567-8901", status: "Not Issued"},
    ]);

    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        age: '',
        gender: '',
        number: '',
        status: 'Not Issued'
    });

    const [isAddNewUserModalOpen, setIsAddNewUserModalOpen] = useState(false);
    const [isViewAssetModalOpen, setIsViewAssetModalOpen] = useState(false);
    const [isNameInputModalOpen, setIsNameInputModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [issuerName, setIssuerName] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleAddUser = () => {
        if (newUser.id && newUser.name && newUser.age && newUser.gender && newUser.number && newUser.status) {
            setData([
                ...data,
                {
                    id: parseInt(newUser.id),
                    name: newUser.name,
                    age: parseInt(newUser.age),
                    gender: newUser.gender,
                    number: newUser.number,
                    status: newUser.status,
                }
            ]);
            setNewUser({ id: '', name: '', age: '', gender: '', number: '', status: '' });
            setIsAddNewUserModalOpen(false);
        } else {
            alert('Please fill in all fields');
        }
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
            asset.id === selectedAsset.id ? { ...asset, status: 'Issued', issuedBy: issuerName } : asset
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
                            <th className='tableHeader'>ID:</th>
                            <th className="tableHeader">Name</th>
                            <th className="tableHeader">Age</th>
                            <th className="tableHeader">Gender</th>
                            <th className="tableHeader">Number</th>
                            <th className="tableHeader">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td
                                    className='tableCell idColumn'
                                    onClick={() => {
                                        setSelectedAsset(user);
                                        setIsViewAssetModalOpen(true);
                                    }}
                                >
                                    {user.id}
                                </td>
                                <td className="tableCell">{user.name}</td>
                                <td className="tableCell">{user.age}</td>
                                <td className="tableCell">{user.gender}</td>
                                <td className="tableCell">{user.number}</td>
                                <td className="tableCell">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddNewUserModalOpen && (
                <div className="addNewUserModal">
                    <div className="addNewUserModalContent">
                        <h4>Add New User</h4>
                        <input type="number" name="id" placeholder="ID" value={newUser.id} onChange={handleInputChange} />
                        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} />
                        <input type="number" name="age" placeholder="Age" value={newUser.age} onChange={handleInputChange} />
                        <input type="text" name="gender" placeholder="Gender" value={newUser.gender} onChange={handleInputChange} />
                        <input type="text" name="number" placeholder="Number" value={newUser.number} onChange={handleInputChange} />
                        <button onClick={handleAddUser}>Add User</button>
                        <button onClick={toggleAddNewUserModal}>Close</button>
                    </div>
                </div>
            )}

            {isViewAssetModalOpen && selectedAsset && (
                <div className='viewAssetModal'>
                    <div className='viewAssetModalContent'>
                        <h4>Asset Details</h4>
                        <p><strong>ID:</strong> {selectedAsset.id}</p>
                        <p><strong>Name:</strong> {selectedAsset.name}</p>
                        <p><strong>Age:</strong> {selectedAsset.age}</p>
                        <p><strong>Gender:</strong> {selectedAsset.gender}</p>
                        <p><strong>Number:</strong> {selectedAsset.number}</p>
                        <p><strong>Status:</strong> {selectedAsset.status}</p>
                        <button onClick={handleIssuedButtonClick}>Issued</button>
                        <button onClick={closeViewAssetModal}>Close</button>
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
