import { useEffect, useState } from "react"
import { api } from "../utilities"
import Agent from "../components/Agent"
import { Link } from "react-router-dom"
import Calendar from "../components/Calendar"
import AllTasks from "../components/AllTasks"

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
    // console.log(response.data)
    setAgents(response.data);
  }

  // This function initiates a POST request to the server to add a new property
  // It also closes the Add Property Form and initiates and triggers the getProperties
  // function to re-pull a new list of properties
  const addAgent = async(e) => {
    e.preventDefault();
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
  const removeAgent = async(e, id) => {
    e.preventDefault();
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
    <div className="container">
      <div className="row mt-2 border">
        <div className="col-lg-8 col-12">
          <p className="h2">Contacts</p>
          <div className="row g-3">
            <div className="col-12">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                <Link to={`/contacts/clients`} className="nav-link text-black border" aria-current="page">
                    <p className="h6">Clients</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/contacts/inspectors`} className="nav-link text-black border" aria-current="page">
                    <p className="h6">Inspectors</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/contacts/lenders`} className="nav-link text-black border" aria-current="page">
                    <p className="h6">Lenders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/contacts/titlecos`} className="nav-link text-black border" aria-current="page">
                    <p className="h6">Title Companies</p>
                  </Link>
                </li>
                <li className="nav-item">
                <Link to={`/contacts/agents`} className="nav-link active bg-secondary text-white">
                    <p className="h6">Agents</p>
                  </Link>
                </li>
              </ul>



              
              {showAddAgentBox ? (
                <div 
                  className="d-grid gap-2 d-md-flex justify-content-md-end mt-2"
                  // style={{ display: showAddClientBox ? "" : "none" }}
                  >                
                  <button 
                    className="btn btn-primary" 
                    type="button"
                    onClick={toggleNewAgentBox}
                  >Add a new Agent</button>
                </div>

              ) : (

                <div className="card border-2">
                  <div className="toast-header bg-secondary text-white d-flex justify-content-between align-items-center p-2">
                    <p className="h5">New Agent</p>
                  </div>
                  <form className="row g-3 p-2">
                    <div className="col-md-3">
                      <label htmlFor="first-name" className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="first-name"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-1">
                      <label htmlFor="midinit" className="form-label">M.I.</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="midinit"
                        value={newMiddleName}
                        onChange={(e) => setNewMiddleName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="last-name" className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="last-name"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-10">
                      <label htmlFor="company" className="form-label">Company</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="last-name"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="phone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">E-mail</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-10">
                      <label htmlFor="input-notes" className="form-label">Notes</label>
                      <textarea 
                        id="input-notes"
                        className="form-control" 
                        aria-label="With textarea"
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                      >
                      </textarea>
                    </div>
                    <div className="col-12">
                      <button 
                        type="submit" 
                        className="btn btn-outline-secondary"
                        onClick={toggleAddAgentBox}
                      >Discard</button>
                      <button 
                        type="submit" 
                        className="btn btn-primary mx-2"
                        onClick={(e) => addAgent(e)}
                      >Save</button>
                    </div>
                  </form>
                </div>
              )}




              <div>
                {
                  // properties.length === 0
                  // <div>Loading...</div>
                  agents.map((agent) => {
                    return <Agent 
                      key={agent.id}
                      agent = {agent}
                      removeAgent = {removeAgent} 
                      // setNewFirstName = {setNewFirstName}
                      // setNewMiddleName = {setNewMiddleName}
                      // setNewLastName = {setNewLastName}
                      // setNewCompany = {setNewCompany}
                      // setNewPhone = {setNewPhone}
                      // setNewEmail = {setNewEmail}
                      // setNewNotes = {setNewNotes}
                      editAgent = {editAgent}
                    />
                  })
                }
              </div>

            </div>
          </div>
        </div>
        <div className="col-lg-4 d-none d-lg-block">
          <Calendar/>
          <AllTasks/>
        </div>
      </div>
    </div>

    </>
  )
}