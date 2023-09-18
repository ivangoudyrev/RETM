import { api } from "../utilities";
import SubTask from "./SubTask";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../App";

export default function Task(props) {
  const {
    // removeTask,
    editTask
  } = useContext(userContext);

  const {
    task,
    id,
    title,
    details,
    // removeTask,
    // editTask,
    
    due_date,
    complete,
    essential,
    notes,

    transactionId,

    setTasks,
  } = props;
  
  // const [newId, setNewId] = useState(id)
  const [taskId, setTaskId] = useState(id)
  const [editTitle, setEditTitle] = useState(title);
  const [editDetails, setEditDetails] = useState(details);
  const [editDueDate, setEditDueDate] = useState(task?.due_date);
  const [editComplete, setEditComplete] = useState(task?.complete);
  const [editEssential, setEditEssential] = useState(essential);
  const [editNotes, setEditNotes] = useState(notes);

  const [newTitle, setNewTitle] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newComplete, setNewComplete] = useState(false);
  const [newEssential, setNewEssential] = useState(false);
  const [newNotes, setNewNotes] = useState("");
  
  const [editMode, setEditMode] = useState(false)
  const [createMode, setCreateMode] = useState(false)

  const [relatedSubTasks, setRelatedSubTasks] = useState([])

  // const [editSubTaskTitle, setEditSubTaskTitle] = useState("")
  // const [editSubTaskDetails, setEditSubTaskDetails] = useState("")
  // const [editSubTaskDueDate, setEditSubTaskDueDate] = useState("");
  // const [editSubTaskComplete, setEditSubTaskComplete] = useState("");
  // const [editSubTaskNotes, setEditSubTaskNotes] = useState("");

  const [newSubTaskTitle, setNewSubTaskTitle] = useState("")
  const [newSubTaskDetails, setNewSubTaskDetails] = useState("")
  const [newSubTaskDueDate, setNewSubTaskDueDate] = useState("");
  const [newSubTaskComplete, setNewSubTaskComplete] = useState(false);
  const [newSubTaskEssential, setNewSubTaskEssential] = useState(false);
  const [newSubTaskNotes, setNewSubTaskNotes] = useState("");

  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [showNewTaskBox, setShowNewTaskBox] = useState(false);

  const [showNewSubTaskButton, setShowNewSubTaskButton] = useState(true);
  const [showNewSubTaskBox, setShowNewSubTaskBox] = useState(false);

  const [addSubtaskMode, setAddSubtaskMode] = useState(false);
  const [addSubtasks, setAddSubtasks] = useState(false);

  const [showSubtasks, setShowSubtasks] = useState(false);

  const [showNewTaskWindow, setShowNewTaskWindow] = useState(false);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  // const relatedSubTasks = templateSubTasks.filter(subTask => subTask.task_id === id)
  
  useEffect(() => {
    const getSubtasks = async() => {
      let response = await api.get(`transactions/${transactionId}/tasks/${id}/subtasks/`);
      setRelatedSubTasks(response.data);
      if (response.data.length > 0) {setShowSubtasks(true)}
    }
    getSubtasks();
  },[])

  useEffect(() => {
    if (!relatedSubTasks.length>0) {
      setShowSubtasks(false);
    }
  },[relatedSubTasks])

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }



  const addTask = async() => {
    let response = await api.post(`transactions/${transactionId}/tasks/`, {
      "type" : "Buy",
      "title" : newTitle,
      "details" : newDetails,
      "due_date" : newDueDate,
      "complete" : false,
      "essential": false,
      "notes" : newNotes,
    })
    setTasks(response.data);
    // newTaskSaveDiscardHandle();
    // clearNewTaskFields();
    toggleNewTaskForm();
  }

  const removeTask = async(id) => {
    let response = await api.delete(`transactions/${transactionId}/tasks/${id}/`)
    setTasks(response.data);
  }

  const addSubTask = async() => {
    // console.log("POST:", newSubTaskTitle, newSubTaskDetails, id)
    let response = await api.post(`transactions/${transactionId}/tasks/${id}/subtasks/`,{
      "type": "Buy",
      "title" : newSubTaskTitle,
      "details" : newSubTaskDetails,
      "due_date" : newSubTaskDueDate,
      "complete" : newSubTaskComplete,
      "essential" : false,
      "notes" : "",
    });
    setRelatedSubTasks(response.data);
    // console.log(response.data)
    // getTemplateSubTasks();
    // setNewSubTaskTitle("");
    // setNewSubTaskDetails("");
    // newSubTaskSaveDiscardHandle();
    // discardSubtaskChanges();
    toggleAddSubtaskMode();
    setNewSubTaskTitle("");
    setNewSubTaskDueDate("");
    setNewSubTaskDetails("");

  }

  const saveChanges = () => {
    // console.log("in saveChanges", id, title)
    setEditMode(false);
    const updatedTask = {
      ...task,
      title: editTitle,
      details: editDetails,
      due_date: editDueDate,
      complete: editComplete,
      essential: editEssential,
      notes: editNotes,
    }
    // console.log(updatedTask);
    editTask(transactionId, id, updatedTask);
  }

  const discardChanges = () => {
    setEditMode(false);
    setEditTitle(title);
    setEditDetails(details);
    setEditDueDate(due_date);
    setEditComplete(complete);
    setEditEssential(essential);
    setEditNotes(notes);
  }

  const clearNewTaskFields = () => {
    // setEditMode(false);
    setNewTitle("");
    setNewDetails("");
    setNewDueDate("");
    setNewComplete(false);
    setNewEssential(false);
    setEditNotes("");
  }

  const newSubTaskHandle = () => {
    setShowAddNewSubTaskButton(false);
    setShowSaveNewSubTaskButton(true);
    setShowCancelNewSubTaskBox(true);
  }

  const newSubTaskSaveDiscardHandle = () => {
    setShowNewSubTaskButton(true);
    setShowNewSubTaskBox(false);
    setNewSubTaskTitle("");
    setNewSubTaskDetails("");
  }

  const newTaskHandle = () => {
    setShowNewTaskButton(false);
    setShowNewTaskBox(true);
  }

  const newTaskSaveDiscardHandle = () => {
    setShowNewTaskButton(true);
    setShowNewTaskBox(false);
    // setNewTitle("");
    // setNewDetails("");
    setNewTitle("");
    setNewDetails("");
    setNewDueDate("");
    setNewComplete(false);
    setNewEssential(false);
    setEditNotes("");
  }

  const toggleAddSubtasks = () => {
    setAddSubtasks(!addSubtasks);
  }

  const toggleAddSubtaskMode = () => {
    setAddSubtaskMode(!addSubtaskMode)
  }

  const discardSubtaskChanges = () => {
    toggleAddSubtaskMode();
    // console.log(relatedSubTasks.length)
    if (!relatedSubTasks?.length>0) {
      toggleSubtasksWindow();
    }
    // clear new subtask fields
  }

  const toggleSubtasksWindow = () => {
    setShowSubtasks(!showSubtasks);
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
    <div className="card mt-2 mb-2 pl-1 border-dark border-2">
      <div className="toast-header bg-secondary text-white d-flex justify-content-between align-items-center">
        <div id="task-input" className="form-check form-check-inline m-1">
          
          {/* Task Complete Checkbox */}
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="inlineCheckbox1" 
            value={task?.complete}
            checked={editComplete}
            onChange={(e) => {toggleEditMode(); setEditComplete(e.target.checked)}}
          />
          {!editMode ? (
            // Task Title Published Box
            <p className="h6 m-0">{task?.title}</p>
          ) : (
            // Task Title Input Box
            <input 
              type="text" 
              id="task-input"
              className="form-control"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          )}
        </div>
        <div>
          {!editMode ? (
            // Task Edit Button
            <button 
              type="button" 
              className="btn btn-primary m-2 p-1"  
              style={{ '--bs-btn-padding-y': '.25rem', '--bs-btn-padding-x': '.5rem', '--bs-btn-font-size': '.75rem' }}
              aria-label="Edit"
              onClick={toggleEditMode}
              // style={{ display: !editMode ? "none" : "" }}
            >Edit</button>            
          ) : (
            <div className="container p-0">

            {/* Task Discard Changes Button */}
            <button 
              type="button" 
              className="btn btn-outline-secondary bg-white m-1 p-1"  
              aria-label="Edit"
              onClick={discardChanges}
              style={{ 
                display: toggleEditMode ? "" : "none",
                '--bs-btn-padding-y': '.25rem',
                '--bs-btn-padding-x': '.5rem',
                '--bs-btn-font-size': '.75rem' 
              }}
            >Discard</button>

            {/* Task Save Changes Button */}
            <button 
              type="button" 
              className="btn btn-warning m-1 p-1"  
              aria-label="Edit"
              onClick={saveChanges}
              style={{ 
                display: toggleEditMode ? "" : "none",
                '--bs-btn-padding-y': '.25rem',
                '--bs-btn-padding-x': '.5rem',
                '--bs-btn-font-size': '.75rem'
              }}
            >Save</button>

            {/* Task Delete Button  */}
            <button 
              type="button" 
              className="btn btn-danger m-1 p-1"  
              aria-label="Delete"
              onClick={() => removeTask(taskId)}
              style={{
                display: toggleEditMode ? "" : "none",
                '--bs-btn-padding-y': '.25rem',
                '--bs-btn-padding-x': '.5rem',
                '--bs-btn-font-size': '.75rem'
              }}
            >Delete</button>
            </div>
          )}
        </div>        
      </div>
      <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
        <div id="inspection-emd-contingency-input" className="input-group g-3 ml-2 mb-2">
          <span className="input-group-text" id="basic-addon1">Due:</span>
          
          {/* Task Date Due */}
          <input 
            // style={{ display: purchaseDetailsEditMode ? "" : "none" }}
            type="datetime-local" 
            className="form-control" 
            id="ratifydate"
            placeholder="Enter Due Date"
            disabled={!editMode}
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)} 
          />
        </div>
        <div className="input-group mb-2">
          {/* Task Details */}
          <span className="input-group-text">Details</span>
          <textarea 
            className="form-control" 
            aria-label="With textarea"
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
            disabled={!editMode}
          >
          </textarea>
        </div>
        <div className="input-group">
          <p></p>
          <span className="input-group-text">Notes</span>
          <textarea 
            className="form-control" 
            aria-label="With textarea"
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            disabled={!editMode}
          >
          </textarea>
        </div>
        {!showSubtasks ? (
        <div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button 
                // style={{ display: showSubtasks ? "none" : "" }}
                className="btn btn-outline-secondary btn-sm me-md-2 mt-1 mb-1" 
                onClick={toggleSubtasksWindow}
                type="button">
                Add Sub-Tasks</button>
            </div>
        </div>
        ) : (
        // SubTasks Area
        <div 
          // style={{ display: showSubtasks ? "" : "none" }}
          className="card p-1 border-dark border-2 mt-2">
          <div className="toast-header d-flex justify-content-between align-items-center">
            <p className="h5 mx-1">Subtasks</p>
            <div>
                <button 
                  type="button" 
                  className="btn btn-outline-primary p-1"  
                  aria-label="Add"
                  onClick={toggleAddSubtaskMode}
                  // style={{ display: addSubtaskMode ? "" : "none" }}
                >Add Subtask</button>            
            </div>
          </div>

          {/* New Subtask Form */}
          <div 
            className="card mt-2 pl-1 bg-secondary-subtle"
            style={{ display: addSubtaskMode ? "" : "none" }}>
            <div className="toast-header d-flex justify-content-between align-items-center">
              <div id="task-input" className="form-check form-check-inline m-1 p-1">
                
                {/* New subtask Complete Checkbox */}
                {/* <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="inlineCheckbox1" 
                  // value={newSubtaskComplete}
                  checked={newSubTaskComplete}
                  onChange={(e) => setNewSubTaskComplete(e.target.checked)}
                /> */}

                {/* New subtask title Input*/}
                <input 
                  type="text" 
                  id="task-input"
                  className="form-control mx-0"
                  value={newSubTaskTitle}
                  onChange={(e) => setNewSubTaskTitle(e.target.value)}
                />                  
              </div>              

              <div>
                {/* New Subtask Discard Button */}
                <button 
                  type="button" 
                  className="btn btn-outline-secondary bg-white m-1 p-1"  
                  aria-label="Edit"
                  onClick={discardSubtaskChanges}
                  // style={{ display: addSubtaskMode ? "" : "none" }}
                >Discard</button>

                {/* New Subtask Save button */}
                <button 
                  type="button" 
                  className="btn btn-warning m-1 p-1"  
                  aria-label="Edit"
                  onClick={addSubTask}
                  // style={{ display: toggleEditMode ? "" : "none" }}
                >Save</button>
              </div>        
            </div>
            <div className="card-body bg-light text-emphasis-secondary p-1">
              
              {/* New Subtask Due Date */}
              <div id="inspection-emd-contingency-input" className="input-group g-3 my-2">
                <span className="input-group-text" id="basic-addon1">Due:</span>
                <input 
                  // style={{ display: purchaseDetailsEditMode ? "" : "none" }}
                  type="datetime-local" 
                  className="form-control" 
                  id="ratifydate"
                  placeholder="Enter Due Date"
                  // disabled={!editMode}
                  value={newSubTaskDueDate}
                  onChange={(e) => setNewSubTaskDueDate(e.target.value)} 
                />
              </div>

              {/* New Subtask Details */}
              <div className="input-group mb-2">
                <span className="input-group-text">Details</span>
                <textarea 
                  className="form-control" 
                  aria-label="With textarea"
                  value={newSubTaskDetails}
                  onChange={(e) => setNewSubTaskDetails(e.target.value)}
                  // disabled={!editMode}
                >
                </textarea>
              </div>
            </div>
          </div>
          {relatedSubTasks?.map((subtask) => {
            return <SubTask 
              key={subtask.id}
              subtask={subtask}
              id={subtask.id}
              task_id={id}
              title={subtask.title}
              details={subtask.details}
              due_date={subtask.due_date}
              complete={subtask.complete}
              setRelatedSubTasks={setRelatedSubTasks}
              transactionId={transactionId}
              // removeSubTask = {removeSubTask}            
              // editTemplateSubTask = {editTemplateSubTask}
            />
          })}
        </div>
        )}
        
        
        </div>
      </div>
      {!showNewTaskForm ? (
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button 
          className="btn btn-outline-secondary btn-sm me-md-2 mt-1 mb-1" 
          type="button"
          onClick={toggleNewTaskForm}>
          Add a Task</button>
      </div>
      ) : (

      // New Task Form

      <div 
        // style={{ display: showNewTaskWindow ? "" : "none" }}
        className="card mt-2 bg-secondary pl-1">
        <div className="toast-header d-flex justify-content-between align-items-center">

          {/* New Task Title */}
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

              {/* Task Discard Changes Button */}
              <button 
                type="button" 
                className="btn btn-outline-secondary bg-white m-1 p-1"  
                aria-label="Edit"
                onClick={toggleNewTaskForm}
                // style={{ display: toggleEditMode ? "" : "none" }}
              >Discard</button>

              {/* Task Save Changes Button */}
              <button 
                type="button" 
                className="btn btn-warning m-1 p-1"  
                aria-label="Edit"
                onClick={addTask}
                // style={{ display: toggleEditMode ? "" : "none" }}
              >Save</button>
            </div>
          
          </div>        
        </div>
        <div className="card-body bg-secondary-subtle text-emphasis-secondary p-2">
          <div id="inspection-emd-contingency-input" className="input-group g-3 ml-2 mb-2">
            <span className="input-group-text" id="basic-addon1">Due:</span>
            
            {/* Task Date Due */}
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

            {/* Task Details */}
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

      )
      }


    </>
  )
}