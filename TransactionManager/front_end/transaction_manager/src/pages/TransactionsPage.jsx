import { Link } from "react-router-dom"

export default function TransactionsPage(){
  return(
    <>
    <div id="page_title_container">
      <h1>Transactions</h1>
    </div>
    <div id="below_title_container">
      <div id="left_side_container">
        <Link to="/transactions/pending">
          <div className="contacts_link_box">
            <h2>Pending Transactions</h2>
          </div>
        </Link>
        <Link to="/transactions/completed">
          <div className="contacts_link_box">
            <h2>Completed Transactions</h2>
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