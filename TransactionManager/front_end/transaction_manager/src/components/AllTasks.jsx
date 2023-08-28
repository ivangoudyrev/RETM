import { userContext } from "../App"
import { useContext } from "react"

export default function AllTasks() {
  const {
    tasks,
    transactions,
    properties,
    formatDate,
  } = useContext(userContext);

  return (
    <ul className="list-group">
      <li className="list-group-item bg-secondary text-white">All Pending Tasks</li>
      {tasks?.map((task) => {
        const transaction = transactions?.find(transaction => task.transaction_id === transaction.id)
        const property = properties?.find(property => transaction?.property_id === property.id)
        return (
          <li key={task.id} className="list-group-item fs-6">{formatDate(task.due_date)}: {property?.street} - {task?.title}</li>
        )
      })}
    </ul>
  )
}