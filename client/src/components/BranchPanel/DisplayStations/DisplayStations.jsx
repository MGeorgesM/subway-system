import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../core/tools/apiRequest";
import { requestMethods } from "../../../core/tools/apiRequestMethods";
import "./DisplayStations.css";

const DisplayStations = () => {
  const [stationData, setStationData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStation, setEditedStation] = useState({
    id: "",
    name: "",
    location: "",
    lat: "",
    lng: "",
    opening_time: "",
    closing_time: "",
    active: "",
  });

  const fetchStations = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, "stations/getAll");
      setStationData(response.data.stations);
    } catch (error) {
      console.error("Error fetching stations:", error.response.data.message);
    }
  };

  const updateStations = async () => {
    try {
      const response = await sendRequest(
        requestMethods.POST,
        `stations/update/${editedStation.id}`,
        editedStation
      );
      console.log("Station updated:", response.data);
      fetchStations();
    } catch (error) {
      console.log("Error updating stating:", error.response.data.message);
    }
  };

  const handleEdit = (id) => {
    const stationToEdit = stationData.find((station) => station.id === id);
    if (stationToEdit) {
      setEditedStation(stationToEdit);
      setIsEditing(true);
      console.log("Editing station with ID:", id);
    } else {
      console.error("Station not found for editing");
    }
  };

  const closeEdit = () => {
    setIsEditing(false);
  };

  const confirmEdit = () => {
    updateStations();
    closeEdit();
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <div className="station-list">
      {isEditing && <div className="blurred-background"></div>}
      {isEditing && (
        <div className="branch-editting">
          <div className="input-group">
            <label>ID:</label>
            <input
              type="text"
              value={editedStation.id}
              onChange={(e) =>
                setEditedStation({ ...editedStation, id: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              value={editedStation.name}
              onChange={(e) =>
                setEditedStation({ ...editedStation, name: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Location:</label>
            <input
              type="text"
              value={editedStation.location}
              onChange={(e) =>
                setEditedStation({ ...editedStation, location: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Latitude:</label>
            <input
              type="text"
              value={editedStation.lat}
              onChange={(e) =>
                setEditedStation({ ...editedStation, lat: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Longitude:</label>
            <input
              type="text"
              value={editedStation.lng}
              onChange={(e) =>
                setEditedStation({ ...editedStation, lng: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Opening Time:</label>
            <input
              type="text"
              value={
                editedStation.opening_time
                  ? editedStation.opening_time.substring(0, 5)
                  : ""
              }
              onChange={(e) =>
                setEditedStation({
                  ...editedStation,
                  opening_time: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label>Closing Time:</label>
            <input
              type="text"
              value={
                editedStation.closing_time
                  ? editedStation.closing_time.substring(0, 5)
                  : ""
              }
              onChange={(e) =>
                setEditedStation({
                  ...editedStation,
                  closing_time: e.target.value,
                })
              }
            />
          </div>
          <div className="branched-buttons">
            <button onClick={confirmEdit}>Confirm</button>
            <button onClick={closeEdit}>Close</button>
          </div>
        </div>
      )}

      <div className="user-list">
        <h2>Display Stations</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td>
                  <button
                    className="activate-btn"
                    onClick={() => handleEdit(station.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayStations;
