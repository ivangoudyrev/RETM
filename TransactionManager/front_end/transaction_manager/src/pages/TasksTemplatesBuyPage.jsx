import { Link } from "react-router-dom"
import { api } from "../utilities"
import { useEffect, useState } from "react"
import TaskTemplate from "../components/TaskTemplate";
// import SubTaskTemplate from "../components/SubTaskTemplate";


export default function TasksTemplatesBuyPage(){
  const [templateTasks, setTemplateTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDetails, setNewDetails] = useState("")
  
  const [templateSubTasks, setTemplateSubTasks] = useState([]);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("")
  const [newSubTaskDetails, setNewSubTaskDetails] = useState("")
  const [newParentTask, setNewParentTask] = useState("")

  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [showNewTaskBox, setShowNewTaskBox] = useState(false);

  useEffect(()=>{
    getTemplateTasks();
    getTemplateSubTasks();
  },[])

  const getTemplateTasks = async() => {
    let response = await api.get("taskmenu/");
    setTemplateTasks(response.data)
    // console.log("Tasks:", response.data);
  }

  const getTemplateSubTasks = async() => {
    let response = await api.get("subtaskmenu/");
    setTemplateSubTasks(response.data);
    // console.log("Subtasks:", response.data)
  }

  const addTemplateTask = async() => {
    await api.post("taskmenu/",{
      "title" : newTitle,
      "details" : newDetails,
    });
    getTemplateTasks();
    setNewTitle("");
    setNewDetails("");
    newTaskSaveDiscardHandle();
  }

  // const addTemplateSubTask = async() => {
  //   console.log("POST:", newSubTaskTitle, newSubTaskDetails, newParentTask)
  //   let response = await api.post("subtaskmenu/",{
  //     "task_id_id": newParentTask,
  //     "title" : newSubTaskTitle,
  //     "details" : newSubTaskDetails,
  //   });
  //   console.log(response.data)
  //   setNewParentTask("");
  //   getTemplateSubTasks();
  //   setNewSubTaskTitle("");
  //   setNewSubTaskDetails("");
    
  // }

  const removeTemplateTask = async(id) => {
    await api.delete(`taskmenu/${id}/`)
    getTemplateTasks();
  }

  const removeTemplateSubTask = async(id) => {
    await api.delete(`subtaskmenu/${id}/`)
    getTemplateSubTasks();
  }

  const editTemplateTask = async(id, updatedTemplateTask) => {
    // console.log(updatedTemplateTask)
    await api.put(`taskmenu/${id}/`, updatedTemplateTask)
    getTemplateTasks();
  }

  const editTemplateSubTask = async(id, updatedTemplateSubTask) => {
    // console.log(updatedTemplateSubTask)
    await api.put(`subtaskmenu/${id}/`, updatedTemplateSubTask)
    getTemplateSubTasks();
  }

  const newTaskHandle = () => {
    setShowNewTaskButton(false);
    setShowNewTaskBox(true);
  }

  const newTaskSaveDiscardHandle = () => {
    setShowNewTaskButton(true);
    setShowNewTaskBox(false);
    setNewTitle("");
    setNewDetails("");
  }

  return(
    <>
      <div className="page_title_container">
        <h1>"Buy" Task List Template</h1>
      </div>
      <div className="below_title_container">
        <div className="left_side_container">
          <div>
            <div className="left_side_button_component">
              <div
                className="add_button_container"
                style={{ display: showNewTaskButton ? "" : "none" }}>
                <button onClick={newTaskHandle}>New Task</button>
              </div>
            </div>
            <div className="left_side_component">
              <div 
                id="new_property_form_container" 
                className="property_container"
                style={{ display: showNewTaskBox ? "" : "none" }}>
                <div className="property_info_container">
                  <div className="task_title">
                    <input 
                      className="street_dynamic_input"
                      placeholder="Task Title"
                      size=""
                      value={newTitle}
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
                      placeholder="Notes"
                      value={newDetails}
                      // disabled={!editMode}
                      onChange={(e) => setNewDetails(e.target.value)}
                    >  
                    </textarea>
                  </div>            
                </div>
                <div id="button_container">
                  <div className="viewing_button_container">
                    <div id="edit_button_container">
                      <button 
                        onClick={newTaskSaveDiscardHandle}
                      >Cancel</button>
                    </div>
                    <div id="remove_button_container">
                      <button 
                        onClick={addTemplateTask}
                      >Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {
                templateTasks.map((task) => {
                  return <TaskTemplate 
                  key={task.id}
                  task={task}
                  id={task.id}
                  title={task.title}
                  details={task.details}
                  templateSubTasks = {templateSubTasks}
                  removeTemplateTask = {removeTemplateTask}            
                  editTemplateTask = {editTemplateTask}
                  removeTemplateSubTask = {removeTemplateSubTask}
                  editTemplateSubTask = {editTemplateSubTask}
                  getTemplateSubTasks = {getTemplateSubTasks}
                  />
                })
              }
            </div>
          </div>
        </div>
        <div id="right_side_container">
          <div id="cal_container"></div>
          <div id="tasks_container"></div>
        </div>
      </div> 
    </>
  )
}