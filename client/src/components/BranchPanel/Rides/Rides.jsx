import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../core/tools/apiRequest";
import { requestMethods } from "../../../core/tools/apiRequestMethods";
import "./Rides.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Rides = () => {
  const [ridesData, setRidesData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editedRides, setEditedRides] = useState({
    id: "",
    name: "",
    start_station_id: "",
    end_station_id: "",
    start_time: "",
    end_time: "",
    price: "",
  });

  const fetchRides = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, "rides/getAll");
      setRidesData(response.data.rides);
      console.log(response);
    } catch (error) {
      console.error("Error fetching facilities:", error.response.data.message);
    }
  };

  const updateRides = async () => {
    try {
      const response = await sendRequest(
        requestMethods.POST,
        `rides/update/${editedRides.id}`,
        editedRides
      );
      console.log("Rides updated:", response.data);
      fetchRides();
    } catch (error) {
      console.log("Error updating rides:", error.response.data.message);
    }
  };

  const handleEdit = (id) => {
    const ridesToEdit = ridesData.find((rides) => rides.id === id);
    if (ridesToEdit) {
      setEditedRides(ridesToEdit);
      setIsEditing(true);
      console.log("Editing Facility with ID:", id);
    } else {
      console.error("Facility not found for editing");
    }
  };

  const closeEdit = () => {
    setIsEditing(false);
  };

  const confirmEdit = () => {
    updateRides();
    closeEdit();
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="station-list">
      {isEditing && <div className="blurred-background"></div>}
      {isEditing && (
        <div className="branch-editting">
          <div className="input-group">
            <label>ID: </label>
            <input
              type="text"
              value={editedRides.id}
              onChange={(e) =>
                setEditedRides({ ...editedRides, id: e.target.value })
              }
              disabled
            />
          </div>

          <div className="input-group">
            <label>Name: </label>
            <input
              type="text"
              value={editedRides.name}
              onChange={(e) =>
                setEditedRides({
                  ...editedRides,
                  name: e.target.value,
                })
              }
              disabled
            />
          </div>

          <div className="input-group">
            <label>Start Station ID: </label>
            <input
              type="text"
              value={editedRides.start_station_id}
              onChange={(e) =>
                setEditedRides({
                  ...editedRides,
                  start_station_id: e.target.value,
                })
              }
              disabled
            />
          </div>

          <div className="input-group">
            <label>End Station ID: </label>
            <input
              type="text"
              value={editedRides.end_station_id}
              onChange={(e) =>
                setEditedRides({
                  ...editedRides,
                  end_station_id: e.target.value,
                })
              }
              disabled
            />
          </div>

          <div className="input-group">
            <label>Start Time: </label>
            <input
              type="text"
              value={
                editedRides.start_time && editedRides.start_time.substring
                  ? editedRides.start_time.substring(0, 5)
                  : ""
              }
              onChange={(e) =>
                setEditedRides({
                  ...editedRides,
                  start_time: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label>End Time: </label>
            <input
              type="text"
              value={
                editedRides.end_time && editedRides.end_time.substring
                  ? editedRides.end_time.substring(0, 5)
                  : ""
              }
              onChange={(e) =>
                setEditedRides({
                  ...editedRides,
                  end_time: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Price: </label>
            <input
              type="text"
              value={editedRides.price}
              onChange={(e) =>
                setEditedRides({
                  ...editedRides,
                  price: e.target.value,
                })
              }
              disabled
            />
          </div>

          <div className="confirm-error">{errorMessage}</div>

          <div className="branched-buttons">
            <button onClick={confirmEdit}>Confirm</button>
            <button onClick={closeEdit}>Close</button>
          </div>
        </div>
      )}

      <div className="user-list">
        <h2>Display Facilities</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start station ID</th>
              <th>End station ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ridesData.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.name}</td>
                <td>{ride.start_station_id}</td>
                <td>{ride.end_station_id}</td>
                <td>{ride.start_time}</td>
                <td>{ride.end_time}</td>
                <td>{ride.price}</td>

                <td>
                  <button
                    className="activate-btn"
                    onClick={() => handleEdit(ride.id)}
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

export default Rides;
