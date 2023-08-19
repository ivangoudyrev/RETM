import { useEffect, useState } from "react"
import { api } from "../utilities"
import Property from "../components/Property"

export default function PropertiesPage(){
  const [newStreet, setNewStreet] = useState("")
  const [newCity, setNewCity] = useState("")
  const [newState, setNewState] = useState("")
  const [newZip, setNewZip] = useState("")
  const [newWell, setNewWell] = useState(false)
  const [newSeptic, setNewSeptic] = useState(false)
  const [newHOA, setNewHOA] = useState(false)
  const [showAddPropertyBox, setShowAddPropertyBox] = useState(true)
  const [showNewPropertyBox, setShowNewPropertyBox] = useState(false)
  const [properties, setProperties] = useState([])

  // This function opens the Add Property form and hides the Add Property button
  const toggleNewPropertyBox = () => {
    setShowNewPropertyBox(true);
    setShowAddPropertyBox(false);
  }
  
  // This function closes the Add Property form and unhides the Add Property button
  const toggleAddPropertyBox = () => {
    setShowNewPropertyBox(false);
    setShowAddPropertyBox(true);
    clearNewPropertyBox();
  }

  // This function triggers the getProperties GET request on page render
  useEffect(()=>{
    getProperties()
  },[])

  // This function clears the Add Property box input fields
  const clearNewPropertyBox = () => {
    setNewStreet("");
    setNewCity("");
    setNewState("");
    setNewZip("");
    setNewWell(false);
    setNewSeptic(false);
    setNewHOA(false);
  }

  // This function initiates a GET request to the server for all properties
  // and saves them in the "properties" variable as a list
  const getProperties = async() => {
    let response = await api.get("properties/");
    setProperties(response.data);
  }

  // This function initiates a POST request to the server to add a new property
  // It also closes the Add Property Form and initiates and triggers the getProperties
  // function to re-pull a new list of properties
  const addProperty = async() => {
    await api.post("properties/", {
      "street" : newStreet,
      "city" : newCity,
      "state" : newState,
      "zip" : newZip,
      "well" : newWell,
      "septic" : newSeptic,
      "hoa" : newHOA,
    });
    toggleAddPropertyBox();
    getProperties();
  }

  // This function initiates a DELETE request to the server to delete a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const removeProperty = async(id) => {
    await api.delete(`properties/${id}/`)
    getProperties();
  }

  // This function initiates a PUT request to the server to edit a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const editProperty = async(id, updatedProperty) => {
    await api.put(`properties/${id}/`, updatedProperty)
    getProperties();
  }

  return(
    <>
    <div id="page_title_container">
      <h1>Properties</h1>
    </div>
    <div id="below_title_container">
      <div id="left_side_container">
        <div 
          id="add_button_container"
          style={{ display: showAddPropertyBox ? "" : "none" }}>
          <button onClick={toggleNewPropertyBox}>Add Property</button>
        </div>
        {/* An input container to add new addresses */}
        <div 
          id="new_property_form_container" 
          className="property_container"
          style={{ display: showNewPropertyBox ? "" : "none" }}>
          <div className="property_info_container">
            <div className="street">
              <input 
                className="street_dynamic_input"
                placeholder="Street Address"
                size=""
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
              />
            </div>
            <div className="city_state_zip_box">
              <div className="city">
                <input 
                  className="city_dynamic_input"
                  placeholder="City"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </div>
              <div className="state">
                <input 
                  className="state_dynamic_input"
                  placeholder="State"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                />
              </div>
              <div className="zip">
                <input 
                  className="zip_dynamic_input"
                  placeholder="Zip"
                  value={newZip}
                  onChange={(e) => setNewZip(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox"
                  checked={newHOA}
                  onChange={(e) => setNewHOA(e.target.checked)}
                />
                Part of a HOA or Condo Association
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox"
                  checked={newWell}
                  onChange={(e) => setNewWell(e.target.checked)}
                  />
                Has a private well
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox"
                  checked={newSeptic}
                  onChange={(e) => setNewSeptic(e.target.checked)}
                  />
                Has a private septic tank
              </label>
            </div>          
          </div>
          <div id="edit_button_container">
            <button onClick={toggleAddPropertyBox}>Cancel</button>
          </div>
          <div id="remove_button_container">
            <button onClick={addProperty}>Save</button>
          </div>
        </div>
        <>
        <div>
        {
          // properties.length === 0
          // <div>Loading...</div>
          properties.map((property) => {
            return <Property 
              key={property.id}
              property = {property}
              removeProperty = {removeProperty} 
              setNewStreet = {setNewStreet}
              setNewCity = {setNewCity}
              setNewState = {setNewState}
              setNewZip = {setNewZip}
              setNewHOA = {setNewHOA}
              setNewWell = {setNewWell}
              setNewSeptic = {setNewSeptic}
              editProperty = {editProperty}
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