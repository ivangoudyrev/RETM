import { useEffect, useState } from "react"
import { api } from "../utilities"
import Agent from "../components/Agent"

export default function AgentsPage(){
  const [newFirstName, setNewFirstName] = useState("")
  const [newMiddleName, setNewMiddleName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newNotes, setNewNotes] = useState("")
  const [showAddAgentBox, setShowAddAgentBox] = useState(true)
  const [showNewAgentBox, setShowNewAgentBox] = useState(false)
  const [agents, setAgents] = useState([])

  // This function opens the Add Property form and hides the Add Property button
  const toggleNewAgentBox = () => {
    setShowNewAgentBox(true);
    setShowAddAgentBox(false);
  }
  
  // This function closes the Add Property form and unhides the Add Property button
  const toggleAddAgentBox = () => {
    setShowNewAgentBox(false);
    setShowAddAgentBox(true);
    clearNewAgentBox();
  }

  // This function triggers the getProperties GET request on page render
  useEffect(()=>{
    getAgents()
  },[])

  // This function clears the Add Property box input fields
  const clearNewAgentBox = () => {
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
  const getAgents = async() => {
    let response = await api.get("contacts/agents/");
    console.log(response.data)
    setAgents(response.data);
  }

  // This function initiates a POST request to the server to add a new property
  // It also closes the Add Property Form and initiates and triggers the getProperties
  // function to re-pull a new list of properties
  const addAgent = async() => {
    await api.post("contacts/agents/", {
      "first_name" : newFirstName,
      "mid_init" : newMiddleName,
      "last_name" : newLastName,
      "company" : newCompany,
      "phone" : newPhone,
      "email" : newEmail,
      "notes" : newNotes,
    });
    toggleAddAgentBox();
    getAgents();
  }

  // This function initiates a DELETE request to the server to delete a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const removeAgent = async(id) => {
    await api.delete(`contacts/agents/${id}/`)
    getAgents();
  }

  // This function initiates a PUT request to the server to edit a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const editAgent = async(id, updatedAgent) => {
    await api.put(`contacts/agents/${id}/`, updatedAgent)
    getAgents();
  }

  return(
    <>
    <div id="page_title_container">
      <h1>Agents</h1>
    </div>
    <div id="below_title_container">
      <div id="left_side_container">
        <div 
          id="add_button_container"
          style={{ display: showAddAgentBox ? "" : "none" }}>
          <button onClick={toggleNewAgentBox}>Add Agent</button>
        </div>
        {/* An input container to add new client */}
        <div 
          id="new_property_form_container" 
          className="property_container"
          style={{ display: showNewAgentBox ? "" : "none" }}>
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
            <button onClick={toggleAddAgentBox}>Cancel</button>
          </div>
          <div id="remove_button_container">
            <button onClick={addAgent}>Save</button>
          </div>
        </div>
        <>
        <div>
        {
          // properties.length === 0
          // <div>Loading...</div>
          agents.map((agent) => {
            return <Agent 
              key={agent.id}
              agent = {agent}
              removeAgent = {removeAgent} 
              setNewFirstName = {setNewFirstName}
              setNewMiddleName = {setNewMiddleName}
              setNewLastName = {setNewLastName}
              setNewPhone = {setNewPhone}
              setNewEmail = {setNewEmail}
              setNewNotes = {setNewNotes}
              setNewCompany = {setNewCompany}
              editAgent = {editAgent}
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