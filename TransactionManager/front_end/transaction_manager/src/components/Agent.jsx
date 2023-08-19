import { useState } from "react"

export default function Agent(props){
  const { 
    agent, 
    removeAgent,
    editAgent,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const [editFirstName, setEditFirstName] = useState(agent.first_name)
  const [editMiddleName, setEditMiddleName] = useState(agent.mid_init)
  const [editLastName, setEditLastName] = useState(agent.last_name)
  const [editPhone, setEditPhone] = useState(agent.phone)
  const [editEmail, setEditEmail] = useState(agent.email)
  const [editNotes, setEditNotes] = useState(agent.notes)

  // This function enables the edit mode for existing entries
  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  // This function is triggered by a save button to initiate the PUT request
  // in the ProperiesPage
  const saveChanges = () => {
    setEditMode(false);
    const updatedAgent = {
      ...agent,
      first_name: editFirstName,
      mid_init: editMiddleName,
      last_name: editLastName,
      phone: editPhone,
      email: editEmail,
      notes: editNotes,
    }
    editAgent(agent.id, updatedAgent);
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
              <button onClick={toggleEditMode}>Edit Agent</button>
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
            <button onClick={() => removeAgent(agent.id)}>Remove Agent</button>
          </div>
        </div>
      </div>
    </div>
  )
}