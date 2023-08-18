import { useState } from "react"

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

  // This function enables the edit mode for existing entries
  const toggleEditMode = () => {
    setEditMode(!editMode);
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
    <div className="property_container">
      <div className="property_info_container">
      <div className="street">
        <input 
          className="street_dynamic_input"
          placeholder="Street Address"
          value={editStreet}
          disabled={!editMode}
          onChange={(e) => setEditStreet(e.target.value)}
        />
      </div>
        <div className="city_state_zip_box">
          <div className="city">
            <input 
              className="city_dynamic_input"
              placeholder="City"
              value={editCity}
              disabled={!editMode}
              onChange={(e) => setEditCity(e.target.value)}
            />
          </div>
          <div className="state">
            <input 
              className="state_dynamic_input"
              placeholder="State"
              value={editState}
              disabled={!editMode}
              onChange={(e) => setEditState(e.target.value)}
            />
          </div>
          <div className="zip">
            <input 
              className="zip_dynamic_input"
              placeholder="Zip"
              value={editZip}
              disabled={!editMode}
              onChange={(e) => setEditZip(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>
            <input 
              type="checkbox"
              checked={editHOA}
              disabled={!editMode}
              onChange={(e) => setEditHOA(e.target.checked)}
            />
            Part of a HOA or Condo Association
          </label>
        </div>
        <div>
          <label>
            <input 
              type="checkbox"
              checked={editWell}
              disabled={!editMode}
              onChange={(e) => setEditWell(e.target.checked)}
            />
            Has a private well
          </label>
        </div>
        <div>
          <label>
            <input 
              type="checkbox"
              checked={editSeptic}
              disabled={!editMode}
              onChange={(e) => setEditSeptic(e.target.checked)}
            />
            Has a private septic tank
          </label>
        </div>
      </div>
      <div id="button_container">
        <div id="viewing_button_container">
          {!editMode ? (
            <div id="edit_button_container">
              <button onClick={toggleEditMode}>Edit</button>
            </div>
          ) : (
            <div id="editing_button_container">
              <div id="edit_button_container">
                <button onClick={toggleEditMode}>Cancel</button>
              </div>
              <div id="remove_button_container">
                <button onClick={saveChanges}>Save</button>
              </div>
            </div>
          )}
          <div id="remove_button_container">
            <button onClick={() => removeProperty(property.id)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}