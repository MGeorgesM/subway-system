import React, { useEffect, useState } from 'react';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

const DisplayUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, '/users/get');
      const filteredUsers = response.data.users.filter(user => user.role_id === 1);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='user-list'>
      <h2>Display Users</h2>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.location}</td>
              <td>{user.coins_balance} $</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayUser;
