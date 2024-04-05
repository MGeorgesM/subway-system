import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../core/tools/apiRequest";
import { requestMethods } from "../../../core/tools/apiRequestMethods";
import "./Facilities.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Facilities = () => {
  const [facilityData, setFacilityData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editedFacility, setEditedFacility] = useState({
    id: "",
    station_id: "",
    facility_id: "",
  });

  const fetchStationFacilities = async () => {
    try {
      const response = await sendRequest(
        requestMethods.GET,
        "stationsfacilities/get"
      );
      setFacilityData(response.data.facilities);
      console.log(response);
    } catch (error) {
      console.error("Error fetching facilities:", error.response.data.message);
    }
  };

  //   const updateFacility = async () => {
  //     try {
  //       const response = await sendRequest(
  //         requestMethods.POST,
  //         `facilities/update/${editedFacility.id}`,
  //         editedFacility
  //       );
  //       console.log("Facility updated:", response.data);
  //       fetchFacilities();
  //     } catch (error) {
  //       console.log("Error updating station:", error.response.data.message);
  //     }
  //   };

  const handleEdit = (id) => {
    const facilityToEdit = facilityData.find(
      (facilities) => facilities.id === id
    );
    if (facilityToEdit) {
      setEditedFacility(facilityToEdit);
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
    // updateFacility();
    closeEdit();
  };

  useEffect(() => {
    fetchStationFacilities();
  }, []);

  return (
    <div className="station-list">
      {/* {isEditing && <div className="blurred-background"></div>}
      {isEditing && (
        <div className="branch-editting">
          <div className="input-group">
            <label>ID: </label>
            <input
              type="text"
              value={editedFacility.id}
              onChange={(e) =>
                setEditedFacility({ ...editedFacility, id: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label>Station ID: </label>
            <input
              type="text"
              value={editedFacility.station_id}
              onChange={(e) =>
                setEditedFacility({
                  ...editedFacility,
                  station_id: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label>facility ID</label>
            <input
              type="text"
              value={editedFacility.facility_id}
              onChange={(e) =>
                setEditedFacility({
                  ...editedFacility,
                  facility_id: e.target.value,
                })
              }
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
              <th>Station ID</th>
              <th>Facility ID</th>
            </tr>
          </thead>
          <tbody>
            {facilityData.map((facility) => (
              <tr key={facility.id}>
                <td>{facility.id}</td>
                <td>{facility.station_id}</td>
                <td>{facility.facility_id}</td>

                <td>
                  <button
                    className="activate-btn"
                    onClick={() => handleEdit(facility.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Facilities;
