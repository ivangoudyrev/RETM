import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { api } from "../utilities";
import Task from "../components/Task";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import TransactionDates from "../components/TransactionDates.jsx";


export default function TaskListPage(){
  const { transactionId } = useParams("");
  const [transaction, setTransaction] = useState("");
  const [property, setProperty] = useState("");
  const [client, setClient] = useState("");
  const [lender, setLender] = useState("");
  const [inspector, setInspector] = useState("");
  const [agent, setAgent] = useState("");
  const [titleco, setTitleco] = useState("");

  const [tasks, setTasks] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newComplete, setNewComplete] = useState(false);
  const [newEssential, setNewEssential] = useState(false);
  const [newNotes, setNewNotes] = useState("")

  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [showNewTaskBox, setShowNewTaskBox] = useState(false);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  
  useEffect(()=>{
    const getTransaction = async() => {
      let response = await api.get(`transactions/${transactionId}/`)
      setTransaction(response.data)
    }
    const getTasks = async() => {
      let response = await api.get(`transactions/${transactionId}/tasks/`)
      setTasks(response.data)
    }
    getTransaction();
    getTasks();
  },[])
  
  useEffect(() => {
    const getProperty = async() => {
      let response = await api.get(`properties/${transaction?.property_id}/`)
      setProperty(response.data)
    }
    const getClient = async() => {
      let response = await api.get(`contacts/clients/${transaction?.client_id}/`)
      setClient(response.data)
    }
    const getLender = async() => {
      let response = await api.get(`contacts/lenders/${transaction?.lender_id}/`)
      setLender(response.data)
    }
    const getInspector = async() => {
      let response = await api.get(`contacts/inspectors/${transaction?.inspector_id}/`)
      setInspector(response.data)
    }
    const getAgent = async() => {
      let response = await api.get(`contacts/agents/${transaction?.agent_id}/`)
      setAgent(response.data)
    }
    const getTitleco = async() => {
      let response = await api.get(`contacts/titlecos/${transaction?.title_id}/`)
      setTitleco(response.data)
    }
    if (transaction && transaction.property_id) {
      getProperty();
      getClient();
      getLender();
      getInspector();
      getAgent();
      getTitleco();
    }
  },[transaction])

  const addTask = async(e) => {
    e.preventDefault();
    let response = await api.post(`transactions/${transactionId}/tasks/`, {
      "type" : "Buy",
      "title" : newTitle,
      "details" : newDetails,
      "due_date" : newDueDate,
      "complete" : false,
      "essential": newEssential,
      "notes" : newNotes,
    })
    setTasks(response.data)
  }

  // const removeTask = async(id) => {
  //   let response = await api.delete(`transactions/${transactionId}/tasks/${id}/`)
  //   setTasks(response.data);
  // }

  const editTask = async(id, updatedTask) => {
    let response = await api.put(`transactions/${transactionId}/tasks/${id}/`, updatedTask)
    // console.log(response.data)
    setTasks(response.data);
  }
  
  const newTaskHandle = () => {
    setShowNewTaskButton(false);
    setShowNewTaskBox(true);
  }

  const toggleNewTaskForm = () => {
    setShowNewTaskForm(!showNewTaskForm);
    setNewTitle("");
    setNewDueDate("");
    setNewDetails("");
    setNewComplete("");
  }
  
  return (
    <>
    <div id="new-tasklist-container" className="container">
      <div className="row mt-2 border">
        <div className="col-lg-8 col-12">
          <p className="h2">PENDING: {property?.street}</p>
          <form className="row g-3">
            <div className="col-12">
              <ul className="nav nav-tabs">
                <li className="nav-item ">
                  <Link to={`/transactions/${transactionId}`} className="nav-link text-black border">
                    <p className="h6">Transaction Details</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/tasks/${transactionId}`} className="nav-link active bg-secondary text-white" aria-current="page">
                    <p className="h6">Transaction Task List</p>
                  </Link>
                </li>
              </ul>

              {/* New Task Button */}
              
              {!showNewTaskForm ? (
              <div className="d-grid gap-2 mt-3 mb-2 d-md-flex justify-content-md-center">
                <button 
                  className="btn btn-outline-secondary btn-sm me-md-2 mt-1 mb-1" 
                  type="button"
                  onClick={toggleNewTaskForm}>
                  Add a Task</button>
              </div>

              ) : ( 

              // New Task Input Form
              <div 
                // style={{ display: showNewTaskWindow ? "" : "none" }}
                className="card mt-2 bg-secondary pl-1">
                <div className="toast-header d-flex justify-content-between align-items-center">

                  <input 
                    type="text" 
                    id="task-input"
                    className="form-control mx-1 mt-1 mb-1"
                    placeholder="Add New Task Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <div>
                    <div className="container">

                      <button 
                        type="button" 
                        className="btn btn-outline-primary bg-white text-primary m-1 p-1"  
                        aria-label="Edit"
                        onClick={toggleNewTaskForm}
                        // style={{ display: toggleEditMode ? "" : "none" }}
                      >Discard</button>

                      <button 
                        type="button" 
                        className="btn btn-warning m-1 p-1"  
                        aria-label="Edit"
                        onClick={(e) => addTask(e)}
                        // style={{ display: toggleEditMode ? "" : "none" }}
                      >Save</button>
                    </div>
                  
                  </div>        
                </div>
                <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
                  <div id="inspection-emd-contingency-input" className="input-group g-3 ml-2 mb-2">
                    <span className="input-group-text" id="basic-addon1">Due:</span>
                    
                    <input 
                      // style={{ display: purchaseDetailsEditMode ? "" : "none" }}
                      type="datetime-local" 
                      className="form-control" 
                      id="ratifydate"
                      placeholder="Enter Due Date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)} 
                    />
                  </div>
                  <div className="input-group mb-2">

                    <span className="input-group-text">Details</span>
                    <textarea 
                      className="form-control" 
                      placeholder="Add a description of this task"
                      aria-label="With textarea"
                      value={newDetails}
                      onChange={(e) => setNewDetails(e.target.value)}
                    >
                    </textarea>
                  </div>
                  <div className="input-group">
                    <p></p>
                    <span className="input-group-text">Notes</span>
                    <textarea 
                      className="form-control" 
                      aria-label="With textarea"
                      placeholder="Add some notes specific to this transaction"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              )}

              {/* )} */}


              
            
              
              



              <div>
                {
                  tasks?.map((task) => {
                    return <Task
                      key={task.id}
                      id={task.id}
                      task={task}
                      title={task.title}
                      details={task.details}
                      due_date={task.due_date}
                      complete={task.complete}
                      essential={task.essential}
                      notes={task.notes}
                      // removeTask={removeTask}
                      // addTask={addTask}
                      editTask={editTask}
                      transactionId={transactionId}
                      setTasks={setTasks}
                    />
                  })
                }
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 d-none d-lg-block top-0 left-5">
          <div className="position-fixed">
          <Calendar/>
          <TransactionDates
            street = {property.street}
            ratify_date = {transaction.ratify_date}
            closing_date = {transaction.closing_date}
            emd_deadline = {transaction.emd_deadline}
            inspection_deadline = {transaction.inspection_deadline}
          />

          </div>
        </div>
      </div>
    </div>
    </>
  )
}