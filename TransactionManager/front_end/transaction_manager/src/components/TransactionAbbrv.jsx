export default function TransactionAbbrv(props){
  const { 
    transaction,
    property,
    client,
    getTransaction,
    toggleOnTransactionDetails,
  } = props; 
  
  const select = () => {
    getTransaction(transaction.id);
    toggleOnTransactionDetails();
    // console.log(transaction.id)
    // console.log(property.id)
  }

  const street = property?.street
  const city = property?.city
  const state = property?.state
  const zip = property?.zip
  const client_first_name = client?.first_name
  const client_last_name = client?.last_name
  const closing_date = transaction?.closing_date

  return (
    <div className="left_side_component">
      <h4>{street}, {city}, {state} {zip}</h4>
      <p>Buyer: {client_first_name} {client_last_name}</p>
      <p>Closing Date: {closing_date}</p>
      <div id="edit_button_container">
        <button onClick={select}>Select</button>
      </div>
    </div>
  )
}