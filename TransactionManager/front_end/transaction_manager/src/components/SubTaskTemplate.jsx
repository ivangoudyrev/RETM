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
              <button onClick={() => removeTemplateSubTask(id)}>Remove Sub-Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}