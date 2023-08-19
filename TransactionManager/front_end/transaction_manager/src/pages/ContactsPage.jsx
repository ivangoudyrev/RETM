import { Link } from "react-router-dom"

export default function ContactsPage(){
  return(
    <>
    <div id="page_title_container">
      <h1>Contacts</h1>
    </div>
    <div id="below_title_container">
      <div id="left_side_container">
        <Link to="/contacts/clients">
          <div className="contacts_link_box">
            <h2>Clients</h2>
          </div>
        </Link>
        <Link to="/contacts/lenders">
          <div className="contacts_link_box">
            <h2>Lenders</h2>
          </div>
        </Link>
        <Link to="/contacts/titlecos">
          <div className="contacts_link_box">
            <h2>Title Companies</h2>
          </div>
        </Link>
        <Link to="/contacts/inspectors">
          <div className="contacts_link_box">
            <h2>Inspectors</h2>
          </div>
        </Link>
        <Link to="/contacts/agents">
          <div className="contacts_link_box">
            <h2>Agents</h2>
          </div>
        </Link>
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