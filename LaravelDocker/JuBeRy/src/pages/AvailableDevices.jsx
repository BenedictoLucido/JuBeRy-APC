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

    // Declare the state for user data
    const [data, setData] = useState([
        { id: 1960000, name: "John Doe", age: 25, gender: "Male", number: "123-456-7890" },
        { id: 1960001, name: "Jane Smith", age: 30, gender: "Female", number: "987-654-3210" },
        { id: 1960002, name: "Alice Brown", age: 22, gender: "Female", number: "555-123-4567" },
        { id: 1960003, name: "Bob Johnson", age: 28, gender: "Male", number: "444-567-8901" },
    ]);

    // Input state for the AddNewUserModal form
    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        age: '',
        gender: '',
        number: ''
    });

    // AddNewUserModal visibility state
    const [isAddNewUserModalOpen, setIsAddNewUserModalOpen] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    // Add new user to the table
    const handleAddUser = () => {
        if (newUser.id && newUser.name && newUser.age && newUser.gender && newUser.number) {
            setData([
                ...data,
                {
                    id: parseInt(newUser.id),
                    name: newUser.name,
                    age: parseInt(newUser.age),
                    gender: newUser.gender,
                    number: newUser.number
                }
            ]);
            setNewUser({ id: '', name: '', age: '', gender: '', number: '' }); // Reset input fields
            setIsAddNewUserModalOpen(false); // Close the AddNewUserModal
        } else {
            alert('Please fill in all fields');
        }
    };

    // Toggle the AddNewUserModal visibility
    const toggleAddNewUserModal = () => {
        setIsAddNewUserModalOpen(!isAddNewUserModalOpen);
    };

    return (
        <div className='availableDevicesPage'>
            {/* Main Header */}
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

            {/* Body - This is where the table will be placed */}
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
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td className='tableCell idColumn'>{user.id}</td>
                                <td className="tableCell">{user.name}</td>
                                <td className="tableCell">{user.age}</td>
                                <td className="tableCell">{user.gender}</td>
                                <td className="tableCell">{user.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* AddNewUserModal */}
            {isAddNewUserModalOpen && (
                <div className="addNewUserModal">
                    <div className="addNewUserModalContent">
                        <h4>Add New User</h4>
                        <input
                            type="number"
                            name="id"
                            placeholder="ID"
                            value={newUser.id}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newUser.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={newUser.age}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            value={newUser.gender}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="number"
                            placeholder="Number"
                            value={newUser.number}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleAddUser}>Add User</button>
                        <button onClick={toggleAddNewUserModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AvailableDevices;
