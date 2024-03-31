import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const CoinRequest = () => {
  const [coinRequests, setCoinRequests] = useState([]);

  useEffect(() => {
    fetchCoinRequests();
  }, []);

  const fetchCoinRequests = async () => {
    try {
      const response = await axios.get('/coins-requests');
      setCoinRequests(response.data.coin_requests);
    } catch (error) {
      console.error('Error fetching coin requests:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`coins-requests/${id}/accept`);
      fetchCoinRequests();
    } catch (error) {
      console.error('Error approving coin request:', error);
    }
  };

  const handleDiscard = async (id) => {
    try {
      await axios.post(`coins-requests/${id}/discard`);
      fetchCoinRequests();
    } catch (error) {
      console.error('Error discarding coin request:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Adjust as per your needs
  };

  return (
    <div className='coin-request'>
      <h2>Request Coin</h2>
      <table className='coin-request-table'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Amount</th>
            <th>Request Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coinRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.user_id}</td>
              <td>{request.amount} $</td>
              <td>{formatDate(request.created_at)}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <button className='approve-btn' onClick={() => handleApprove(request.id)}>Approve</button>
                    <button className='discard-btn' onClick={() => handleDiscard(request.id)}>Discard</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinRequest;
