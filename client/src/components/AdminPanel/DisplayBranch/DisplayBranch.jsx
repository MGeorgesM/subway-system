import React, { useEffect, useState } from 'react';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

const DisplayBranch = () => {
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

  return (
    <div className='user-list'>
      <h2>Display Branches</h2>
      <table className='user-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Branch Name</th>
            <th>Email</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              <td>{branch.id}</td>
              <td>{branch.first_name} {branch.last_name}</td>
              <td>{branch.email}</td>
              <td>{branch.lat}</td>
              <td>{branch.lng}</td>
              <td>{branch.active === 1 ? <span>Active</span> : <span>Not Active</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBranch;
