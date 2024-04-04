import React, { useEffect, useState } from 'react';
import './index.css'

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

const DisplayUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, '/users/get');
      const filteredUsers = response.data.users.filter(user => user.role_id === 1);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error.response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    document.body.classList.add('display-user-active');
  return () => {
      document.body.classList.remove('display-user-active');
    };
  }, []);

  return (
    <div className='user-list-wrapper'>
      <div className='user-list'>
        <h2>Display Users</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.lat}</td>
                <td>{user.lng}</td>
                <td>{user.coins_balance} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayUser;
