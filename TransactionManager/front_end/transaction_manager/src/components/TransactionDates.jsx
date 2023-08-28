import { userContext } from "../App"
import { useContext } from "react"

export default function TransactionDates(props){
  const {
    formatDate
  } = useContext(userContext);

  const {
    street,
    ratify_date,
    closing_date,
    emd_deadline,
    inspection_deadline
  } = props;

  return (
    <ul className="list-group">
      <li className="list-group-item bg-secondary text-white">{street}</li>
      <li className="list-group-item fs-6">Ratify Date: {formatDate(ratify_date)}</li>
      <li className="list-group-item fs-6">Inspection Deadline: {formatDate(inspection_deadline)}</li>
      <li className="list-group-item fs-6">EMD Deadline: {formatDate(emd_deadline)}</li>
      <li className="list-group-item fs-6">Closing Date: {formatDate(closing_date)}</li>
    </ul>

  )
}
