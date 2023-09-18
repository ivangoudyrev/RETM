import { useState } from "react";
import { api } from "../utilities";

export default function SubTaskTemplate (props) {

  const {
    task_id,
    subtask,
    id,
    title,
    details,
    setRelatedSubtasks,
  } = props;

  const [newTitle, setNewTitle] = useState(title)
  const [newDetails, setNewDetails] = useState(details)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const editTemplateSubTask = async(id, updatedTemplateSubTask) => {
    // console.log(updatedTemplateSubTask)
    await api.put(`taskmenu/${task_id}/subtasks/${id}/`, updatedTemplateSubTask)
    // getTemplateSubTasks();
  }
  
  const removeTemplateSubTask = async() => {
    let response = await api.delete(`taskmenu/${task_id}/subtasks/${id}/`)
    console.log(response.data)
    setRelatedSubtasks(response.data);
  }

  const saveChanges = () => {
    // console.log("in saveChanges", id, title)
    setEditMode(false);
    const updatedTemplateSubTask = {
      ...subtask,
      title: newTitle,
      details: newDetails,
    }
    editTemplateSubTask(id, updatedTemplateSubTask);
  }


  const discardChanges = () => {
    setEditMode(false);
    setNewTitle(title);
    setNewDetails(details);
  }

  return (
    <>
    <div className="card mt-2 pl-1 border-dark border-1">
      <div className="toast-header bg-secondary-subtle d-flex justify-content-between align-items-center">
        <div className="form-check form-check-inline m-3">
          <input 
            className="task_title"
            value={newTitle}
            disabled={!editMode}
            type="text" 
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          {!editMode ? (
            <button
              type="button"
              className="btn btn-primary m-2 p-1"  
              aria-label="Edit"
              onClick={toggleEditMode}
            >Edit</button>
          ):(
            <>
            <button
              type="button"
              className="btn btn-outline-secondary bg-white m-1 p-1"  
              aria-label="Edit"
              onClick={discardChanges}
            >Discard</button>
            <button 
              type="button" 
              className="btn btn-warning m-1 p-1"  
              aria-label="Edit"
              onClick={saveChanges}
            >Save</button>
            <button 
              type="button" 
              className="btn btn-danger m-1 p-1"  
              aria-label="Delete"
              onClick={() => removeTemplateSubTask(id)}
            >Delete</button>
            </>
          )}
        </div>
        <div className="card-body bg-light text-emphasis-secondary p-2">
          <span className="input-group-text">Details</span>
          <textarea 
            className="form-control"
            aria-label="With textarea"
            cols="30" 
            rows="4"
            // placeholder="Notes"
            value={newDetails}
            disabled={!editMode}
            onChange={(e) => setNewDetails(e.target.value)}
          >  
          </textarea>
        </div>  
      </div>
        {/* <div id="button_container">
          <div className="viewing_button_container">
            {!editMode ? (
              <div id="edit_button_container">
                <button 
                  type="button" 
                  className="btn btn-primary m-2 p-1"  
                  aria-label="Edit"
                  onClick={toggleEditMode}
                >Edit Sub-Task</button>
              </div>
            ) : (
              <div id="editing_button_container">
                <div id="edit_button_container">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary bg-white m-1 p-1"  
                    aria-label="Edit"
                    onClick={discardChanges}
                  >Discard Changes</button>
                </div>
                <div id="remove_button_container">
                  <button 
                    type="button" 
                    className="btn btn-warning m-1 p-1"  
                    aria-label="Edit"
                    onClick={saveChanges}
                  >Save changes</button>
                </div>
              </div>
            )}
            <div id="remove_button_container">
              <button 
                type="button" 
                className="btn btn-danger m-1 p-1"  
                aria-label="Delete"
                onClick={() => removeTemplateSubTask(id)}
              >Remove Sub-Task</button>
            </div>
          </div>
        </div> */}
    </div>
    {/* </div> */}
    </>
  )
}