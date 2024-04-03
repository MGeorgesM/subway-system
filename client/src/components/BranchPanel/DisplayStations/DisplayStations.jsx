import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../core/tools/apiRequest";
import { requestMethods } from "../../../core/tools/apiRequestMethods";

const DisplayStations = () => {
  const [stationData, setStationData] = useState([]);

  const fetchStations = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, "stations/getAll");
      setStationData(response.data.stations);
    } catch (error) {
      console.error("Error fetching stations:", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <div className="station-list">
      <h2>Display Stations</h2>
      <table className="station-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stationData.map((station) => (
            <tr key={station.id}>
              <td>{station.id}</td>
              <td>{station.name}</td>
              <td>{station.location}</td>
              <td>{station.lat}</td>
              <td>{station.lng}</td>
              <td>{station.opening_time}</td>
              <td>{station.closing_time}</td>
              <td>
                {station.active === 1 ? (
                  <span>Active</span>
                ) : (
                  <span>Not Active</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayStations;
