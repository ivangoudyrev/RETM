import { useState } from "react";
import SubTaskTemplate from "../components/SubTaskTemplate";
import { api } from "../utilities";

export default function TaskTemplate (props) {
  const {
    task,
    id,
    title,
    details,
    templateSubTasks,

    removeTemplateTask,
    editTemplateTask,

    getTemplateSubTasks,
    removeTemplateSubTask,

  } = props;

  const [newId, setNewId] = useState(id)
  const [newTitle, setNewTitle] = useState(title)
  const [newDetails, setNewDetails] = useState(details)
  const [editMode, setEditMode] = useState(false)
  
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("")
  const [newSubTaskDetails, setNewSubTaskDetails] = useState("")

  const [showNewSubTaskButton, setShowNewSubTaskButton] = useState(true);
  const [showNewSubTaskBox, setShowNewSubTaskBox] = useState(false);

  const [addSubtaskMode, setAddSubtaskMode] = useState(false);

  const [showSubtasks, setShowSubtasks] = useState(false);

  const relatedSubTasks = templateSubTasks.filter(subTask => subTask.task_id === id)


  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const addTemplateSubTask = async() => {
    // console.log("POST:", newSubTaskTitle, newSubTaskDetails, id)
    let response = await api.post("subtaskmenu/",{
      "task_id_id": id,
      "title" : newSubTaskTitle,
      "details" : newSubTaskDetails,
    });
    // console.log(response.data)
    getTemplateSubTasks();
    setNewSubTaskTitle("");
    setNewSubTaskDetails("");
    newSubTaskSaveDiscardHandle();
  }

  const saveChanges = () => {
    // console.log("in saveChanges", id, title)
    setEditMode(false);
    const updatedTemplateTask = {
      ...task,
      title: newTitle,
      details: newDetails,
    }
    editTemplateTask(id, updatedTemplateTask);
  }

  const discardChanges = () => {
    setEditMode(false);
    setNewTitle(title);
    setNewDetails(details);
  }

  const newSubTaskHandle = () => {
    setShowNewSubTaskButton(false);
    setShowNewSubTaskBox(true);
  }

  const newSubTaskSaveDiscardHandle = () => {
    setShowNewSubTaskButton(true);
    setShowNewSubTaskBox(false);
    setNewSubTaskTitle("");
    setNewSubTaskDetails("");
  }

  const toggleSubtasksWindow = () => {
    setShowSubtasks(!showSubtasks);
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
  

  return (
    <>
    <div className="card mt-2 mb-2 pl-1 border-dark border-2">
      <div className="toast-header bg-secondary text-white d-flex justify-content-between align-items-center">
        <div className="form-check form-check-inline m-1">
          {!editMode ? (
            <p className="h6 m-0">{task?.title}</p>
          ) : (
            <input 
            type="text" 
            className="form-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
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
              onClick={() => removeTemplateTask(id)}
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
      <div className="input-group mb-2">
        <span className="input-group-text">Details</span>
        <textarea 
          className="form-control"
          aria-label="With textarea" 
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
          disabled={!editMode}
        ></textarea>
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
                  onClick={addTemplateSubTask}
                  // style={{ display: toggleEditMode ? "" : "none" }}
                >Save</button>
              </div>        
            </div>
              <div className="card-body bg-light text-emphasis-secondary p-1">
                
                

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
              return <SubTaskTemplate 
                key={subtask.id}
                subtask={subtask}
                id={subtask.id}
                task_id={id}
                title={subtask.title}
                details={subtask.details}
                removeTemplateSubTask = {removeTemplateSubTask}            
                // editTemplateSubTask = {editTemplateSubTask}
              />
            })}
        </div>
        )
        }




    </div>










    <div className="left_side_component">
      <div className="property_container">
        <div className="property_info_container">
          <div>
            <input 
              className="task_title"
              value={newTitle}
              disabled={!editMode}
              type="text" 
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div>
            <textarea 
              className="task_details"
              name="" 
              id="" 
              cols="30" 
              rows="4"
              // placeholder="Notes"
              value={newDetails}
              disabled={!editMode}
              onChange={(e) => setNewDetails(e.target.value)}
            >  
            </textarea>
          </div>

          <div>
            <div 
              className="add_button_container"
              style={{ display: showNewSubTaskButton ? "" : "none" }}>
              <button onClick={newSubTaskHandle}>New Sub-Task</button>
            </div>
            <div
              id="new_property_form_container" 
              className="property_container"
              style={{ display: showNewSubTaskBox ? "" : "none" }}>
              <div className="property_info_container">
                <div className="task_title">
                  <input 
                    className="street_dynamic_input"
                    placeholder="Sub-Task Title"
                    value={newSubTaskTitle}
                    onChange={(e) => setNewSubTaskTitle(e.target.value)}
                  />
                </div>
                <div>
                  <textarea 
                    className="task_details"
                    name="" 
                    id="" 
                    cols="30" 
                    rows="4"
                    placeholder="Notes"
                    value={newSubTaskDetails}
                    // disabled={!editMode}
                    onChange={(e) => setNewSubTaskDetails(e.target.value)}
                  >  
                  </textarea>
                </div>  
              </div>
              <div id="button_container">
                <div className="viewing_button_container">
                  <div id="edit_button_container">
                    <button 
                      onClick={newSubTaskSaveDiscardHandle}
                    >Cancel</button>
                  </div>
                  <div id="remove_button_container">
                    <button 
                      onClick={addTemplateSubTask}
                    >Save</button>
                  </div>
                </div>
                </div>
            </div>
          </div>
          <div>
              {
                relatedSubTasks.map((subtask) => {
                  return <SubTaskTemplate 
                  key={subtask.id}
                  subtask={subtask}
                  id={subtask.id}
                  task_id={id}
                  title={subtask.title}
                  details={subtask.details}
                  removeTemplateSubTask = {removeTemplateSubTask}            
                  // editTemplateSubTask = {editTemplateSubTask}
                  />
                })
              }
          </div>   
            
        </div>
        <div id="button_container">
          <div className="viewing_button_container">
            {!editMode ? (
              <div id="edit_button_container">
                <button onClick={toggleEditMode}>Edit Task</button>
              </div>
            ) : (
              <div id="editing_button_container">
                <div id="edit_button_container">
                  <button onClick={discardChanges}>Discard Changes</button>
                </div>
                <div id="remove_button_container">
                  <button onClick={saveChanges}>Save changes</button>
                </div>
              </div>
            )}
            <div id="remove_button_container">
              <button onClick={() => removeTemplateTask(id)}>Remove Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}