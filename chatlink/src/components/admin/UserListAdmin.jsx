import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { getAllUser, updateUser, deleteUser, blockUser, createUser } from '../api/UserRequest';

const UserListAdmin = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '', country: '' });
    const [editingUserId, setEditingUserId] = useState(null);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUser();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSaveUser = async () => {
        try {
            if (editingUserId) {
                // Update existing user
                const response = await updateUser(editingUserId, formData);
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === editingUserId ? response.data.user : user))
                );
            } else {
                // Create new user
                const response = await createUser(formData);
                setUsers((prevUsers) => [...prevUsers, response.data.user]);
            }
            closeModal();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleEditUser = (user) => {
        setFormData({ firstname: user.firstname, lastname: user.lastname, username: user.username, country: user.country });
        setEditingUserId(user._id);
        setShowModal(true);
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleBlockUser = async (id) => {
        try {
            await blockUser(id);
            alert('User blocked successfully');
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const handleCreateUser = () => {
        setFormData({ firstname: '', lastname: '', username: '', country: '' });
        setEditingUserId(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ firstname: '', lastname: '', username: '', country: '' });
        setEditingUserId(null);
    };

    return (
        <>
            <h2 className="mb-4 mt-3 text-light" >All User List</h2><br/>
            <Button variant="warning" className="mb-3" onClick={handleCreateUser}>
                Create New User
            </Button>

            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Country</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <img
                                    src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}default.png`}
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="40"
                                />
                            </td>
                            <td>{`${user.firstname} ${user.lastname}`}</td>
                            <td>{user.username}</td>
                            <td>{user.followers.length}</td>
                            <td>{user.following.length}</td>
                            <td>{user.country}</td>
                            <td>{new Date(user.createdAt).toLocaleString()}</td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => handleEditUser(user)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" className="me-2" onClick={() => handleDeleteUser(user._id)}>
                                    Delete
                                </Button>
                                <Button variant="warning" size="sm" onClick={() => handleBlockUser(user._id)}>
                                    Block
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Create/Edit Modal */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingUserId ? 'Edit User' : 'Create User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.firstname}
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.lastname}
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserListAdmin;
