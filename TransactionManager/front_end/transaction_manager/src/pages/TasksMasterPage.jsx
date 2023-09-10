import { Link } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../App"
import Task from "../components/Task";

export default function TasksMasterPage() {
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


  return (
    <>
    <div className="container">
      <div className="row mt-2 border">
        <div className="col-lg-8 col-12">
          <p className="h2">Tasks</p>
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to={`/tasks/master`} className="nav-link active bg-secondary text-white">
                  <p className="h6">Master Task List</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/tasks/templates/buy`} className="nav-link text-black border" aria-current="page">
                  <p className="h6">Task Templates</p>
                </Link>
              </li>
            </ul>
            {
              tasks.map((task) => {
                const transaction = transactions?.find(transaction => task.transaction_id === transaction.id)
                const property = properties?.find(property => transaction?.property_id === property.id)
                const client = clients?.find(client => transaction?.client_id === client.id)  
                return <Task
                  key={task.id}
                  id={task.id}
                  task={task}
                  title={task.title}
                  details={task.details}
                  due_date={task.due_date}
                  complete={task.complete}
                  essential={task.essential}
                  notes={task.notes}
                  removeTask={removeTask}
                  // addTask={addTask}
                  // editTask={editTask}
                  // transactionId={transactionId}
                  setTasks={setTasks}
                />

              })
            }

          </div>
        </div>
      </div>
    </div>
    </>
  )
}