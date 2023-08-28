import { Link } from "react-router-dom"

export default function TransactionsPage(){
  
  return(
    <>
    <div className="page_title_container">
      <h1>Transactions</h1>
    </div>
    <div className="below_title_container">
      <div className="left_side_container">
        <div className="left_side_button_component">
        </div>
        <div className="left_side_component">
          <Link to="/transactions/pending">
            <div className="contacts_link_box">
              <h2>Pending Transactions</h2>
            </div>
          </Link>
        </div>
        <div className="left_side_component">
          <Link to="/transactions/completed">
            <div className="contacts_link_box">
              <h2>Completed Transactions</h2>
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