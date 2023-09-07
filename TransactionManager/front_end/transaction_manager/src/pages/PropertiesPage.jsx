import { useEffect, useState } from "react"
import { api } from "../utilities"
import Property from "../components/Property"
import AddressLookup from "../components/AddressLookup";
import { useRef } from "react";

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

  const [newAddress, setNewAddress] = useState([])

  // const autocompleteInputRef = useRef(null);
  // let autocomplete = useRef(null);

  // useEffect(() => {
  //   window.initAutocomplete = initAutocomplete;
  //   loadGoogleMapsScript();
  //   return () => {
  //     window.google.maps.event.clearInstanceListeners(autocomplete.current);
  //   };
  // }, []);

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
  const addProperty = async(e) => {
    e.preventDefault();
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
  const removeProperty = async(e, id) => {
    e.preventDefault();
    let response = await api.delete(`properties/${id}/`)
    setProperties(response.data);
    // console.log(response.data);
  }

  // This function initiates a PUT request to the server to edit a specific
  // property.  It also triggers the getProperties function to re-pull a new list
  // of properties.
  const editProperty = async(id, updatedProperty) => {
    await api.put(`properties/${id}/`, updatedProperty)
    getProperties();
  }


  // const loadGoogleMapsScript = () => {
  //   const existingScript = document.getElementById("googleMapsScript");
  
  //   if (!existingScript) {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://maps.googleapis.com/maps/api/js?key=AIzaSyAn4v_3JvUjuyXfFktZU3HImPAV5prllpE&libraries=places&callback=initAutocomplete";
  //     script.id = "googleMapsScript";
  //     document.body.appendChild(script);
  //   }
  // };
  // const initAutocomplete = () => {
  //   autocomplete.current = new window.google.maps.places.Autocomplete(
  //     autocompleteInputRef.current,
  //     {
  //       types: ["address"],
  //       componentRestrictions: { country: "us" },
  //     }
  //   );
  //   autocomplete.current.addListener("place_changed", handlePlaceSelect);
  // };

  // const handlePlaceSelect = () => {
  //   const addressObject = autocomplete.current.getPlace();
  //   const address = addressObject.address_components;

  //   if (address) {
  //     setNewAddress(address);
  //   }
  // };

  // const selectAddress = () => {
  //   if (newAddress.length > 1) {
  //     let street = "";
  //     for (let i = 0; i < newAddress.length; i++) {
  //       if (newAddress[i].types[0] === "street_number") {
  //         street = `${newAddress[i].short_name}`;
  //       } else if (newAddress[i].types[0] === "route") {
  //         setNewStreet(`${street} ${newAddress[i].short_name}`);
  //       } else if (newAddress[i].types[0] === "locality") {
  //         setNewCity(`${newAddress[i].short_name}`);
  //       } else if (newAddress[i].types[0] === "administrative_area_level_1") {
  //         setNewState(`${newAddress[i].short_name}`);
  //       } else if (newAddress[i].types[0] === "postal_code") {
  //         setNewZip(`${newAddress[i].short_name}`);
  //       }
  //     }
  //     setNewAddress([]);
  //     autocompleteInputRef.current.value = '';
  //     initAutocomplete();
  //   }
  // };

  return(
    <>
    {/* <div className="address-lookup">
      <div>
        <label htmlFor="address-lookup-field">Google Address Lookup:</label>
      </div>
      <input
        id="address-lookup-input"
        ref={autocompleteInputRef}
        placeholder="Enter your address"
      />
      <button id="address-lookup-button" onClick={selectAddress}>
        Auto-fill
      </button>
    </div> */}

    <div className="container">
      <div className="row mt-2 border">
        <div className="col-lg-8 col-12">
          <p className="h1">Properties</p>
          <div className="row g-3">
            <div className="col-12">
              {showAddPropertyBox ? (
                <div 
                  className="d-grid gap-2 d-md-flex justify-content-md-end mt-2"
                  >                
                  <button 
                    className="btn btn-primary" 
                    type="button"
                    onClick={toggleNewPropertyBox}
                  >Add a new Property</button>
                </div>
              ) : (
                <div className="card border-2">
                  <div className="toast-header bg-secondary text-white d-flex justify-content-between align-items-center p-2">
                    <p className="h5">New Property</p>
                  </div>
                  {/* <AddressLookup
                    newAddress = {newAddress}
                    setNewAddress = {setNewAddress}
                    setNewStreet = {setNewStreet}
                    setNewCity = {setNewCity}
                    setNewState = {setNewState}
                    setNewZip = {setNewZip}
                  /> */}
          
                  <form className="row g-3 p-2">
                    <div className="col-md-10">
                      <label htmlFor="street" className="form-label">Street</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="street"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="city" className="form-label">City</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="city"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="state" className="form-label">State</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="state"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="zip" className="form-label">Zip Code</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="zip"
                        value={newZip}
                        onChange={(e) => setNewZip(e.target.value)}
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <label className="form-check-label " htmlFor="hoa-checkbox">HOA:</label>
                        <input 
                          className="form-check-input mx-2"
                          id="hoa-checkbox"
                          type="checkbox" 
                          checked={newHOA}
                          onChange={(e) => setNewHOA(e.target.checked)}
                          // disabled
                        />
                      </div>
                      <div className="col">
                        <label className="form-check-label" htmlFor="well-checkbox">Well:</label>
                        <input 
                          className="form-check-input mx-2"
                          id="well-checkbox"
                          type="checkbox" 
                          checked={newWell}
                          onChange={(e) => setNewWell(e.target.checked)}
                          // disabled
                        />
                      </div>
                      <div className="col">
                        <label className="form-check-label" htmlFor="septic-checkbox">Septic:</label>
                        <input 
                          className="form-check-input mx-2"
                          id="septic-checkbox"
                          type="checkbox" 
                          checked={newSeptic}
                          onChange={(e) => setNewSeptic(e.target.checked)}
                          // disabled
                        />    
                      </div>
                    </div>
                    
                    {/* <div className="col-10">
                      <label htmlFor="input-notes" className="form-label">Notes</label>
                      <textarea 
                        id="input-notes"
                        className="form-control" 
                        aria-label="With textarea"
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                      >
                      </textarea>
                    </div> */}
                    
                    <div className="col-12">
                      <button 
                        type="submit" 
                        className="btn btn-outline-secondary"
                        onClick={toggleAddPropertyBox}
                      >Discard</button>
                      <button 
                        type="submit" 
                        className="btn btn-primary mx-2"
                        onClick={(e) => addProperty(e)}
                      >Save</button>
                    </div>
                  </form>
                </div>
              )}
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







            </div>
          </div>
        </div>
      </div>
    </div>


{/* 

    <div className="page_title_container">
      <h1>Properties</h1>
    </div>
    <div className="below_title_container">
      <div className="left_side_container">
        <div 
          id="add_button_container"
          style={{ display: showAddPropertyBox ? "" : "none" }}>
          <button onClick={toggleNewPropertyBox}>Add Property</button>
        </div>
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
    </div> */}
    </>
  )
}