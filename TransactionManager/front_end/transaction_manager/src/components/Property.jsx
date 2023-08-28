import { useState } from "react"
import { useEffect } from "react";

export default function Property(props){

  const { 
    property, 
    removeProperty,
    editProperty,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const [editStreet, setEditStreet] = useState(property.street)
  const [editCity, setEditCity] = useState(property.city)
  const [editState, setEditState] = useState(property.state)
  const [editZip, setEditZip] = useState(property.zip)
  const [editHOA, setEditHOA] = useState(property.hoa)
  const [editWell, setEditWell] = useState(property.well)
  const [editSeptic, setEditSeptic] = useState(property.septic)

  // const [editAddress, setEditAddress] = useState([])


  // This function enables the edit mode for existing entries
  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
    setEditStreet(property?.street);
    setEditCity(property?.city);
    setEditZip(property?.zip);
    setEditHOA(property?.hoa);
    setEditWell(property?.well);
    setEditSeptic(property?.septic);
  }

  // This function is triggered by a save button to initiate the PUT request
  // in the ProperiesPage
  const saveChanges = () => {
    setEditMode(false);
    const updatedProperty = {
      ...property,
      street: editStreet,
      city: editCity,
      state: editState,
      zip: editZip,
      hoa: editHOA,
      well: editWell,
      septic: editSeptic,
    }
    editProperty(property.id, updatedProperty);
  }

  return(
    <>
    <div className="card border-2 mt-2">
      <div className="toast-header bg-secondary text-white d-flex justify-content-between align-items-center p-2">
      </div>
      <form className="row g-3 p-2">
        <div className="col-md-10">
          <label htmlFor="street" className="form-label">Street</label>
          <input 
            type="text" 
            className="form-control" 
            id="street"
            value={editStreet}
            disabled={!editMode}
            onChange={(e) => setEditStreet(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="city" className="form-label">City</label>
          <input 
            type="text" 
            className="form-control" 
            id="city"
            value={editCity}
            disabled={!editMode}
            onChange={(e) => setEditCity(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="state" className="form-label">State</label>
          <input 
            type="text" 
            className="form-control" 
            id="state"
            value={editState}
            disabled={!editMode}
            onChange={(e) => setEditState(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="zip" className="form-label">Zip Code</label>
          <input 
            type="text" 
            className="form-control" 
            id="zip"
            value={editZip}
            disabled={!editMode}
            onChange={(e) => setEditZip(e.target.value)}
          />
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-check-label " htmlFor="hoa-checkbox">HOA:</label>
            <input 
              className="form-check-input mx-2"
              id="hoa-checkbox"
              type="checkbox" 
              checked={editHOA}
              disabled={!editMode}
              onChange={(e) => setEditHOA(e.target.checked)}
            />
          </div>
          <div className="col">
            <label className="form-check-label" htmlFor="well-checkbox">Well:</label>
            <input 
              className="form-check-input mx-2"
              id="well-checkbox"
              type="checkbox" 
              checked={editWell}
              disabled={!editMode}
              onChange={(e) => setEditWell(e.target.checked)}
            />
          </div>
          <div className="col">
            <label className="form-check-label" htmlFor="septic-checkbox">Septic:</label>
            <input 
              className="form-check-input mx-2"
              id="septic-checkbox"
              type="checkbox" 
              checked={editSeptic}
              disabled={!editMode}
              onChange={(e) => setEditSeptic(e.target.checked)}
            />    
          </div>
        </div>
        <div className="col-12">
          {!editMode ? (
            <button 
            type="submit" 
            className="btn btn-primary"
            onClick={toggleEditMode}
            >Edit</button>
          ) : (
            <>
            <button 
              className="btn btn-outline-secondary"
              onClick={toggleEditMode}
            >Discard</button>
            <button 
              className="btn btn-warning mx-2"
              onClick={saveChanges}
            >Save</button>
            <button 
              className="btn btn-danger mx-2"
              onClick={(e) => removeProperty(e, property?.id)}
            >Delete</button>
            </>
          )}
        </div>
      </form>
    </div>
    </>
  )
}