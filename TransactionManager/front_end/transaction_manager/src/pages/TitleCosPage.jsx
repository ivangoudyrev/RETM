import { useEffect, useState } from "react"
import { api } from "../utilities"
import TitleCo from "../components/TitleCo"

export default function TitleCosPage(){
  const [newFirstName, setNewFirstName] = useState("")
  const [newMiddleName, setNewMiddleName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newNotes, setNewNotes] = useState("")
  const [showAddTitleCoBox, setShowAddTitleCoBox] = useState(true)
  const [showNewTitleCoBox, setShowNewTitleCoBox] = useState(false)
  const [titlecos, setTitleCos] = useState([])

  // This function opens the Add Property form and hides the Add Property button
  const toggleNewTitleCoBox = () => {
    setShowNewTitleCoBox(true);
    setShowAddTitleCoBox(false);
  }
  
  // This function closes the Add Property form and unhides the Add Property button
  const toggleAddTitleCoBox = () => {
    setShowNewTitleCoBox(false);
    setShowAddTitleCoBox(true);
    clearNewTitleCoBox();
  }

  // This function triggers the getProperties GET request on page render
  useEffect(()=>{
    getTitleCos()
  },[])

  // This function clears the Add Property box input fields
  const clearNewTitleCoBox = () => {
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
  const getTitleCos = async() => {
    let response = await api.get("contacts/titlecos/");
    console.log(response.data)
    setTitleCos(response.data);
  }

  // This function initiates a POST request to the server to add a new property
  // It also closes the Add Property Form and initiates and triggers the getProperties
  // function to re-pull a new list of properties
  const addTitleCo = async() => {
    await api.post("contacts/titlecos/", {
      "first_name" : newFirstName,
      "mid_init" : newMiddleName,
      "last_name" : newLastName,
      "company" : newCompany,
      "phone" : newPhone,
      "email" : newEmail,
      "notes" : newNotes,
    });
    toggleAddTitleCoBox();
    getTitleCos();
  }

  // This function initiates a DELETE request to the server to delete a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const removeTitleCo = async(id) => {
    await api.delete(`contacts/titlecos/${id}/`)
    getTitleCos();
  }

  // This function initiates a PUT request to the server to edit a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const editTitleCo = async(id, updatedTitleCo) => {
    await api.put(`contacts/titlecos/${id}/`, updatedTitleCo)
    getTitleCos();
  }

  return(
    <>
    <div id="page_title_container">
      <h1>TitleCos</h1>
    </div>
    <div id="below_title_container">
      <div id="left_side_container">
        <div 
          id="add_button_container"
          style={{ display: showAddTitleCoBox ? "" : "none" }}>
          <button onClick={toggleNewTitleCoBox}>Add Title Co.</button>
        </div>
        {/* An input container to add new client */}
        <div 
          id="new_property_form_container" 
          className="property_container"
          style={{ display: showNewTitleCoBox ? "" : "none" }}>
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
            <button onClick={toggleAddTitleCoBox}>Cancel</button>
          </div>
          <div id="remove_button_container">
            <button onClick={addTitleCo}>Save</button>
          </div>
        </div>
        <>
        <div>
        {
          // properties.length === 0
          // <div>Loading...</div>
          titlecos.map((titleco) => {
            return <TitleCo 
              key={titleco.id}
              titleco = {titleco}
              removeTitleCo = {removeTitleCo} 
              setNewFirstName = {setNewFirstName}
              setNewMiddleName = {setNewMiddleName}
              setNewLastName = {setNewLastName}
              setNewPhone = {setNewPhone}
              setNewEmail = {setNewEmail}
              setNewNotes = {setNewNotes}
              setNewCompany = {setNewCompany}
              editTitleCo = {editTitleCo}
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