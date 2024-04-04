import React, { useEffect, useState } from 'react';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

const DisplayRide = () => {
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, '/rides/getAll');
      setRides(response.data.rides);
      console.log(response);
    } catch (error) {
      console.error('Error fetching rides:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  useEffect(() => {
    document.body.classList.add('display-user-active');
  return () => {
      document.body.classList.remove('display-user-active');
    };
  }, []);

  return (
    <div className='user-list'>
      <h2>Display Rides</h2>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Ride Name</th>
            <th>Start Station</th>
            <th>End Station</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.name}</td>
              <td>{ride.start_station.name}</td>
              <td>{ride.end_station.name}</td>
              <td>{ride.start_time}</td>
              <td>{ride.end_time}</td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default DisplayRide;
