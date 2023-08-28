import { Link } from "react-router-dom"

export default function ContactsPage(){
  return(
    <>
    <div className="page_title_container">
      <h1>Contacts</h1>
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
    </>
  )
}