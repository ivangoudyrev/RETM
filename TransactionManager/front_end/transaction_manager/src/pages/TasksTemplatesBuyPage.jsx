import { Link } from "react-router-dom"
import { api } from "../utilities"
import { useEffect, useState } from "react"
import TaskTemplate from "../components/TaskTemplate";
import Calendar from "../components/Calendar";
import AllTasks from "../components/AllTasks";
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
    // getTemplateSubTasks();
  },[])

  const getTemplateTasks = async() => {
    let response = await api.get("taskmenu/");
    setTemplateTasks(response.data)
    // console.log("Tasks:", response.data);
  }

  // const getTemplateSubTasks = async() => {
  //   let response = await api.get("subtaskmenu/");
  //   setTemplateSubTasks(response.data);
  // }

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

  

  const editTemplateTask = async(id, updatedTemplateTask) => {
    // console.log(updatedTemplateTask)
    await api.put(`taskmenu/${id}/`, updatedTemplateTask)
    getTemplateTasks();
  }

  const editTemplateSubTask = async(id, updatedTemplateSubTask) => {
    // console.log(updatedTemplateSubTask)
    await api.put(`subtaskmenu/${id}/`, updatedTemplateSubTask)
    // getTemplateSubTasks();
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
    <div className="container">
      <div className="row mt-2 border">
        <div className="col-lg-8 col-12">
          <p className="h2">Tasks</p>
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to={`/tasks/master`} className="nav-link text-black border">
                  <p className="h6">Master Task List</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/tasks/templates/buy`} className="nav-link active bg-secondary text-white" aria-current="page">
                  <p className="h6">Task Templates</p>
                </Link>
              </li>
            </ul>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to={`/tasks/templates/buy`} className="nav-link active bg-secondary text-white">
                  <p className="h6">"Buy" Transaction Template</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/tasks/templates`} className="nav-link disabled border" aria-current="page">
                  <p className="h6">"Sell" Transaction Templates</p>
                </Link>
              </li>
            </ul>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
              <button
                className="btn btn-primary"
                type="button"
                style={{ display: showNewTaskButton ? "" : "none" }}
                onClick={newTaskHandle}
              > Add a Task</button>
            </div>
            <div 
              className="card mt-2 bg-secondary pl-1"
              style={{ display: showNewTaskBox ? "" : "none" }}>
              <div className="toast-header d-flex justify-content-between align-items-center">
                <input 
                  type="text"
                  id="task-input"
                  className="form-control mx-1 mt-1 mb-1"
                  placeholder="Add New Task Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}/>
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">Details</span>
                <textarea 
                  className="form-control"
                  placeholder="Add a description of this task"
                  aria-label="With textarea"
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}>
                </textarea>
              </div>
              <div className="col-12">
                <button 
                  type="submit"
                  className="btn btn-outline-secondary bg-white"
                  onClick={newTaskSaveDiscardHandle}
                >Cancel</button>
                <button
                  type="submit"
                  className="btn btn-primary mx-2"
                  onClick={addTemplateTask}
                >Save</button>
              </div>
            </div>

            <div>
              {
                templateTasks?.map((task) => {
                  return <TaskTemplate 
                  key={task.id}
                  task={task}
                  id={task.id}
                  title={task.title}
                  details={task.details}
                  // templateSubTasks = {templateSubTasks}
                  removeTemplateTask = {removeTemplateTask}            
                  editTemplateTask = {editTemplateTask}
                  // removeTemplateSubTask = {removeTemplateSubTask}
                  editTemplateSubTask = {editTemplateSubTask}
                  // getTemplateSubTasks = {getTemplateSubTasks}
                  />
                })
              }
            </div>

          </div>
        </div>
        <div className="col-lg-4 d-none d-lg-block">
          <Calendar/>
          <AllTasks/>
        </div>
      </div>
    </div>
    </>
  )
}