// This file is no longer needed.  Plan for removal.

import ClientsPage from "../pages/ClientsPage";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../utilities";
import numeral from 'numeral';
import { useNavigate } from "react-router-dom";

export default function Transaction(props) {
  const navigate = useNavigate();

  const {
    selectTransaction,
    selectProperty,
    selectClient,
    selectAgent,
    selectLender,
    selectTitleCo,
    selectInspector,
    toggleOffTransactionDetails,

    showTransactionClientDetails, 
    showTransactionClientInput, 
    setShowTransactionClientInput,
    showTransactionPropertyDetails, 
    showTransactionPropertyInput, 
    setShowTransactionPropertyInput,
    showTransactionAgentDetails, 
    showTransactionAgentInput, 
    setShowTransactionAgentInput,
    showTransactionLenderDetails, 
    showTransactionLenderInput, 
    setShowTransactionLenderInput,
    showTransactionInspectorDetails, 
    showTransactionInspectorInput, 
    setShowTransactionInspectorInput,
    showTransactionTitleCoDetails, 
    showTransactionTitleCoInput, 
    setShowTransactionTitleCoInput,
    showTransactionPurchaseDetails, 
    showTransactionPurchaseInput, 
    setShowTransactionPurchaseInput,
  } = props;
  
  const [clients, setClients] = useState([])
  const [agents, setAgents] = useState([])
  const [lenders, setLenders] = useState([])
  const [inspectors, setInspectors] = useState([])
  const [titlecos, setTitleCos] = useState([])
  const [properties, setProperties] = useState([])
  
  const [newProperty, setNewProperty] = useState("")
  const [newClient, setNewClient] = useState("")
  const [newLender, setNewLender] = useState("")
  const [newTitleCo, setNewTitleCo] = useState("")
  const [newInspector, setNewInspector] = useState("")
  const [newAgent, setNewAgent] = useState("")
  
  const [newType, setNewType] = useState("Buy")
  const [newRawPrice, setNewRawPrice] = useState(0)
  const [newPrice, setNewPrice] = useState("")
  const [newRatifyDate, setNewRatifyDate] = useState("")
  const [newClosingDate, setNewClosingDate] = useState("")
  const [newEMDAmt, setNewEMDAmt] = useState("")
  const [newRawEMDAmt, setNewRawEMDAmt] = useState(0)
  const [newEMDDays, setNewEMDDays] = useState("")
  const [newEMDBusinessDays, setNewEMDBusinessDays] = useState(true)
  const [newLoanReq, setNewLoanReq] = useState(true)
  const [newInspectionReq, setNewInspectionReq] = useState(true)
  const [newInspectionDays, setNewInspectionDays] = useState(5)
  const [newInspectionBusinessDays, setNewInspectionBusinessDays] = useState(true)
  const [newBuyerPestInspection, setNewBuyerPestInspection] = useState(false)
  const [newPestInspector, setNewPestInspector] = useState("")
  const [newNotes, setNewNotes] = useState("")

  useEffect(() => {
    getClients();
    getAgents();
    getLenders();
    getInspectors();
    getTitleCos();
    getProperties();
  },[])

  // when a user selects an existing transaction, the new values for contacts and transaction attributes are replaced with existing values related to the selected transactions
  useEffect(() => {
    setNewRawPrice(selectTransaction?.price);
    setNewRatifyDate(selectTransaction?.ratify_date);
    setNewClosingDate(selectTransaction?.closing_date);
    setNewRawEMDAmt(selectTransaction?.emd_amt);
    setNewEMDDays(selectTransaction?.emd_days);
    setNewEMDBusinessDays(selectTransaction?.emd_business_days);
    
    setNewLoanReq(selectTransaction?.loan_req);
    setNewInspectionReq(selectTransaction?.inspection_req);
    setNewInspectionDays(selectTransaction?.inspection_days);
    setNewInspectionBusinessDays(selectTransaction?.inspection_business_days);
    setNewBuyerPestInspection(selectTransaction?.buyer_pest_inspection);
  },[selectTransaction])

  useEffect(() => {
    setNewProperty(selectProperty?.id);
  },[selectProperty])
  
  useEffect(() => {
    setNewClient(selectClient?.id);
  },[selectClient])

  useEffect(() => {
    setNewLender(selectLender?.id);
  },[selectLender])

  useEffect(() => {
    setNewTitleCo(selectTitleCo?.id);
  },[selectTitleCo])

  useEffect(() => {
    setNewInspector(selectInspector?.id);
  },[selectInspector])

  useEffect(() => {
    setNewAgent(selectAgent?.id);
  },[selectAgent])

  const getClients = async() => {
    let response = await api.get("contacts/clients/");
    // console.log(response.data)
    setClients(response.data);
  }

  const getAgents = async() => {
    let response = await api.get("contacts/agents/");
    // console.log(response.data)
    setAgents(response.data);
  }

  const getLenders = async() => {
    let response = await api.get("contacts/lenders/");
    // console.log(response.data)
    setLenders(response.data);
  }

  const getInspectors = async() => {
    let response = await api.get("contacts/inspectors/");
    // console.log(response.data)
    setInspectors(response.data);
  }
  
  const getTitleCos = async() => {
    let response = await api.get("contacts/titlecos/");
    // console.log(response.data)
    setTitleCos(response.data);
  }

  const getProperties = async() => {
    let response = await api.get("properties/");
    setProperties(response.data);
  }

  const handlePriceFormat = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setNewRawPrice(parseFloat(numericValue));
    const formattedValue = numeral(numericValue).format('0,0');
    setNewPrice(formattedValue);
  }

  const handleEMDFormat = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setNewRawEMDAmt(parseFloat(numericValue));
    const formattedValue = numeral(numericValue).format('0,0');
    setNewEMDAmt(formattedValue);
  }

  const addTransation = async() => {
    let response = await api.post("transactions/", {
      "type" : newType,
      "client_id_id" : newClient,
      "property_id_id" : newProperty,
      "ratify_date" : newRatifyDate,
      "closing_date" : newClosingDate,
      "price" : newRawPrice,
      "emd_amt" : newRawEMDAmt,
      "emd_days" : newEMDDays,
      "emd_business_days" : newEMDBusinessDays,
      "loan_req" : newLoanReq,
      "lender_id_id" : newLender,
      "title_id_id" : newTitleCo,
      "inspection_req" : newInspectionReq,
      "inspection_days" : newInspectionDays,
      "inspection_business_days" : newInspectionBusinessDays,
      "inspector_id_id" : newInspector,
      "buyer_pest_inspection" : newBuyerPestInspection,
      "agent_id_id" : newAgent
    })
    // console.log(response.data)
    // navigate("transactions/");
    toggleOffTransactionDetails();
  }

  const deleteTransaction = async(id) => {
    await api.delete(`transactions/${id}`)
    navigate('/transactions/pending');
  }

  const editTransaction = async(id, updatedTransaction) => {
    await api.put(`transactions/${id}/`, updatedTransaction)
    getClient();
  }

  const saveChanges = () => {
    toggleOnTransactionClientInput();
    toggleOnTransactionPropertyInput();
    toggleOnTransactionAgentInput();
    toggleOnTransactionLenderInput();
    toggleOnTransactionInspectorInput();
    toggleOnTransactionTitleCoInput();
    toggleOnTransactionPurchaseInput();

    const updatedTransaction = {
      ...selectTransaction,
      property_id : newProperty,
      client_id : newClient,
      agent_id : newAgent,
      inspector_id : newInspector,
      title_id : newTitleCo,
      lender_id : newLender,
      price: newRawPrice,
      ratify_date: newRatifyDate,
      closing_date: newClosingDate,
      emd_amt: newRawEMDAmt,
      emd_days: newEMDDays,
      emd_business_days: newEMDBusinessDays,
      loan_req: newLoanReq,
      inspection_req: newInspectionReq,
      inspection_days: newInspectionDays,
      inspection_business_days: newInspectionBusinessDays,
      buyer_pest_inspection: newBuyerPestInspection,
    }
    editTransaction(selectTransaction.id, updatedTransaction);
  }
  
  const cancel = () =>{
    toggleOffTransactionDetails();
  }

  const toggleOnTransactionClientInput = () => {
    setShowTransactionClientInput(!showTransactionClientInput);
  }

  const toggleOnTransactionPropertyInput = () => {
    setShowTransactionPropertyInput(!showTransactionPropertyInput);
  }

  const toggleOnTransactionAgentInput = () => {
    setShowTransactionAgentInput(!showTransactionAgentInput);
  }

  const toggleOnTransactionLenderInput = () => {
    setShowTransactionLenderInput(!showTransactionLenderInput);
  }

  const toggleOnTransactionInspectorInput = () => {
    setShowTransactionInspectorInput(!showTransactionInspectorInput);
  }

  const toggleOnTransactionTitleCoInput = () => {
    setShowTransactionTitleCoInput(!showTransactionTitleCoInput);
  }

  const toggleOnTransactionPurchaseInput = () => {
    setShowTransactionPurchaseInput(!showTransactionPurchaseInput);
  }

  return (
    <>
      {/* Client Information Block */}
      <div className="left_side_component">
        <h3>Client Information</h3>
        <div>
          <select 
            style={{ display: showTransactionClientInput ? "" : "none" }}
            onChange={(e) => setNewClient(e.target.value)}>
            <option value={newClient} disabled selected>Select a client</option>
              {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.first_name} {client.last_name}; phone: {client.phone}; email: {client.email}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: showTransactionClientDetails ? "" : "none" }}>
          <p>Buyer: {selectClient?.first_name} {selectClient?.mid_init} {selectClient?.last_name}</p>
          <p>Phone: {selectClient?.phone}</p>
          <p>Email: {selectClient?.email}</p>
          <button onClick={toggleOnTransactionClientInput}>Edit</button>
          <button onClick={toggleOnTransactionClientInput}>Discard Changes</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
      
      <div className="left_side_component">
        <h3>Property Information</h3>
        <div style={{ display: showTransactionPropertyInput ? "" : "none" }}>
          <select onChange={(e) => setNewProperty(e.target.value)}>
            <option value={newProperty} disabled selected>Select a Property</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.street}, {property.city}, {property.state} {property.zip}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: showTransactionPropertyDetails ? "" : "none" }}>
          <p>Address: {selectProperty?.street}, {selectProperty?.city}, {selectProperty?.state} {selectProperty?.zip}</p>
          <p>HOA: 
            <input 
              type="checkbox" 
              checked={selectProperty?.hoa}
              disabled
            />          
          </p>
          <p>Well: 
            <input 
              type="checkbox" 
              checked={selectProperty?.well}
              disabled
            />          
          </p>
          <p>Septic: 
            <input 
              type="checkbox" 
              checked={selectProperty?.septic}
              disabled
            />          
          </p>
          <button onClick={toggleOnTransactionPropertyInput}>Edit</button>
          <button onClick={toggleOnTransactionPropertyInput}>Discard Changes</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>

      <div className="left_side_component">
        <h3>Agent Information</h3>
        <div style={{ display: showTransactionAgentInput ? "" : "none" }}>
          <select onChange={(e) => setNewAgent(e.target.value)}>
            <option value={newAgent} disabled selected>Select an Agent</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>
                {agent.first_name} {agent.last_name} - {agent.company}; phone: {agent.phone}; email:{agent.email}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: showTransactionAgentDetails ? "" : "none" }}>
          <p>Seller's Agent: {selectAgent?.company} - {selectAgent?.first_name} {selectAgent?.mid_init} {selectAgent?.last_name}</p>
          <p>Phone: {selectAgent?.phone}</p>
          <p>Email: {selectAgent?.email}</p>
          <button onClick={toggleOnTransactionAgentInput}>Edit</button>
          <button onClick={toggleOnTransactionAgentInput}>Discard Changes</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
      
      <div className="left_side_component">
        <h3>Loan Information</h3>
        <div style={{ display: showTransactionLenderInput ? "" : "none" }}>
          <div>
            <label>
              <input 
                type="checkbox"
                checked={newLoanReq}
                onChange={(e) => setNewLoanReq(e.target.checked)}
              />
              Loan required
            </label>
          </div>
          <select onChange={(e) => setNewLender(e.target.value)}>
            <option value={newLender} disabled selected>Select an Lender</option>
            {lenders.map(lender => (
              <option key={lender.id} value={lender.id}>
                {lender.first_name} {lender.last_name} - {lender.company}; phone: {lender.phone}; email:{lender.email}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: showTransactionLenderDetails ? "" : "none" }}>
          <p>Lender: {selectLender?.company} - {selectLender?.first_name} {selectLender?.mid_init} {selectLender?.last_name}</p>
          <p>Phone: {selectLender?.phone}</p>
          <p>Email: {selectLender?.email}</p>
          <button onClick={toggleOnTransactionLenderInput}>Edit</button>
          <button onClick={toggleOnTransactionLenderInput}>Discard Changes</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
      
      <div className="left_side_component">
        <h3>Inspection Information</h3>
        <div style={{ display: showTransactionInspectorInput ? "" : "none" }}>
          <div>
            <label>
              <input 
                type="checkbox"
                checked={newInspectionReq}
                onChange={(e) => setNewInspectionReq(e.target.checked)}
              />
              Home Inspection Requested
            </label>
            <label>
              <input 
                type="checkbox"
                checked={newBuyerPestInspection}
                onChange={(e) => setNewBuyerPestInspection(e.target.checked)}
              />
              Responsible for Pest Inspection
            </label>
          </div>
          <div>
            <p>Inspection Contingency expires in:</p>
            <input 
              className="days_input"
              placeholder="0"
              value={newInspectionDays}
              onChange={(e) => setNewInspectionDays(e.target.value)} 
            />
            <p>days</p>
            <label>
              <input 
                type="checkbox"
                checked={newEMDBusinessDays}
                onChange={(e) => setNewEMDBusinessDays(e.target.checked)}
              />
              business days
            </label>
          </div>
          <select onChange={(e) => setNewInspector(e.target.value)}>
            <option value={newInspector} disabled selected>Select an Inspector</option>
            {inspectors.map(inspector => (
              <option key={inspector.id} value={inspector.id}>
                {inspector.first_name} {inspector.last_name} - {inspector.company}; phone: {inspector.phone}; email:{inspector.email}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: showTransactionInspectorDetails ? "" : "none" }}>
          <p>Inspection Contingency Expires on: {selectTransaction?.inspection_deadline}</p>
          <p>Inspector: {selectInspector?.company} - {selectInspector?.first_name} {selectInspector?.mid_init} {selectInspector?.last_name}</p>
          <p>Phone: {selectInspector?.phone}</p>
          <p>Email: {selectInspector?.email}</p>
          <button onClick={toggleOnTransactionInspectorInput}>Edit</button>
          <button onClick={toggleOnTransactionInspectorInput}>Discard Changes</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>

      <div className="left_side_component">
        <h3>Title Company Information</h3>
        <div style={{ display: showTransactionTitleCoInput ? "" : "none" }}>
          <select onChange={(e) => setNewTitleCo(e.target.value)}>
            <option value={newTitleCo} disabled selected>Select a Title Company</option>
            {titlecos.map(titleco => (
              <option key={titleco.id} value={titleco.id}>
                {titleco.first_name} {titleco.last_name} - {titleco.company}; phone: {titleco.phone}; email:{titleco.email}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: showTransactionTitleCoDetails ? "" : "none" }}>
          <p>EMD of {selectTransaction?.emd_amt} is due on : {selectTransaction?.emd_deadline}</p>
          <p>Title Company: {selectTitleCo?.company} - {selectTitleCo?.first_name} {selectTitleCo?.mid_init} {selectTitleCo?.last_name}</p>
          <p>Phone: {selectTitleCo?.phone}</p>
          <p>Email: {selectTitleCo?.email}</p>
          <button onClick={toggleOnTransactionTitleCoInput}>Edit</button>
          <button onClick={toggleOnTransactionTitleCoInput}>Discard Changes</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
      
      <div className="left_side_component">
        <h3>Purchase Details</h3>
        <div style={{ display: showTransactionPurchaseInput ? "" : "none" }}>
          <p>Purchase Price:</p>
          <input 
            className="currency_input"
            type="text"
            placeholder="Enter amount"
            value={newPrice}
            onChange={handlePriceFormat} 
          />
        </div>
        <div style={{ display: showTransactionPurchaseDetails ? "" : "none" }}>
          <p>Purchase Price: {selectTransaction?.price}</p>
        </div>
        <div style={{ display: showTransactionPurchaseInput ? "" : "none" }}>
          <p>Contract Ratification Date:</p>
          <input 
            className="date"
            type="datetime-local"
            placeholder="YYYY-MM-DD"
            value={newRatifyDate}
            onChange={(e) => setNewRatifyDate(e.target.value)} 
          />
        </div>
        <div style={{ display: showTransactionPropertyDetails ? "" : "none" }}>
          <p>Contract Ratification Date: {selectTransaction?.ratify_date}</p>
        </div>
        <div style={{ display: showTransactionPurchaseInput ? "" : "none" }}>
          <p>Closing Date:</p>
          <input 
            className="date"
            type="datetime-local"
            placeholder="YYYY-MM-DD"
            value={newClosingDate}
            onChange={(e) => setNewClosingDate(e.target.value)} 
          />
        </div>
        <div style={{ display: showTransactionPurchaseDetails ? "" : "none" }}>
          <p>Closing Date: {selectTransaction?.closing_date}</p>
        </div>
        <div style={{ display: showTransactionPurchaseInput ? "" : "none" }}>
          <p>EMD Amount:</p>
          <input 
            className="currency_input"
            placeholder="$"
            value={newEMDAmt}
            onChange={handleEMDFormat} 
          />
          <div style={{ display: showTransactionPurchaseDetails ? "" : "none" }}>
            <p>EMD Amount: {selectTransaction?.emd_amt}</p>
          </div>
          <p>due in:</p>
          <input 
            className="days_input"
            placeholder="0"
            value={newEMDDays}
            onChange={(e) => setNewEMDDays(e.target.value)} 
          />
          <p>days</p>
          <label>
            <input 
              type="checkbox"
              checked={newEMDBusinessDays}
              onChange={(e) => setNewEMDBusinessDays(e.target.checked)}
            />
            business days
          </label>
        </div>
        <div style={{ display: showTransactionPurchaseDetails ? "" : "none" }}>
          <p>EMD Due Date: {selectTransaction?.emd_deadline}</p>
          <button onClick={toggleOnTransactionPurchaseInput}>Edit</button>
          <button onClick={toggleOnTransactionPurchaseInput}>Discard Changes</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
      
      <div>
        <div id="edit_button_container">
          <button onClick={cancel}>Cancel</button>
        </div>
        <div id="remove_button_container">
          <button onClick={addTransation}>Save Transaction</button>
        </div>
        <div id="edit_button_container">
          <button onClick={() => deleteTransaction(selectTransaction.id)}>Delete Transaction</button>
        </div>
      </div>
    </>
  )
}