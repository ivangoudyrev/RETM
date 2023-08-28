import { api } from "../utilities"
import { useState, useEffect } from "react"
import Transaction from "../components/Transaction"
import TransactionAbbrv from "../components/TransactionAbbrv"
import { useNavigate } from "react-router-dom"

export default function PendingTransactionsPage(){
  const navigate = useNavigate();
  const [clients, setClients] = useState([])
  const [properties, setProperties] = useState([])
  const [transactions, setTransactions] = useState([])
  const [agents, setAgents] = useState([])
  const [lenders, setLenders] = useState([])
  const [inspectors, setInspectors] = useState([])
  const [titlecos, setTitleCos] = useState([])
  
  const [selectTransaction, setSelectTransaction] = useState("")
  const [selectClient, setSelectClient] = useState("")
  const [selectProperty, setSelectProperty] = useState("")
  const [selectAgent, setSelectAgent] = useState("")
  const [selectInspector, setSelectInspector] = useState("")
  const [selectTitleCo, setSelectTitleCo] = useState("")
  const [selectLender, setSelectLender] = useState("")

  const [showTransactionDetails, setShowTransactionDetails] = useState(false)
  const [showTransactionsList, setShowTransactionsList] = useState(true)

  const [showTransactionClientDetails, setShowTransactionClientDetails] = useState(false)
  const [showTransactionClientInput, setShowTransactionClientInput] = useState(true)
  const [showTransactionPropertyDetails, setShowTransactionPropertyDetails] = useState(false)
  const [showTransactionPropertyInput, setShowTransactionPropertyInput] = useState(true)
  const [showTransactionAgentDetails, setShowTransactionAgentDetails] = useState(false)
  const [showTransactionAgentInput, setShowTransactionAgentInput] = useState(true)
  const [showTransactionLenderDetails, setShowTransactionLenderDetails] = useState(false)
  const [showTransactionLenderInput, setShowTransactionLenderInput] = useState(true)
  const [showTransactionInspectorDetails, setShowTransactionInspectorDetails] = useState(false)
  const [showTransactionInspectorInput, setShowTransactionInspectorInput] = useState(true)
  const [showTransactionTitleCoDetails, setShowTransactionTitleCoDetails] = useState(false)
  const [showTransactionTitleCoInput, setShowTransactionTitleCoInput] = useState(true)
  const [showTransactionPurchaseDetails, setShowTransactionPurchaseDetails] = useState(false)
  const [showTransactionPurchaseInput, setShowTransactionPurchaseInput] = useState(true)

  useEffect(() => {
    getTransactions();
    getProperties();
    getClients();
    getLenders();
    getAgents();
    getTitleCos();
    getInspectors();
  },[])

  useEffect(()=>{
    getProperty();
    getClient();
    getAgent();
    getLender();
    getTitleCo();
    getInspector();
  },[selectTransaction])

  const getTransactions = async() => {
    let response = await api.get("transactions/");
    setTransactions(response.data);
  }
  const getProperties = async() => {
    let response = await api.get("properties/");
    setProperties(response.data);
  }
  const getClients = async() => {
    let response = await api.get("contacts/clients/");
    setClients(response.data);
  }

  const getAgents = async() => {
    let response = await api.get("contacts/agents/");
    setAgents(response.data);
  }

  const getLenders = async() => {
    let response = await api.get("contacts/lenders/");
    setLenders(response.data);
  }

  const getInspectors = async() => {
    let response = await api.get("contacts/inspectors/");
    setInspectors(response.data);
  }

  const getTitleCos = async() => {
    let response = await api.get("contacts/titlecos/");
    setTitleCos(response.data);
  }

  const getTransaction = async(id) => {
    let response = await api.get(`transactions/${id}/`);
    setSelectTransaction(response.data);
  }

  const getProperty = () => {
    let response = properties.find((property) => property.id === selectTransaction.property_id);
    setSelectProperty(response)
  }

  const getClient = () => {
    let response = clients.find((client) => client.id === selectTransaction.client_id);
    setSelectClient(response)
  }

  const getAgent = () => {
    let response = agents.find((agent) => agent.id === selectTransaction.agent_id);
    setSelectAgent(response)
  }

  const getLender = () => {
    let response = lenders.find((lender) => lender.id === selectTransaction.lender_id);
    setSelectLender(response)
  }

  const getInspector = () => {
    let response = inspectors.find((inspector) => inspector.id === selectTransaction.inspector_id);
    setSelectInspector(response)
  }

  const getTitleCo = () => {
    let response = titlecos.find((titleco) => titleco.id === selectTransaction.title_id);
    setSelectTitleCo(response)
  }

  const toggleOnTransactionDetails = () => {
    setShowTransactionDetails(true);
    setShowTransactionClientDetails(true);
    setShowTransactionPropertyDetails(true);
    setShowTransactionAgentDetails(true);
    setShowTransactionLenderDetails(true);
    setShowTransactionInspectorDetails(true);
    setShowTransactionTitleCoDetails(true);
    setShowTransactionPurchaseDetails(true);
    setShowTransactionsList(false);
    setShowTransactionClientInput(false);
    setShowTransactionPropertyInput(false);
    setShowTransactionAgentInput(false);
    setShowTransactionLenderInput(false);
    setShowTransactionInspectorInput(false);
    setShowTransactionTitleCoInput(false);
    setShowTransactionPurchaseInput(false);
  }

  const toggleOffTransactionDetails = () => {
    setShowTransactionDetails(false);
    setShowTransactionsList(true);
  }

  const newTransactionHandle = () => {
    setShowTransactionsList(false);
    setShowTransactionDetails(true);
  }

  return(
    <>
    <div className="page_title_container">
      <h1>Pending Transactions</h1>
    </div>
    <div className="below_title_container">
      <div className="left_side_container">
        <div className="left_side_button_component">
          <div 
            className="add_button_container"
            // style={{ display: showNewClientButton ? "" : "none" }}
            >
            <button onClick={navigate('/transactions/new')}>New Transaction</button>
          </div>
        </div>
        <div 
          style={{ display: showTransactionDetails ? "" : "none" }}
          // className="left_side_component"
        >
          <h2>{selectProperty?.street} Transaction Details</h2>
          <div>
            {<Transaction 
              selectTransaction = {selectTransaction}
              selectProperty = {selectProperty}
              selectClient = {selectClient}
              selectAgent = {selectAgent}
              selectLender = {selectLender}
              selectTitleCo = {selectTitleCo}
              selectInspector = {selectInspector}
              toggleOffTransactionDetails = {toggleOffTransactionDetails}

              showTransactionClientDetails = {showTransactionClientDetails} 
              setShowTransactionClientDetails = {setShowTransactionClientDetails}
              showTransactionClientInput = {showTransactionClientInput} 
              setShowTransactionClientInput = {setShowTransactionClientInput}

              showTransactionPropertyDetails = {showTransactionPropertyDetails} 
              setShowTransactionPropertyDetails = {setShowTransactionPropertyDetails}
              showTransactionPropertyInput = {showTransactionPropertyInput} 
              setShowTransactionPropertyInput = {setShowTransactionPropertyInput}

              showTransactionAgentDetails = {showTransactionAgentDetails} 
              setShowTransactionAgentDetails = {setShowTransactionAgentDetails}
              showTransactionAgentInput = {showTransactionAgentInput} 
              setShowTransactionAgentInput = {setShowTransactionAgentInput}

              showTransactionLenderDetails = {showTransactionLenderDetails} 
              setShowTransactionLenderDetails = {setShowTransactionLenderDetails}
              showTransactionLenderInput = {showTransactionLenderInput} 
              setShowTransactionLenderInput = {setShowTransactionLenderInput}

              showTransactionInspectorDetails = {showTransactionInspectorDetails} 
              setShowTransactionInspectorDetails = {setShowTransactionInspectorDetails}
              showTransactionInspectorInput = {showTransactionInspectorInput} 
              setShowTransactionInspectorInput = {setShowTransactionInspectorInput}

              showTransactionTitleCoDetails = {showTransactionTitleCoDetails} 
              setShowTransactionTitleCoDetails = {setShowTransactionTitleCoDetails}
              showTransactionTitleCoInput = {showTransactionTitleCoInput} 
              setShowTransactionTitleCoInput = {setShowTransactionTitleCoInput}

              showTransactionPurchaseDetails = {showTransactionPurchaseDetails} 
              setShowTransactionPurchaseDetails = {setShowTransactionPurchaseDetails}
              showTransactionPurchaseInput = {showTransactionPurchaseInput} 
              setShowTransactionPurchaseInput = {setShowTransactionPurchaseInput}
            />}
          </div>
        </div>
        <div style={{ display: showTransactionsList ? "" : "none" }}>
          <h2>List of Transactions</h2>
          {transactions.map((transaction) => {
            return <TransactionAbbrv 
              key={transaction.id}
              transaction = {transaction}
              property = {properties.find((property) => property.id === transaction.property_id)}
              client = {clients.find((client) => client.id === transaction.client_id)}
              getTransaction = {getTransaction}
              toggleOnTransactionDetails = {toggleOnTransactionDetails}
            />
          })}
        </div>
      </div>
      <div className="right_side_container">
        <div className="cal_container">
        </div>
        <div className="tasks_container"></div>
      </div>

    </div>
    </>
  )
}