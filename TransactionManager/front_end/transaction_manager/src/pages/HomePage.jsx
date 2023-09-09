// import { Navigate } from "react-router-dom";
import { userContext } from "../App"
import { api } from "../utilities"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Calendar from "../components/Calendar";
import AllTasks from "../components/AllTasks";

export default function HomePage(){
  const navigate = useNavigate();

  const { 
    whoAmI, 
    setUser,
    tasks,
    setTasks,
    transactions,
    setTransactions,
    properties,
    setProperties,
    getTransactions,
    getTasks,
    clients,
    getClients,
    formatDate,
   } = useContext(userContext);


  useEffect(()=>{
    const initiateContactList = async() => {
      try {
        const response = await api.post('contacts/')
      } catch (error) {
        console.error("Error initializing contact list:", error)
      }
    }
    // whoAmI()
    initiateContactList();
    getTransactions();
    getClients();
    getTasks();
  },[]);

  return(
    <>
    <div id="homepage_container" className="container">
      <div className="row">
        <div className="col-lg-8 col-12">
          <h1>Dashboard</h1>
          <div id="dashboard_items" className="container">
              <div className="container bg-secondary text-white">
                <p className="h2 mb-0">Active Transactions</p>
              </div>
            <div id="active_transactions_container" className="container border mb-2 bg-secondary-subtle text-emphasis-secondary">
              <div className="d-grid justify-content-md-end mb-2">
                <button 
                  type="button"
                  className="btn btn-primary btn-sm mt-1"
                  onClick={()=>navigate("/transactions/new")}>New Transaction
                </button>
              </div>
              <div className="list-group mb-2">
                {transactions.map((transaction) => {
                  const client = clients.find(client => client.id === transaction.client_id);
                  const property = properties.find(property => property.id === transaction.property_id)
                  return (
                    <Link
                      to={`/transactions/${transaction.id}`}
                      className="list-group-item list-group-item-action"
                      key={transaction.id}
                    >
                    {transaction?.type}: {property?.street}; {client?.first_name} {client?.last_name}; Closing: {transaction.closing_date}  
                    </Link>
                  )
                })                 
                }
              </div>          
            </div>
            <div id="active_tasklists_container" className="container border">
              <h2>Active Task Lists</h2>
              <div className="list-group mb-2 text-emphasis-secondary">
                {transactions.map((transaction) => {
                  const client = clients.find(client => client.id === transaction.client_id);
                  const property = properties.find(property => property.id === transaction.property_id)
                  const transaction_tasks = tasks.filter(task => task.transaction_id === transaction.id && task.complete === false)
                  // console.log(tasks);
                  return (
                    <Link 
                      to={`/tasks/${transaction.id}`}
                      key={transaction?.id}
                      className="text-decoration-none">
                      <div className="card mb-3">
                        <div className="card-body bg-secondary-subtle text-emphasis-secondary">
                          <h5 className="cart-title">PENDING: {property?.street}, {property?.city}, {property?.state} {property?.zip}</h5>
                          <h6 className="card-subtitle mb-2 text-body-secondary">Client: {client?.first_name} {client?.last_name}</h6>
                          <h6 className="card-subtitle mb-2 text-body-secondary">Closing Date: {transaction?.closing_date}</h6>
                          <ul className="list-group">
                            <li className="list-group-item bg-secondary text-white">Pending Tasks</li>
                            {transaction_tasks.map((task) => {
                                return (
                                  <li key={task.id} className="list-group-item">{formatDate(task.due_date)} {task.title}</li>
                                )
                            })}
                          </ul>
                        </div>                        
                      </div>
                    </Link>
                  )
                })}
              </div>
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