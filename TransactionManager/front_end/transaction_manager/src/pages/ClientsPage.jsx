import { useEffect, useState } from "react"
import { api } from "../utilities"
import Client from "../components/Client"

export default function ClientsPage(){
  const [newFirstName, setNewFirstName] = useState("")
  const [newMiddleName, setNewMiddleName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newNotes, setNewNotes] = useState("")
  // const [newSeptic, setNewSeptic] = useState(false)
  // const [newHOA, setNewHOA] = useState(false)
  const [showAddClientBox, setShowAddClientBox] = useState(true)
  const [showNewClientBox, setShowNewClientBox] = useState(false)
  const [clients, setClients] = useState([])

  // This function opens the Add Property form and hides the Add Property button
  const toggleNewClientBox = () => {
    setShowNewClientBox(true);
    setShowAddClientBox(false);
  }
  
  // This function closes the Add Property form and unhides the Add Property button
  const toggleAddClientBox = () => {
    setShowNewClientBox(false);
    setShowAddClientBox(true);
    clearNewClientBox();
  }

  // This function triggers the getProperties GET request on page render
  useEffect(()=>{
    getClients()
  },[])

  // This function clears the Add Property box input fields
  const clearNewClientBox = () => {
    setNewFirstName("");
    setNewMiddleName("");
    setNewLastName("");
    setNewPhone("");
    setNewEmail("");
    setNewNotes("");
    // setNewWell(false);
    // setNewSeptic(false);
    // setNewHOA(false);
  }

  // This function initiates a GET request to the server for all properties
  // and saves them in the "properties" variable as a list
  const getClients = async() => {
    let response = await api.get("contacts/clients/");
    console.log(response.data)
    setClients(response.data);
  }

  // This function initiates a POST request to the server to add a new property
  // It also closes the Add Property Form and initiates and triggers the getProperties
  // function to re-pull a new list of properties
  const addClient = async() => {
    await api.post("contacts/clients/", {
      "first_name" : newFirstName,
      "mid_init" : newMiddleName,
      "last_name" : newLastName,
      "phone" : newPhone,
      "email" : newEmail,
      "notes" : newNotes,
      // "hoa" : newHOA,
    });
    toggleAddClientBox();
    getClients();
  }

  // This function initiates a DELETE request to the server to delete a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const removeClient = async(id) => {
    await api.delete(`contacts/clients/${id}/`)
    getClients();
  }

  // This function initiates a PUT request to the server to edit a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const editClient = async(id, updatedClient) => {
    await api.put(`contacts/clients/${id}/`, updatedClient)
    getClients();
  }

  return(
    <>
    <div id="page_title_container">
      <h1>Clients</h1>
    </div>
    <div id="below_title_container">
      <div id="left_side_container">
        <div 
          id="add_button_container"
          style={{ display: showAddClientBox ? "" : "none" }}>
          <button onClick={toggleNewClientBox}>Add Client</button>
        </div>
        {/* An input container to add new client */}
        <div 
          id="new_property_form_container" 
          className="property_container"
          style={{ display: showNewClientBox ? "" : "none" }}>
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
            <button onClick={toggleAddClientBox}>Cancel</button>
          </div>
          <div id="remove_button_container">
            <button onClick={addClient}>Save</button>
          </div>
        </div>
        <>
        <div>
        {
          // properties.length === 0
          // <div>Loading...</div>
          clients.map((client) => {
            return <Client 
              key={client.id}
              client = {client}
              removeClient = {removeClient} 
              setNewFirstName = {setNewFirstName}
              setNewMiddleName = {setNewMiddleName}
              setNewLastName = {setNewLastName}
              setNewPhone = {setNewPhone}
              setNewEmail = {setNewEmail}
              setNewNotes = {setNewNotes}
              // setNewWell = {setNewWell}
              // setNewSeptic = {setNewSeptic}
              editClient = {editClient}
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