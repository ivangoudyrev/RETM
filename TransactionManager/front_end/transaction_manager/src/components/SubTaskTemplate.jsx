import { useState } from "react";
import { api } from "../utilities";

export default function SubTaskTemplate (props) {

  // const {
  //   subtask,

  // } = props;

  const {
    subtask,
    id,
    title,
    details,
    removeTemplateSubTask,
    // editTemplateSubTask,
  } = props;

  const [newId, setNewId] = useState(id)
  const [newTitle, setNewTitle] = useState(title)
  const [newDetails, setNewDetails] = useState(details)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const editTemplateSubTask = async(id, updatedTemplateSubTask) => {
    // console.log(updatedTemplateSubTask)
    await api.put(`subtaskmenu/${id}/`, updatedTemplateSubTask)
    getTemplateSubTasks();
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
    <div className="card mt-2 pl-1">
      <div className="toast-header bg-secondary-subtle d-flex justify-content-between align-items-center">
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
        <div id="button_container">
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
        </div>
      </div>
    </div>
    </>
  )
}