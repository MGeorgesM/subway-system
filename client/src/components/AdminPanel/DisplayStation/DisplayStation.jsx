import React, { useEffect, useState } from 'react';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

const DisplayStation = () => {
  const [stations, setStations] = useState([]);

  const fetchStations = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, '/stations/getAll');
      setStations(response.data.stations);
      console.log(response);
    } catch (error) {
      console.error('Error fetching stations:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <div className='user-list'>
      <h2>Display Stations</h2>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Station Name</th>
            <th>Station Location</th>
            <th>Opening Time</th>
            <th>Closing Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id}>
              <td>{station.id}</td>
              <td>{station.name}</td>
              <td>{station.location}</td>
              <td>{station.opening_time}</td>
              <td>{station.closing_time}</td>
              <td>{station.active === 1 ? <span>Active</span> : <span>Not Active</span>}</td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default DisplayStation;
