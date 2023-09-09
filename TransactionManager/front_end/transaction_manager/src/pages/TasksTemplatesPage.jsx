import { Link } from "react-router-dom"

export default function TasksTemplatesPage(){
  
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
                <Link to={`/tasks/templates`} className="nav-link active bg-secondary text-white" aria-current="page">
                  <p className="h6">Task Templates</p>
                </Link>
              </li>
            </ul>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to={`/tasks/master`} className="nav-link active bg-secondary text-white">
                  <p className="h6">"Buy" Transaction Template</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/tasks/templates`} className="nav-link text-black border" aria-current="page">
                  <p className="h6">"Sell" Transaction Templates</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    
    
    
    
    <div className="page_title_container">
      <h1>Task List Templates</h1>
    </div>
    <div className="below_title_container">
      <div className="left_side_container">
        <div className="left_side_button_component">
        </div>
        <div className="left_side_component">
          <Link to="/tasks/templates/buy">
            <div className="contacts_link_box">
              <h2>"Buy" Transaction Task List Template</h2>
            </div>
          </Link>
        </div>
        <div className="left_side_component">
          <Link to="/tasks">
            <div className="contacts_link_box">
              <h2>"Sell" Transaction Task List Template</h2>
            </div>
          </Link>
        </div>
      </div>
      <div id="right_side_container">
        <div id="cal_container">
        </div>
        <div id="tasks_container"></div>
      </div>
    </div>
    </>
  )
}