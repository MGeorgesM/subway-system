import React, { useEffect, useState } from 'react';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, '/users/get');
      const filteredUsers = response.data.users.filter(user => user.role_id === 2);
      setBranches(filteredUsers);
    } catch (error) {
      console.error('Error fetching branches:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    document.body.classList.add('display-user-active');
  return () => {
      document.body.classList.remove('display-user-active');
    };
  }, []);

  const handleActive = async (id) => {
    try {
      const response = await sendRequest(requestMethods.POST, `/users/${id}/active`);
      console.log('Branch activate:', response.data.message);
      fetchBranches();
    } catch (error) {
      console.error('Error activate branch:', error.response.data.message);
    }
  };

  const handleShutDown = async (id) => {
    try {
      const response = await sendRequest(requestMethods.POST, `/users/${id}/shutdown`);
      console.log('Branch shut down:', response.data.message);
      fetchBranches();
    } catch (error) {
      console.error('Error shutting down branch:', error.response.data.message);
    }
  };

  const handleDelete = async (branchId) => {
    try {
      const response = await sendRequest(requestMethods.DELETE, `/users/delete/${branchId}`);
      console.log('Branch deleted:', response.data.message);
      fetchBranches();
    } catch (error) {
      console.error('Error deleting branch:', error.response.data.message);
    }
  };

  return (
    <div className='user-list'>
      <h2>Branche Management</h2>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              <td>{branch.first_name} {branch.last_name}</td>
              <td>{branch.active === 1 ? <span>Active</span> : <span>Not Active</span>}</td>
              <td>
                <button className='activate-btn' onClick={() => handleActive(branch.id)}>Activate</button>
                <button className='shutdown-btn' onClick={() => handleShutDown(branch.id)}>Shut Down</button>
                <button className='delete-btn' onClick={() => handleDelete(branch.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchManagement;
