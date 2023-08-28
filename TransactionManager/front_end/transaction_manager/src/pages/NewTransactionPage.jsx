import { useEffect, useState } from "react";
import { userContext } from "../App"
import { useContext } from "react"
// import { useParams } from "react-router-dom"
import { api } from "../utilities";
import numeral from 'numeral';
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import AllTasks from "../components/AllTasks";

export default function NewTransactionPage(){
  const {
    properties,
    clients,
  } = useContext(userContext);

  const navigate = useNavigate();  
  const [transaction, setTransaction] = useState(null);
  const [newType, setNewType] = useState("Buy");
  const [newPrice, setNewPrice] = useState("");
  const [newRawPrice, setNewRawPrice] = useState("");
  const [newRatifyDate, setNewRatifyDate] = useState("");
  const [newClosingDate, setNewClosingDate] = useState("");
  const [newEMDAmt, setNewEMDAmt] = useState("");
  const [newRawEMDAmt, setNewRawEMDAmt] = useState("");
  const [newEMDDays, setNewEMDDays] = useState("5");
  const [newEMDBusinessDays, setNewEMDBusinessDays] = useState(true);
  const [newInspectionReq, setNewInspectionReq] = useState(true);
  const [newBuyerPestInspection, setNewBuyerPestInspection] = useState(false);
  const [newInspectionDays, setNewInspectionDays] = useState("5");
  const [newInspectionBusinessDays, setNewInspectionBusinessDays] = useState(true);
  const [newLoanReq, setNewLoanReq] = useState(true);
  const [newNotes, setNewNotes] = useState("");
    
  // const [newPestInspector, setNewPestInspector] = useState("");
  
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
  
  useEffect(() =>{
    getInspectors();
    getLenders();
    getTitlecos();
    getAgents();
  },[])

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

  const createTransaction = async(updatedTransaction) => {
    const response = await api.post('transactions/', updatedTransaction);
    // console.log(response.data);
    setTransaction(response.data);
    navigate(`/transactions/${response.data.id}`);
  }

  const saveChanges = () => {

    const newTransaction = {
      // ...transaction,
      type : newType,
      client_id_id : newClient,
      property_id_id : newProperty,
      ratify_date: newRatifyDate,
      closing_date: newClosingDate,
      price: newRawPrice,
      emd_amt: newRawEMDAmt,
      emd_days: newEMDDays,
      emd_business_days: newEMDBusinessDays,
      loan_req: newLoanReq,
      lender_id_id : newLender,
      title_id_id : newTitleco,
      inspection_req: newInspectionReq,
      inspection_days: newInspectionDays,
      inspection_business_days: newInspectionBusinessDays,
      inspector_id_id : newInspector,
      buyer_pest_inspection: newBuyerPestInspection,
      agent_id_id : newAgent,
      notes: newNotes,
    }
    createTransaction(newTransaction);
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

  return(
    <>
    <div id="new_transaction_container" className="container">
      <div className="row mt-2">
        <div className="col-lg-8 col-12">
          <h1>Create New Transaction</h1>
          <form className="row g-3">
            <div className="col-12">
              <div className="card mt-2">
                <h3 className="card-title p-2">Property Details</h3>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <select 
                    className="form-select" 
                    aria-label="Select the property"
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
                <h3 className="card-title p-2">Purchase Details</h3>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <div className="row g-2 d-flex align-items-center">
                    <div className="col mb-0">
                      <label htmlFor="purchase-price">Purchase Price</label>
                      <div id="purchase-price" className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input 
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
                      />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="col mb-2">
                      <label htmlFor="ratifydate" className="form-label mb-0">Contract Ratified Date</label>
                      <input 
                        type="datetime-local" 
                        className="form-control" 
                        id="ratifydate"
                        onChange={(e) => setNewRatifyDate(e.target.value)} 
                        value={newRatifyDate}
                        placeholder="Enter Ratification Date"
                        />
                    </div>
                    <div className="col">
                      <label htmlFor="closedate" className="form-label mb-0">Closing Date</label>
                      <input 
                        type="datetime-local" 
                        className="form-control" 
                        id="closedate"
                        onChange={(e) => setNewClosingDate(e.target.value)} 
                        value={newClosingDate}
                        placeholder="Enter Ratification Date"
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-sm-6 mb-0" id="emd-amount-box">
                      <label htmlFor="emd-amount">EMD Amount</label>
                      <div id="emd-amount" className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input 
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
                  <div className="input-group g-3 mb-3" id="inspection-emd-contingency-input">
                    <span className="input-group-text" id="basic-addon1">EMD due in:</span>
                    <input 
                      type="text" 
                      className="form-control custom-input" 
                      placeholder="" 
                      aria-label="Username"
                      value={newEMDDays}
                      onChange={(e) => setNewEMDDays(e.target.value)} 
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
                      />
                    </div>
                  </div>
                  <div className="input-group g-3 mb-3" id="inspection-emd-contingency-input">
                    <span className="input-group-text" id="basic-addon1">Inspection due in:</span>
                    <input 
                      type="text" 
                      // className="form-control custom-input" 
                      className="form-control custom-input"
                      placeholder="" 
                      // aria-label="Username"
                      value={newInspectionDays}
                      onChange={(e) => setNewInspectionDays(e.target.value)} 
                      // style={{width: '10%'}}
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
                          // disabled={!purchaseDetailsEditMode}
                        />
                        Home Inspection Requested
                      </label>
                      <label>
                        <input 
                          className="form-check-input"
                          type="checkbox"
                          checked={newBuyerPestInspection}
                          onChange={(e) => setNewBuyerPestInspection(e.target.checked)}
                          // disabled={!purchaseDetailsEditMode}
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
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-2">
                <h3 className="card-title p-2">Client Information</h3>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <select 
                    className="form-select" 
                    aria-label="Select the client"
                    value={newClient}
                    onChange={(e)=> setNewClient(e.target.value)}>
                    <option value="">Select a client</option>
                    {clients?.map(client => (
                      <option key={client?.id} value={client?.id}>
                        {client?.first_name} {client?.last_name}; {client.phone}; {client.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                style= {{ display: newInspectionReq ? "" : "none" }}  
                className="card mt-2">
                <h3 className="card-title p-2">Inspector Information</h3>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <select 
                    className="form-select" 
                    aria-label="Select the inspector"
                    value={newInspector}
                    onChange={(e)=> setNewInspector(e.target.value)}>
                    <option value="">Select an inspector</option>
                    {inspectors?.map(inspector => (
                      <option key={inspector?.id} value={inspector?.id}>
                        {inspector?.first_name} {inspector?.last_name} - {inspector?.company}; {inspector.phone}; {inspector.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div 
                style= {{ display: newLoanReq ? "" : "none" }} 
                className="card mt-2">
                <h3 className="card-title p-2">Lender Information</h3>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <select 
                    className="form-select" 
                    aria-label="Select the inspector"
                    value={newLender}
                    onChange={(e)=> setNewLender(e.target.value)}>
                    <option value="">Select a lender</option>
                    {lenders?.map(lender => (
                      <option key={lender?.id} value={lender?.id}>
                        {lender?.first_name} {lender?.last_name} - {lender?.company}; {lender.phone}; {lender.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div 
                className="card mt-2">
                <h3 className="card-title p-2">Title Company Information</h3>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <select 
                    className="form-select" 
                    aria-label="Select the title company"
                    value={newTitleco}
                    onChange={(e)=> setNewTitleco(e.target.value)}>
                    <option value="">Select a title company</option>
                    {titlecos?.map(titleco => (
                      <option key={titleco?.id} value={titleco?.id}>
                        {titleco?.first_name} {titleco?.last_name} - {titleco?.company}; {titleco.phone}; {titleco.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div 
                className="card mt-2">
                <h3 className="card-title p-2">Seller's Agent Information</h3>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <select 
                    className="form-select" 
                    aria-label="Select the Seller's agent"
                    value={newAgent}
                    onChange={(e)=> setNewAgent(e.target.value)}>
                    <option value="">Select a Seller's agent</option>
                    {agents?.map(agent => (
                      <option key={agent?.id} value={agent?.id}>
                        {agent?.first_name} {agent?.last_name} - {agent?.company}; {agent.phone}; {agent.email}
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
                >
                  Discard Transaction
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg"
                  onClick={() => saveChanges()}
                >
                  Create Transaction
                </button>
              </div>
            </div>
          </form>
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