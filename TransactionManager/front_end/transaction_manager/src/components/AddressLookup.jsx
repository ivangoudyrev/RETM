// import { useRef, useState } from "react";
// import { useEffect } from "react";


// export default function AddressLookup(props) {
//   const {
//     newAddress,
//     setNewAddress,
//     setNewStreet,
//     setNewCity,
//     setNewState,
//     setNewZip
//   } = props;
//   // const [newAddress, setNewAddress] = useState([])
//   const autocompleteInputRef = useRef(null);
//   let autocomplete = useRef(null);
  
//   // useEffect(() => {
//   //   loadGoogleMapsScript();
//   //   return () => {
//   //     window.google.maps.event.clearInstanceListeners(autocomplete.current);
//   //   };
//   // },[])
//   // useEffect(() => {
//   //   autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
//   //     types: ['address'],  
//   //     componentRestrictions: {country: "us"} 
//   //   });
//   //   autocomplete.addListener('place_changed', handlePlaceSelect);
//   //   return () => {
//   //     window.google.maps.event.clearInstanceListeners(autocompleteInputRef.current);
//   //   };
//   // }, [autocompleteInputRef.current]);

//   const loadGoogleMapsScript = (callback) => {
//     const existingScript = document.getElementById('googleMapsScript');

//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAn4v_3JvUjuyXfFktZU3HImPAV5prllpE&libraries=places&callback=initAutocomplete';
//       script.id = 'googleMapsScript';
//       document.body.appendChild(script);
//     } 
//     // else {
//     //   const script = document.createElement('script');
//     //   script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAn4v_3JvUjuyXfFktZU3HImPAV5prllpE&libraries=places';
//     //   script.addEventListener('load', callback);
//     //   existingScript.addEventListener('load', callback);
//     // }
//   };

  

//   const initAutocomplete = () => {
//     autocomplete.current = new window.google.maps.places.Autocomplete(
//       autocompleteInputRef.current, {
//         types: ['address'],
//         componentRestrictions: { country: 'us' },
//       }
//     );
//     autocomplete.current.addListener('place_changed', handlePlaceSelect);
//   };


//   useEffect(() => {
//     loadGoogleMapsScript();
//     return () => {
//       window.google.maps.event.clearInstanceListeners(autocomplete.current);
//     };
//   }, []);

//   const handlePlaceSelect = () => {
//     const addressObject = autocomplete.current.getPlace();
//     // console.log(addressObject)
//     const address = addressObject.address_components;

//     if (address) {
//         // setEditStreet(`${address[0].long_name}` `${address[1].short_name}`)
//         // console.log(address); 
//         setNewAddress(address);
//     }
//   };

//   const selectAddress = () => {
//     if (newAddress.length > 1) {
//       // setEditStreet("");
//       // setEditCity("");
//       // setEditState("");
//       // setEditZip("");
//       let street = "";
//       for (let i=0; i<newAddress.length; i++) {
//         if (newAddress[i].types[0]==='street_number') {
//           street = `${newAddress[i].short_name}`
//           // setEditStreet(`${editAddress[i].short_name}`)
//         } else if (newAddress[i].types[0]==='route') {
//           setNewStreet(`${street} ${newAddress[i].short_name}`)
//         } else if (newAddress[i].types[0]==='locality') {
//           setNewCity(`${newAddress[i].short_name}`)
//         } else if (newAddress[i].types[0]==='administrative_area_level_1') {
//           setNewState(`${newAddress[i].short_name}`)
//         } else if (newAddress[i].types[0]==='postal_code') {
//           setNewZip(`${newAddress[i].short_name}`)
//         }
//       }
//       setNewAddress([]);
//     }
//   }

//   return (
//     <>
    
//     <div className="address-lookup">
//       <div>
//         <label htmlFor="address-lookup-field">Google Address Lookup:</label>
//       </div>
//       <input id="address-lookup-input" ref={autocompleteInputRef} placeholder="Enter your address"/>
//       <button id="address-lookup-button" onClick={selectAddress}>Auto-fill</button>
//     </div>
//     </>
//   )
// }

import { useRef, useState, useEffect } from "react";

export default function AddressLookup(props) {
  const {
    newAddress,
    setNewAddress,
    setNewStreet,
    setNewCity,
    setNewState,
    setNewZip,
  } = props;
  const autocompleteInputRef = useRef(null);
  let autocomplete = useRef(null);

  // const loadGoogleMapsScript = (callback) => {
  //   const existingScript = document.getElementById("googleMapsScript");

  //   if (!existingScript) {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://maps.googleapis.com/maps/api/js?key=AIzaSyAn4v_3JvUjuyXfFktZU3HImPAV5prllpE&libraries=places";
  //     script.id = "googleMapsScript";
  //     document.body.appendChild(script);
  //     script.addEventListener("load", callback);
  //   }
  // };
  const loadGoogleMapsScript = () => {
    const existingScript = document.getElementById("googleMapsScript");
  
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAn4v_3JvUjuyXfFktZU3HImPAV5prllpE&libraries=places&callback=initAutocomplete";
      script.id = "googleMapsScript";
      document.body.appendChild(script);
    }
  };
  const initAutocomplete = () => {
    autocomplete.current = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "us" },
      }
    );
    autocomplete.current.addListener("place_changed", handlePlaceSelect);
  };

  // useEffect(() => {
  //   loadGoogleMapsScript(initAutocomplete);
  //   return () => {
  //     window.google.maps.event.clearInstanceListeners(autocomplete.current);
  //   };
  // }, []);
  useEffect(() => {
    window.initAutocomplete = initAutocomplete;
    loadGoogleMapsScript();
    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete.current);
    };
  }, []);

  const handlePlaceSelect = () => {
    const addressObject = autocomplete.current.getPlace();
    const address = addressObject.address_components;

    if (address) {
      setNewAddress(address);
    }
  };

  const selectAddress = () => {
    if (newAddress.length > 1) {
      let street = "";
      for (let i = 0; i < newAddress.length; i++) {
        if (newAddress[i].types[0] === "street_number") {
          street = `${newAddress[i].short_name}`;
        } else if (newAddress[i].types[0] === "route") {
          setNewStreet(`${street} ${newAddress[i].short_name}`);
        } else if (newAddress[i].types[0] === "locality") {
          setNewCity(`${newAddress[i].short_name}`);
        } else if (newAddress[i].types[0] === "administrative_area_level_1") {
          setNewState(`${newAddress[i].short_name}`);
        } else if (newAddress[i].types[0] === "postal_code") {
          setNewZip(`${newAddress[i].short_name}`);
        }
      }
      setNewAddress([]);
      autocompleteInputRef.current.value = '';
      initAutocomplete();
    }
  };

  return (
    <div className="address-lookup">
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
    </div>
  );
}
