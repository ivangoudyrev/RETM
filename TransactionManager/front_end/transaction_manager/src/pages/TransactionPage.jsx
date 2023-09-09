

import { userContext } from "../App"
import { useContext } from "react"

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../utilities";
import numeral from 'numeral';
import { useNavigate } from "react-router-dom";

import Calendar from "../components/Calendar";
import AllTasks from "../components/AllTasks";
import MapLookup from "../components/MapLookup";

export default function TransactionPage(){
  const navigate = useNavigate();

  const {
    properties,
    // clients,
  } = useContext(userContext);
  
  
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [property, setProperty] = useState(null);
  const [client, setClient] = useState(null);
  const [inspector, setInspector] = useState(null);
  const [lender, setLender] = useState(null);
  const [titleco, setTitleco] = useState(null);
  const [agent, setAgent] = useState(null);

  const [newType, setNewType] = useState("Buy");
  const [newPrice, setNewPrice] = useState("");
  const [newRawPrice, setNewRawPrice] = useState(transaction?.price);
  const [newRatifyDate, setNewRatifyDate] = useState(transaction?.ratify_date);
  const [newClosingDate, setNewClosingDate] = useState(transaction?.closing_date);
  const [newEMDAmt, setNewEMDAmt] = useState("");
  const [newRawEMDAmt, setNewRawEMDAmt] = useState(transaction?.emd_amt);
  const [newEMDDays, setNewEMDDays] = useState(transaction?.emd_days);
  const [newEMDBusinessDays, setNewEMDBusinessDays] = useState(transaction?.emd_business_days);
  const [newInspectionReq, setNewInspectionReq] = useState(transaction?.inspection_req);
  const [newBuyerPestInspection, setNewBuyerPestInspection] = useState(transaction?.buyer_pest_inspection);
  const [newInspectionDays, setNewInspectionDays] = useState(transaction?.inspection_days);
  const [newInspectionBusinessDays, setNewInspectionBusinessDays] = useState(transaction?.inspection_business_days);
  const [newLoanReq, setNewLoanReq] = useState(transaction?.loan_req);
  const [newNotes, setNewNotes] = useState(transaction?.notes);

  const [editClosingDate, setEditClosingDate] = useState(transaction?.closing_date)
    
  const [newPestInspector, setNewPestInspector] = useState("");
  
  const [clients, setClients] = useState([]);
  // const [properties, setProperties] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [lenders, setLenders] = useState([]);
  const [titlecos, setTitlecos] = useState([]);
  const [agents, setAgents] = useState([]);
  
  const [newClient, setNewClient] = useState("");
  const [newProperty, setNewProperty] = useState("");
  const [newInspector, setNewInspector] = useState("");
  const [newLender, setNewLender] = useState("");
  const [newTitleco, setNewTitleco] = useState("");
  const [newAgent, setNewAgent] = useState("");
  
  const [purchaseDetailsEditMode, setPurchaseDetailsEditMode] = useState(false);
  const [clientEditMode, setClientEditMode] = useState(false);
  const [propertyEditMode, setPropertyEditMode] = useState(false);
  const [inspectorEditMode, setInspectorEditMode] = useState(false);
  const [lenderEditMode, setLenderEditMode] = useState(false);
  const [titlecoEditMode, setTitlecoEditMode] = useState(false);
  const [agentEditMode, setAgentEditMode] = useState(false);

  const [addressFull, setAddressFull] = useState("");
  
  const getTransaction = async() => {
    const response = await api.get(`transactions/${transactionId}/`);
    setTransaction(response.data);
    // console.log(transaction.data)
  };

  const deleteTransaction = async() => {
    await api.delete(`transactions/${transactionId}`)
    navigate('/home');
  }
  
  useEffect(() =>{
    getTransaction();
  },[])

  useEffect(() =>{
    getAddress();
  },[property])

  useEffect(() => {
    const getProperty = async() => {
      const response = await api.get(`properties/${transaction?.property_id}/`);
      setProperty(response.data);
    };
    const getClient = async() => {  
      const response = await api.get(`contacts/clients/${transaction?.client_id}/`);
      setClient(response.data);
    };
    const getInspector = async() => {  
      const response = await api.get(`contacts/inspectors/${transaction?.inspector_id}/`);
      setInspector(response.data);
    };
    const getLender = async() => {  
      const response = await api.get(`contacts/lenders/${transaction?.lender_id}/`);
      setLender(response.data);
    };
    const getTitleco = async() => {  
      const response = await api.get(`contacts/titlecos/${transaction?.title_id}/`);
      setTitleco(response.data);
    };
    const getAgent = async() => {  
      const response = await api.get(`contacts/agents/${transaction?.agent_id}/`);
      setAgent(response.data);
    };

    if (transaction) {
      getProperty();
      getClient();
      getInspector();
      getLender();
      getTitleco();
      getAgent();
      setNewRawPrice(transaction.price);
      setNewRatifyDate(transaction.ratify_date);
      setNewClosingDate(transaction.closing_date);
      setNewRawEMDAmt(transaction.emd_amt);
      setNewEMDDays(transaction.emd_days);
      setNewEMDBusinessDays(transaction.emd_business_days);
      setNewInspectionReq(transaction.inspection_req);
      setNewBuyerPestInspection(transaction.buyer_pest_inspection);
      setNewInspectionDays(transaction.inspection_days);
      setNewInspectionBusinessDays(transaction.inspection_business_days);
      setNewLoanReq(transaction.loan_req);
      setNewNotes(transaction.notes);
    }
  },[transaction])
  
  const getClients = async() => {
    let response = await api.get("contacts/clients/");
    setClients(response.data);
  }

  const getProperties = async() => {
    let response = await api.get("properties/");
    setProperties(response.data);
  }

  const getInspectors = async() => {
    let response = await api.get("contacts/inspectors/");
    setInspectors(response.data);
  }

  const getLenders = async() => {
    let response = await api.get("contacts/lenders/");
    setLenders(response.data);
  }

  const getTitlecos = async() => {
    let response = await api.get("contacts/titlecos/");
    setTitlecos(response.data);
  }

  const getAgents = async() => {
    let response = await api.get("contacts/agents/");
    setAgents(response.data);
  }

  const editTransaction = async(updatedTransaction) => {
    // console.log("Updated Transaction:", updatedTransaction)
    const response = await api.put(`transactions/${transactionId}/`, updatedTransaction)
    // console.log("Edit response:", response.data);
    setTransaction(response.data);
  }

  const getNewClient = async(newId) => {
    const response = await api.get(`contacts/clients/${newId}/`);
    setClient(response.data);
  }

  const getNewProperty = async(newId) => {
    const response = await api.get(`properties/${newId}/`);
    setProperty(response.data);
  }

  const getNewInspector = async(newId) => {
    const response = await api.get(`contacts/inspectors/${newId}/`);
    setNewInspector(response.data);
  }

  const getNewLender = async(newId) => {
    const response = await api.get(`contacts/lenders/${newId}/`);
    setNewLender(response.data);
  }

  const getNewTitleco = async(newId) => {
    const response = await api.get(`contacts/titlecos/${newId}/`);
    setNewTitleco(response.data);
  }

  const getNewAgent = async(newId) => {
    const response = await api.get(`contacts/agents/${newId}/`);
    setNewAgent(response.data);
  }

  const saveChanges = () => {
    togglePurchaseDetailsEditMode();

    const updatedTransaction = {
      ...transaction,
      price: newRawPrice,
      ratify_date: newRatifyDate,
      closing_date: newClosingDate,
      emd_amt: newRawEMDAmt,
      emd_days: newEMDDays,
      emd_business_days: newEMDBusinessDays,
      loan_req: newLoanReq,
      inspection_req: newInspectionReq,
      buyer_pest_inspection: newBuyerPestInspection,
      inspection_days: newInspectionDays,
      inspection_business_days: newInspectionBusinessDays,
      notes: newNotes,
    }
    editTransaction(updatedTransaction);
  }

  const saveClientChanges = () => {
    toggleClientEditMode();
    const updatedTransaction = {
      ...transaction,
      client_id : newClient,
    }
    editTransaction(updatedTransaction);
    getNewClient(updatedTransaction.client_id);
  }

  const savePropertyChanges = () => {
    togglePropertyEditMode();
    const updatedTransaction = {
      ...transaction,
      property_id : newProperty,
    }
    editTransaction(updatedTransaction);
    getNewProperty(updatedTransaction.property_id);
  }

  const saveInspectorChanges = () => {
    toggleInspectorEditMode();
    const updatedTransaction = {
      ...transaction,
      inspector_id : newInspector,
    }
    editTransaction(updatedTransaction);
    getNewInspector(updatedTransaction.inspector_id);
  }

  const saveLenderChanges = () => {
    toggleLenderEditMode();
    const updatedTransaction = {
      ...transaction,
      lender_id : newLender,
    }
    editTransaction(updatedTransaction);
    getNewLender(updatedTransaction.lender_id);
  }

  const saveTitlecoChanges = () => {
    toggleTitlecoEditMode();
    const updatedTransaction = {
      ...transaction,
      title_id : newTitleco,
    }
    editTransaction(updatedTransaction);
    getNewTitleco(updatedTransaction.title_id);
  }

  const saveAgentChanges = () => {
    toggleAgentEditMode();
    const updatedTransaction = {
      ...transaction,
      agent_id : newAgent,
    }
    editTransaction(updatedTransaction);
    getNewAgent(updatedTransaction.agent_id);
  }
  
  const handlePriceFormat = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setNewRawPrice(parseFloat(numericValue));
    setNewRawPrice(numericValue);
    const formattedValue = numeral(numericValue).format('0,0');
    setNewPrice(formattedValue);
  }

  const handleEMDFormat = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setNewRawEMDAmt(parseFloat(numericValue));
    const formattedValue = numeral(numericValue).format('0,0');
    setNewEMDAmt(formattedValue);
  }

  const togglePurchaseDetailsEditMode = () => {
    setPurchaseDetailsEditMode(!purchaseDetailsEditMode)
    // add code to reset the input fields here
  }

  const toggleClientEditMode = () => {
    setClientEditMode(!clientEditMode)
    getClients();
    setNewClient("");
  }

  const togglePropertyEditMode = () => {
    setPropertyEditMode(!propertyEditMode)
    getProperties();
    setNewProperty("");
  }

  const toggleInspectorEditMode = () => {
    setInspectorEditMode(!inspectorEditMode)
    getInspectors();
    setNewInspector("");
  }

  const toggleLenderEditMode = () => {
    setLenderEditMode(!lenderEditMode)
    getLenders();
    setNewLender("");
  }
  
  const toggleTitlecoEditMode = () => {
    setTitlecoEditMode(!titlecoEditMode)
    getTitlecos();
    setNewTitleco("");
  }
  
  const toggleAgentEditMode = () => {
    setAgentEditMode(!agentEditMode)
    getAgents();
    setNewAgent("");
  }

  // function to add tousands comma separator to numbers
  const formatNumber = (num) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  // function to format long datetime into short date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
  }

  const getAddress = () => {
    const address = `${property?.street}, ${property?.city}, ${property?.state}`
    // console.log(address)
    setAddressFull(address);
  }

  return(
    <>
    <div id="new_transaction_container" className="container">
      <div className="row mt-2 border">
        <div className="col-lg-8 col-12">
          <p className="h2">PENDING: {property?.street}</p>
          <form className="row g-3">
            <div className="col-12">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <Link to={`/transactions/${transactionId}`} className="nav-link active bg-secondary text-white" aria-current="page" href="#">
                    <p className="h6">Transaction Details</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/tasks/${transactionId}`} className="nav-link text-black border" href="#">
                    <p className="h6">Transaction Task List</p>
                  </Link>
                </li>
              </ul>
              <div className="card mt-2">
                <div className="toast-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title p-2">Property Details</h4>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-primary m-3"  
                      aria-label="Edit"
                      onClick={togglePropertyEditMode}
                      style={{ display: propertyEditMode ? "none" : "" }}
                    >Edit</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary m-1"  
                      aria-label="Edit"
                      onClick={togglePropertyEditMode}
                      style={{ display: propertyEditMode ? "" : "none" }}
                    >Discard</button>
                    <button 
                      type="button" 
                      className="btn btn-warning m-3"  
                      aria-label="Edit"
                      onClick={savePropertyChanges}
                      style={{ display: propertyEditMode ? "" : "none" }}
                    >Save</button>
                  </div>
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <label htmlFor="address">Address:</label>
                  <p className="h5">{property?.street}, {property?.city}, {property?.state} {property?.zip}</p>
                  <div className="row">
                    <div className="col">
                      <label className="form-check-label" htmlFor="hoa-checkbox">HOA:</label>
                      <input 
                        className="form-check-input"
                        id="hoa-checkbox"
                        type="checkbox" 
                        checked={property?.hoa}
                        disabled
                      />
                    </div>
                    <div className="col">
                      <label className="form-check-label" htmlFor="well-checkbox">Well:</label>
                      <input 
                        className="form-check-input"
                        id="well-checkbox"
                        type="checkbox" 
                        checked={property?.well}
                        disabled
                      />
                    </div>
                    <div className="col">
                      <label className="form-check-label" htmlFor="septic-checkbox">Septic:</label>
                      <input 
                        className="form-check-input"
                        id="septic-checkbox"
                        type="checkbox" 
                        checked={property?.septic}
                        disabled
                      />    
                    </div>
                  </div>
                  <select
                    style={{ display: propertyEditMode ? "" : "none" }}
                    className="form-select" 
                    aria-label="Select a new property"
                    value={newProperty}
                    onChange={(e)=> setNewProperty(e.target.value)}>
                    <option value="">Select a property</option>
                    {properties?.map(property => (
                      <option key={property?.id} value={property?.id}>
                        {property?.street}, {property?.city}, {property?.state} {property?.zip}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card mt-2">
                <div className="toast-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title p-2">Purchase Details</h4>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-primary m-3"  
                      aria-label="Edit"
                      onClick={togglePurchaseDetailsEditMode}
                      style={{ display: purchaseDetailsEditMode ? "none" : "" }}
                    >Edit</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary m-1"  
                      aria-label="Edit"
                      onClick={togglePurchaseDetailsEditMode}
                      style={{ display: purchaseDetailsEditMode ? "" : "none" }}
                    >Discard</button>
                    <button 
                      type="button" 
                      className="btn btn-warning m-3"  
                      aria-label="Edit"
                      onClick={saveChanges}
                      style={{ display: purchaseDetailsEditMode ? "" : "none" }}
                    >Save</button>
                  </div>
                    
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <div className="row g-2 d-flex align-items-center">
                    <div
                      className="col mb-0">
                      <label htmlFor="purchase-price">Purchase Price:</label>
                      <div>
                        <p className="h5">${formatNumber(transaction?.price)}</p>
                      </div>
                      <div
                        style={{ display: purchaseDetailsEditMode ? "" : "none" }} 
                        id="purchase-price" 
                        className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input
                          placeholder="Enter new price" 
                          type="text" 
                          className="form-control" 
                          aria-label="Amount (to the nearest dollar)"
                          value={newPrice}
                          onChange={handlePriceFormat}
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>
                    <div className="col form-check">
                      <label className="form-check-label" htmlFor="loan-required">Loan required</label>
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="loan-required" 
                        checked={newLoanReq}
                        onChange={(e) => setNewLoanReq(e.target.checked)}
                        disabled={!purchaseDetailsEditMode}
                      />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="col mb-2">
                      <label htmlFor="ratifydate" className="form-label mb-0">Contract Ratified Date:</label>
                      <p className="h5">{formatDate(transaction?.ratify_date)}</p>
                      <input 
                        style={{ display: purchaseDetailsEditMode ? "" : "none" }}
                        type="datetime-local" 
                        className="form-control" 
                        id="ratifydate"
                        onChange={(e) => setNewRatifyDate(e.target.value)} 
                        value={transaction?.ratify_date}
                        placeholder="Enter Ratification Date"
                        
                        />
                    </div>
                    <div className="col">
                      <label htmlFor="closedate" className="form-label mb-0">Closing Date:</label>
                      <p className="h5">{formatDate(transaction?.closing_date)}</p>
                      <input 
                        style={{ display: purchaseDetailsEditMode ? "" : "none" }}
                        type="datetime-local" 
                        className="form-control" 
                        id="closedate"
                        onChange={(e) => setNewClosingDate(e.target.value)} 
                        value={editClosingDate}
                        placeholder="Enter Ratification Date"
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-sm-6 mb-0" id="emd-amount-box">
                      <label htmlFor="emd-amount">EMD Amount:</label>
                      <p className="h5">${formatNumber(transaction?.emd_amt)}</p>
                      <div 
                        id="emd-amount" 
                        className="input-group mb-3"
                        style={{ display: purchaseDetailsEditMode ? "" : "none" }} 
                        >
                        <span className="input-group-text">$</span>
                        <input 
                          placeholder="Enter new EMD amount"
                          type="text" 
                          className="form-control" 
                          aria-label="Amount (to the nearest dollar)"
                          value={newEMDAmt}
                          onChange={handleEMDFormat}
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>
                  </div>
                    <label htmlFor="emd-date-posted">{`EMD Deadline(${transaction?.emd_days} days):`}</label>
                    <p id="emd-date-posted" className="h5">{formatDate(transaction?.emd_deadline)}</p>
                  <div
                    style={{ display: purchaseDetailsEditMode ? "" : "none" }} 
                    className="input-group g-3 mb-3" 
                    id="inspection-emd-contingency-input">
                    <span className="input-group-text" id="basic-addon1">EMD due in:</span>
                    <input 
                      type="text" 
                      className="form-control custom-input" 
                      placeholder="" 
                      aria-label="Username"
                      value={newEMDDays}
                      onChange={(e) => setNewEMDDays(e.target.value)} 
                      disabled={!purchaseDetailsEditMode}
                    />
                    <span className="input-group-text">days</span>
                    <div className="col-sm form-check form-switch">
                      <label className="form-check-label" htmlFor="EMD-business-days">business days</label>
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        role="switch" 
                        id="EMD-business-days" 
                        checked={newEMDBusinessDays}
                        onChange={(e) => setNewEMDBusinessDays(e.target.checked)}
                        disabled={!purchaseDetailsEditMode}
                      />
                    </div>
                  </div>
                  <label htmlFor="emd-date-posted">{`Inspection Contingency Deadline(${transaction?.inspection_days} days):`}</label>
                    <p id="emd-date-posted" className="h5">{formatDate(transaction?.inspection_deadline)}</p>
                  <div
                    style={{ display: purchaseDetailsEditMode ? "" : "none" }}  
                    className="input-group g-3 mb-3" 
                    id="inspection-emd-contingency-input">
                    <span className="input-group-text" id="basic-addon1">Inspection due in:</span>
                    <input 
                      type="text" 
                      className="form-control custom-input"
                      placeholder="" 
                      aria-label="Username"
                      value={newInspectionDays}
                      onChange={(e) => setNewInspectionDays(e.target.value)} 
                      disabled={!purchaseDetailsEditMode}
                    />
                    <span className="input-group-text">days</span>
                    <div className="col-sm form-check form-switch">
                      <label className="form-check-label" htmlFor="inspection-business-days">business days</label>
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        role="switch" 
                        id="inspection-business-days" 
                        checked={newInspectionBusinessDays}
                        onChange={(e) => setNewInspectionBusinessDays(e.target.checked)}
                        disabled={!purchaseDetailsEditMode}
                      />
                    </div>
                  </div>
                  
                  <div className="row g-3">
                    <div>
                      <label style={{ marginRight: '10px' }}>
                        <input 
                          className="form-check-input"
                          type="checkbox"
                          checked={newInspectionReq}
                          onChange={(e) => setNewInspectionReq(e.target.checked)}
                          disabled={!purchaseDetailsEditMode}
                        />
                        Home Inspection Requested
                      </label>
                      <label>
                        <input 
                          className="form-check-input"
                          type="checkbox"
                          checked={newBuyerPestInspection}
                          onChange={(e) => setNewBuyerPestInspection(e.target.checked)}
                          disabled={!purchaseDetailsEditMode}
                        />
                        Responsible for Pest Inspection
                      </label>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">Notes</span>
                      <textarea 
                        className="form-control" 
                        aria-label="With textarea"
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                        disabled={!purchaseDetailsEditMode}
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mt-2">
                <div className="toast-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title p-2">Client Details</h4>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-primary m-3"  
                      aria-label="Edit"
                      onClick={toggleClientEditMode}
                      style={{ display: clientEditMode ? "none" : "" }}
                    >Edit</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary m-1"  
                      aria-label="Edit"
                      onClick={toggleClientEditMode}
                      style={{ display: clientEditMode ? "" : "none" }}
                    >Discard</button>
                    <button 
                      type="button" 
                      className="btn btn-warning m-3"  
                      aria-label="Edit"
                      onClick={saveClientChanges}
                      style={{ display: clientEditMode ? "" : "none" }}
                    >Save</button>
                  </div>
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <label htmlFor="address">Client Name:</label>
                  <p className="h5">{client?.first_name} {client?.last_name}</p>
                  <label htmlFor="address">Contact Info:</label>
                  <p className="h5">{client?.phone}; {client?.email}</p>
                  <select
                    style={{ display: clientEditMode ? "" : "none" }}
                    className="form-select" 
                    aria-label="Select a new client"
                    value={newClient}
                    onChange={(e)=> setNewClient(e.target.value)}>
                    <option value="">Select a client</option>
                    {clients?.map(client => (
                      <option key={client?.id} value={client?.id}>
                        {client?.first_name} {client?.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card mt-2">
                <div className="toast-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title p-2">Inspector Details</h4>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-primary m-3"  
                      aria-label="Edit"
                      onClick={toggleInspectorEditMode}
                      style={{ display: inspectorEditMode ? "none" : "" }}
                    >Edit</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary m-1"  
                      aria-label="Edit"
                      onClick={toggleInspectorEditMode}
                      style={{ display: inspectorEditMode ? "" : "none" }}
                    >Discard</button>
                    <button 
                      type="button" 
                      className="btn btn-warning m-3"  
                      aria-label="Edit"
                      onClick={saveInspectorChanges}
                      style={{ display: inspectorEditMode ? "" : "none" }}
                    >Save</button>
                  </div>
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <label htmlFor="address">Inspector Name:</label>
                  <p className="h5">{inspector?.first_name} {inspector?.last_name} - {inspector?.company}</p>
                  <label htmlFor="address">Contact Info:</label>
                  <p className="h5">{inspector?.phone}; {inspector?.email}</p>
                  <select
                    style={{ display: inspectorEditMode ? "" : "none" }}
                    className="form-select" 
                    aria-label="Select a new inspector"
                    value={newInspector}
                    onChange={(e)=> setNewInspector(e.target.value)}>
                    <option value="">Select a new inspector</option>
                    {inspectors?.map(inspector => (
                      <option key={inspector?.id} value={inspector?.id}>
                        {inspector?.first_name} {inspector?.last_name} - {inspector?.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card mt-2">
                <div className="toast-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title p-2">Lender Details</h4>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-primary m-3"  
                      aria-label="Edit"
                      onClick={toggleLenderEditMode}
                      style={{ display: lenderEditMode ? "none" : "" }}
                    >Edit</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary m-1"  
                      aria-label="Edit"
                      onClick={toggleLenderEditMode}
                      style={{ display: lenderEditMode ? "" : "none" }}
                    >Discard</button>
                    <button 
                      type="button" 
                      className="btn btn-warning m-3"  
                      aria-label="Edit"
                      onClick={saveLenderChanges}
                      style={{ display: lenderEditMode ? "" : "none" }}
                    >Save</button>
                  </div>
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <label htmlFor="address">Lender Name:</label>
                  <p className="h5">{lender?.first_name} {lender?.last_name} - {lender?.company}</p>
                  <label htmlFor="address">Contact Info:</label>
                  <p className="h5">{lender?.phone}; {lender?.email}</p>
                  <select
                    style={{ display: lenderEditMode ? "" : "none" }}
                    className="form-select" 
                    aria-label="Select a new lender"
                    value={newLender}
                    onChange={(e)=> setNewLender(e.target.value)}>
                    <option value="">Select a new lender</option>
                    {lenders?.map(lender => (
                      <option key={lender?.id} value={lender?.id}>
                        {lender?.first_name} {lender?.last_name} - {lender?.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card mt-2">
                <div className="toast-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title p-2">Title Company Details</h4>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-primary m-3"  
                      aria-label="Edit"
                      onClick={toggleTitlecoEditMode}
                      style={{ display: titlecoEditMode ? "none" : "" }}
                    >Edit</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary m-1"  
                      aria-label="Edit"
                      onClick={toggleTitlecoEditMode}
                      style={{ display: titlecoEditMode ? "" : "none" }}
                    >Discard</button>
                    <button 
                      type="button" 
                      className="btn btn-warning m-3"  
                      aria-label="Edit"
                      onClick={saveTitlecoChanges}
                      style={{ display: titlecoEditMode ? "" : "none" }}
                    >Save</button>
                  </div>
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <label htmlFor="address">Title Company Name:</label>
                  <p className="h5">{titleco?.first_name} {titleco?.last_name} - {titleco?.company}</p>
                  <label htmlFor="address">Contact Info:</label>
                  <p className="h5">{titleco?.phone}; {titleco?.email}</p>
                  <select
                    style={{ display: titlecoEditMode ? "" : "none" }}
                    className="form-select" 
                    aria-label="Select a new title company"
                    value={newTitleco}
                    onChange={(e)=> setNewTitleco(e.target.value)}>
                    <option value="">Select a new title company</option>
                    {titlecos?.map(titleco => (
                      <option key={titleco?.id} value={titleco?.id}>
                        {titleco?.first_name} {titleco?.last_name} - {titleco?.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card mt-2">
                <div className="toast-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title p-2">Seller's Agent Details</h4>
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-primary m-3"  
                      aria-label="Edit"
                      onClick={toggleAgentEditMode}
                      style={{ display: agentEditMode ? "none" : "" }}
                    >Edit</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary m-1"  
                      aria-label="Edit"
                      onClick={toggleAgentEditMode}
                      style={{ display: agentEditMode ? "" : "none" }}
                    >Discard</button>
                    <button 
                      type="button" 
                      className="btn btn-warning m-3"  
                      aria-label="Edit"
                      onClick={saveAgentChanges}
                      style={{ display: agentEditMode ? "" : "none" }}
                    >Save</button>
                  </div>
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <label htmlFor="address">Seller's Agent Name:</label>
                  <p className="h5">{agent?.first_name} {agent?.last_name} - {agent?.company}</p>
                  <label htmlFor="address">Contact Info:</label>
                  <p className="h5">{agent?.phone}; {agent?.email}</p>
                  <select
                    style={{ display: agentEditMode ? "" : "none" }}
                    className="form-select" 
                    aria-label="Select a new Seller's agent"
                    value={newAgent}
                    onChange={(e)=> setNewAgent(e.target.value)}>
                    <option value="">Select a new agent</option>
                    {agents?.map(agent => (
                      <option key={agent?.id} value={agent?.id}>
                        {agent?.first_name} {agent?.last_name} - {agent?.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
                                     
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-2 mb-5">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-lg"
                  onClick={() => navigate('/home')}
                  disabled
                >
                  Archive Transaction
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger btn-lg"
                  onClick={() => deleteTransaction()}
                >
                  Delete Transaction
                </button>
              </div>
              
            </div>
          </form>
        </div>
        <div className="col-lg-4 d-none d-lg-block">
          <MapLookup address={addressFull} />
          <Calendar/>
          <AllTasks/>
        </div>
      </div>
    </div>
    </>
  )
}