import { useState } from "react"

export default function Lender(props){
  const { 
    lender, 
    removeLender,
    editLender,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const [editFirstName, setEditFirstName] = useState(lender.first_name)
  const [editMiddleName, setEditMiddleName] = useState(lender.mid_init)
  const [editLastName, setEditLastName] = useState(lender.last_name)
  const [editPhone, setEditPhone] = useState(lender.phone)
  const [editEmail, setEditEmail] = useState(lender.email)
  const [editNotes, setEditNotes] = useState(lender.notes)

  // This function enables the edit mode for existing entries
  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  // This function is triggered by a save button to initiate the PUT request
  // in the ProperiesPage
  const saveChanges = () => {
    setEditMode(false);
    const updatedLender = {
      ...lender,
      first_name: editFirstName,
      mid_init: editMiddleName,
      last_name: editLastName,
      phone: editPhone,
      email: editEmail,
      notes: editNotes,
    }
    editLender(lender.id, updatedLender);
  }

  return(
    <div className="property_container">
      <div className="property_info_container">
        <div className="name">
          <input 
            className="first_name_input"
            placeholder="First Name"
            value={editFirstName}
            disabled={!editMode}
            onChange={(e) => setEditFirstName(e.target.value)}
          />
          <input 
            className="middle_name_input"
            placeholder="M.I."
            value={editMiddleName}
            disabled={!editMode}
            onChange={(e) => setEditMiddleName(e.target.value)}
          />
          <input 
            className="last_name_input"
            placeholder="Last Name"
            value={editLastName}
            disabled={!editMode}
            onChange={(e) => setEditLastName(e.target.value)}
          />
        </div>
        <div className="contact_box">
          <div className="phone">
            <input 
              className="city_dynamic_input"
              placeholder="Phone"
              value={editPhone}
              disabled={!editMode}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </div>
          <div className="email">
            <input 
              className="state_dynamic_input"
              placeholder="Email"
              value={editEmail}
              disabled={!editMode}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <textarea 
              className="notes_box"
              name="" 
              id="" 
              cols="30" 
              rows="4"
              placeholder="Notes"
              value={editNotes}
              disabled={!editMode}
              onChange={(e) => setEditNotes(e.target.value)}
            >  
            </textarea>
          </div>   
        </div>
      </div>
      <div id="button_container">
        <div className="viewing_button_container">
          {!editMode ? (
            <div id="edit_button_container">
              <button onClick={toggleEditMode}>Edit Lender</button>
            </div>
          ) : (
            <div id="editing_button_container">
              <div id="edit_button_container">
                <button onClick={toggleEditMode}>Discard Changes</button>
              </div>
              <div id="remove_button_container">
                <button onClick={saveChanges}>Save Changes</button>
              </div>
            </div>
          )}
          <div id="remove_button_container">
            <button onClick={() => removeLender(lender.id)}>Remove Lender</button>
          </div>
        </div>
      </div>
    </div>
  )
}