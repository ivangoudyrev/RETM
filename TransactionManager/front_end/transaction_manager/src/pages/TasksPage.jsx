import { Link } from "react-router-dom"
import { useState } from "react"

export default function TasksPage(){
  
  return(
    <>
    <div className="page_title_container">
      <p className="h2">Contacts</p>
    </div>
    <div className="below_title_container">
      <div className="left_side_container">
        <Link to="/contacts/clients">
          <div className="left_side_component">
            <h2>Clients</h2>
          </div>
        </Link>
        <Link to="/contacts/lenders">
          <div className="left_side_component">
            <h2>Lenders</h2>
          </div>
        </Link>
        <Link to="/contacts/titlecos">
          <div className="left_side_component">
            <h2>Title Companies</h2>
          </div>
        </Link>
        <Link to="/contacts/inspectors">
          <div className="left_side_component">
            <h2>Inspectors</h2>
          </div>
        </Link>
        <Link to="/contacts/agents">
          <div className="left_side_component">
            <h2>Agents</h2>
          </div>
        </Link>
      </div>
      <div className="right_side_container">
        <div className="cal_container">
        </div>
        <div className="tasks_container"></div>
      </div>
    </div>
    <div className="page_title_container">
      <h1>Tasks</h1>
    </div>
    <div className="below_title_container">
      <div className="left_side_container">
        <div className="left_side_button_component">
        </div>
        <div className="left_side_component">
          <Link to="/tasks/master">
            <div className="contacts_link_box">
              <h2>Master Task List</h2>
            </div>
          </Link>
        </div>
        <div className="left_side_component">
          <Link to="/tasks/templates">
            <div className="contacts_link_box">
              <h2>Task Templates</h2>
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