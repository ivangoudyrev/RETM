import { useState } from "react";
import { api } from "../utilities";

export default function SubTask (props) {

  // const {
  //   subtask,

  // } = props;

  const {
    subtask,
    id,
    task_id,
    title,
    details,
    due_date,
    complete,
    setRelatedSubTasks,
    transactionId,
    
    // removeTemplateSubTask,
    // editTemplateSubTask,
  } = props;

  // const [newId, setNewId] = useState(id)
  const [editTitle, setEditTitle] = useState(title);
  const [editDetails, setEditDetails] = useState(details);
  // const [editNotes, setEditNotes] useState()
  const [editComplete, setEditComplete] = useState(complete);
  const [editDueDate, setEditDueDate] = useState(due_date);
  
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const editSubTask = async(id, updatedSubTask) => {
    // console.log(updatedTemplateSubTask)
    let response = await api.put(`transactions/${transactionId}/tasks/${task_id}/subtasks/${id}/`, updatedSubTask)
    setRelatedSubTasks(response.data)
    // getTemplateSubTasks();
  }

  const removeSubTask = async(id) => {
    let response = await api.delete(`transactions/${transactionId}/tasks/${task_id}/subtasks/${id}/`)
    setRelatedSubTasks(response.data);
  }
  
  const saveChanges = () => {
    // console.log("in saveChanges", id, title)
    setEditMode(false);
    const updatedSubTask = {
      ...subtask,
      title : editTitle,
      details : editDetails,
      complete : editComplete,
      due_date : editDueDate,
      essential : false,
    }
    editSubTask(id, updatedSubTask);
  }

  const discardChanges = () => {
    setEditMode(false);
    setEditTitle(title);
    setEditDetails(details);
    setEditComplete(complete);
    setEditDueDate(due_date);
  }

  return (
    <>
    <div className="card mt-2 pl-1">
      <div className="toast-header bg-secondary-subtle d-flex justify-content-between align-items-center">
        <div id="task-input" className="form-check form-check-inline m-3">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="inlineCheckbox1" 
            value={subtask?.complete}
            checked={editComplete}
            onChange={(e) => {toggleEditMode(); setEditComplete(e.target.checked)}}
          />
          {!editMode ? (
            <p className="h6 m-0">{subtask?.title}</p>
          ) : (
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
            <button 
              type="button" 
              className="btn btn-primary m-2 p-1"  
              aria-label="Edit"
              onClick={toggleEditMode}
              // style={{ display: !editMode ? "none" : "" }}
            >Edit</button>            
          ) : (
            <>

            {/* Subtask Discard changes button */}
            <button 
              type="button" 
              className="btn btn-outline-secondary bg-white m-1 p-1"  
              aria-label="Edit"
              onClick={discardChanges}
              style={{ display: toggleEditMode ? "" : "none" }}
            >Discard</button>

            {/* Subtask Save changes button */}
            <button 
              type="button" 
              className="btn btn-warning m-1 p-1"  
              aria-label="Edit"
              onClick={saveChanges}
              style={{ display: toggleEditMode ? "" : "none" }}
            >Save</button>

            {/* Subtask Remove Button */}
            <button 
              type="button" 
              className="btn btn-danger m-1 p-1"  
              aria-label="Delete"
              onClick={() => removeSubTask(id)}
              style={{ display: toggleEditMode ? "" : "none" }}
            >Delete</button>
            </>
          )}
        </div>        
      </div>
        <div className="card-body bg-light text-emphasis-secondary p-2">
          <div id="inspection-emd-contingency-input" className="input-group g-3 ml-2 mb-2">
            <span className="input-group-text" id="basic-addon1">Due:</span>
            
            {/* Subtask Due Date */}
            <input 
              // style={{ display: purchaseDetailsEditMode ? "" : "none" }}
              type="datetime-local" 
              className="form-control" 
              id="ratifydate"
              disabled={!editMode}
              placeholder="Enter Due Date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)} 
            />
          </div>
          <div className="input-group mb-2">
            
            {/* SubTasl Details */}
            <span className="input-group-text">Details</span>
            <textarea 
              className="form-control" 
              aria-label="With textarea"
              disabled={!editMode}
              value={editDetails}
              onChange={(e) => setEditDetails(e.target.value)}
            >
            </textarea>
          </div>
        <div>
        </div>
        </div>
    </div>




















    
    {/* <div className="left_side_component">
      <div className="property_container">
        <div className="property_info_container">
          <div>
            <div className="task_completion">
              <label>
                <input 
                  type="checkbox" 
                  disabled={!editMode}
                  checked={editComplete}
                  onChange={(e) => setEditComplete(e.target.checked)}
                />
                Completed
              </label>
              <label>Due Date/Time: 
                <input 
                  type="datetime-local"
                  disabled={!editMode}
                  value={editDueDate}
                  onChange={(e) => {setEditDueDate(e.target.value)}}
                  />
                </label>
            </div>
            <input 
              className="task_title"
              value={editTitle}
              disabled={!editMode}
              type="text" 
              onChange={(e) => setEditTitle(e.target.value)}
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
              value={editDetails}
              disabled={!editMode}
              onChange={(e) => setEditDetails(e.target.value)}
            >  
            </textarea>
          </div>  
        </div>
        <div id="button_container">
          <div className="viewing_button_container">
            {!editMode ? (
              <div id="edit_button_container">
                <button onClick={toggleEditMode}>Edit Sub-Task</button>
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
              <button onClick={() => removeSubTask(id)}>Remove Sub-Task</button>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>
  )
}