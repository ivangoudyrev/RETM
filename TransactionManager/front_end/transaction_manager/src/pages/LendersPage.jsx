import { useEffect, useState } from "react"
import { api } from "../utilities"
import Lender from "../components/Lender"

export default function LendersPage(){
  const [newFirstName, setNewFirstName] = useState("")
  const [newMiddleName, setNewMiddleName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newNotes, setNewNotes] = useState("")
  const [showAddLenderBox, setShowAddLenderBox] = useState(true)
  const [showNewLenderBox, setShowNewLenderBox] = useState(false)
  const [lenders, setLenders] = useState([])

  // This function opens the Add Property form and hides the Add Property button
  const toggleNewLenderBox = () => {
    setShowNewLenderBox(true);
    setShowAddLenderBox(false);
  }
  
  // This function closes the Add Property form and unhides the Add Property button
  const toggleAddLenderBox = () => {
    setShowNewLenderBox(false);
    setShowAddLenderBox(true);
    clearNewLenderBox();
  }

  // This function triggers the getProperties GET request on page render
  useEffect(()=>{
    getLenders()
  },[])

  // This function clears the Add Property box input fields
  const clearNewLenderBox = () => {
    setNewFirstName("");
    setNewMiddleName("");
    setNewLastName("");
    setNewCompany("");
    setNewPhone("");
    setNewEmail("");
    setNewNotes("");
  }

  // This function initiates a GET request to the server for all properties
  // and saves them in the "properties" variable as a list
  const getLenders = async() => {
    let response = await api.get("contacts/lenders/");
    console.log(response.data)
    setLenders(response.data);
  }

  // This function initiates a POST request to the server to add a new property
  // It also closes the Add Property Form and initiates and triggers the getProperties
  // function to re-pull a new list of properties
  const addLender = async() => {
    await api.post("contacts/lenders/", {
      "first_name" : newFirstName,
      "mid_init" : newMiddleName,
      "last_name" : newLastName,
      "company" : newCompany,
      "phone" : newPhone,
      "email" : newEmail,
      "notes" : newNotes,
    });
    toggleAddLenderBox();
    getLenders();
  }

  // This function initiates a DELETE request to the server to delete a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const removeLender = async(id) => {
    await api.delete(`contacts/lenders/${id}/`)
    getLenders();
  }

  // This function initiates a PUT request to the server to edit a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const editLender = async(id, updatedLender) => {
    await api.put(`contacts/lenders/${id}/`, updatedLender)
    getLenders();
  }

  return(
    <>
    <div id="page_title_container">
      <h1>Lenders</h1>
    </div>
    <div id="below_title_container">
      <div id="left_side_container">
        <div 
          id="add_button_container"
          style={{ display: showAddLenderBox ? "" : "none" }}>
          <button onClick={toggleNewLenderBox}>Add Lender</button>
        </div>
        {/* An input container to add new client */}
        <div 
          id="new_property_form_container" 
          className="property_container"
          style={{ display: showNewLenderBox ? "" : "none" }}>
          <div className="property_info_container">
            <div className="name">
              <input 
                className="first_name_input"
                placeholder="First Name"
                size=""
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
              <input 
                className="middle_name_input"
                placeholder="M.I."
                size=""
                value={newMiddleName}
                onChange={(e) => setNewMiddleName(e.target.value)}
              />
              <input 
                className="last_name_input"
                placeholder="Last Name"
                size=""
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </div>
            <div className="name">
                <input
                    className="company_input"
                    placeholder="Company"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                />
            </div>
            <div className="contact_box">
              <div className="phone">
                <input 
                  className="city_dynamic_input"
                  placeholder="Phone"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <div className="email">
                <input 
                  className="state_dynamic_input"
                  placeholder="Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <textarea 
                className="notes_box"
                name="" 
                id="" 
                cols="30" 
                rows="4"
                placeholder="Notes"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              >  
              </textarea>
            </div>        
          </div>
          <div id="edit_button_container">
            <button onClick={toggleAddLenderBox}>Cancel</button>
          </div>
          <div id="remove_button_container">
            <button onClick={addLender}>Save</button>
          </div>
        </div>
        <>
        <div>
        {
          // properties.length === 0
          // <div>Loading...</div>
          lenders.map((lender) => {
            return <Lender 
              key={lender.id}
              lender = {lender}
              removeLender = {removeLender} 
              setNewFirstName = {setNewFirstName}
              setNewMiddleName = {setNewMiddleName}
              setNewLastName = {setNewLastName}
              setNewPhone = {setNewPhone}
              setNewEmail = {setNewEmail}
              setNewNotes = {setNewNotes}
              setNewCompany = {setNewCompany}
              editLender = {editLender}
            />
          })
        }
        </div>
        </>
      </div>
      <div id="right_side_container">
        <div id="cal_container">
        </div>
        <div id="tasks_container"></div>
      </div>
    </div>
    </>
  )
}