import { useState } from "react";
import { api } from "../utilities";

export default function SubTaskTemplate (props) {

  const {
    task_id,
    subtask,
    id,
    title,
    details,
    setRelatedSubTasks,
  } = props;

  const [newTitle, setNewTitle] = useState(title)
  const [newDetails, setNewDetails] = useState(details)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const editTemplateSubTask = async(id, updatedTemplateSubTask) => {
    await api.put(`taskmenu/${task_id}/subtasks/${id}/`, updatedTemplateSubTask)
  }
  
  const removeTemplateSubTask = async() => {
    try {
      await api.delete(`taskmenu/${task_id}/subtasks/${id}/`);
      setRelatedSubTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  }

  const saveChanges = () => {
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
            type="text" 
            className="form-control"
            value={newTitle}
            disabled={!editMode}
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
      </div>
      <div className="card-body bg-light text-emphasis-secondary p-2">
        <div div id="inspection-emd-contingency-input" className="input-group g-3 ml-2 mb-2">
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
    </div>
    </>
  )
}