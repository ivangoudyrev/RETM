import { useState } from "react"

export default function TitleCo(props){
  const { 
    titleco, 
    removeTitleCo,
    editTitleCo,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const [editFirstName, setEditFirstName] = useState(titleco.first_name)
  const [editMiddleName, setEditMiddleName] = useState(titleco.mid_init)
  const [editLastName, setEditLastName] = useState(titleco.last_name)
  const [editCompany, setEditCompany] = useState(titleco.company)
  const [editPhone, setEditPhone] = useState(titleco.phone)
  const [editEmail, setEditEmail] = useState(titleco.email)
  const [editNotes, setEditNotes] = useState(titleco.notes)

  // This function enables the edit mode for existing entries
  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
    setEditFirstName(agent?.first_name);
    setEditMiddleName(agent?.mid_init);
    setEditLastName(agent?.last_name);
    setEditCompany(agent?.company);
    setEditPhone(agent?.phone);
    setEditEmail(agent?.email);
    setEditNotes(agent?.notes);
  }

  // This function is triggered by a save button to initiate the PUT request
  // in the ProperiesPage
  const saveChanges = (e) => {
    e.preventDefault();
    setEditMode(false);
    const updatedTitleCo = {
      ...titleco,
      first_name: editFirstName,
      mid_init: editMiddleName,
      last_name: editLastName,
      company: editCompany,
      phone: editPhone,
      email: editEmail,
      notes: editNotes,
    }
    editTitleCo(titleco.id, updatedTitleCo);
  }

  return(
    <>
    <div className="card border-2 mb-2">
      <div className="toast-header bg-secondary text-white d-flex justify-content-between align-items-center p-2">
      </div>
      <form className="row g-3 p-2">
        <div className="col-md-3">
          <label htmlFor="first-name" className="form-label">First Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="first-name"
            value={editFirstName}
            disabled={!editMode}
            onChange={(e) => setEditFirstName(e.target.value)}
          />
        </div>
        <div className="col-md-1">
          <label htmlFor="midinit" className="form-label">M.I.</label>
          <input 
            type="text" 
            className="form-control" 
            id="midinit"
            value={editMiddleName}
            disabled={!editMode}
            onChange={(e) => setEditMiddleName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="last-name" className="form-label">Last Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="last-name"
            value={editLastName}
            disabled={!editMode}
            onChange={(e) => setEditLastName(e.target.value)}
          />
        </div>
        <div className="col-md-10">
          <label htmlFor="company" className="form-label">Company</label>
          <input 
            type="text" 
            className="form-control" 
            id="last-name"
            value={editCompany}
            disabled={!editMode}
            onChange={(e) => setEditCompany(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input 
            type="text" 
            className="form-control" 
            id="phone"
            value={editPhone}
            disabled={!editMode}
            onChange={(e) => setEditPhone(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input 
            type="text" 
            className="form-control" 
            id="email"
            value={editEmail}
            disabled={!editMode}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        </div>
        <div className="col-10">
          <label htmlFor="input-notes" className="form-label">Notes</label>
          <textarea 
            id="input-notes"
            className="form-control" 
            aria-label="With textarea"
            value={editNotes}
            disabled={!editMode}
            onChange={(e) => setEditNotes(e.target.value)}
          >
          </textarea>
        </div>
        <div className="col-12">
          {!editMode ? (
            <button 
            type="submit" 
            className="btn btn-primary"
            onClick={toggleEditMode}
            >Edit</button>
          ) : (
            <>
            <button 
              // type="submit" 
              className="btn btn-outline-secondary"
              onClick={toggleEditMode}
            >Discard</button>
            <button 
              // type="submit" 
              className="btn btn-warning mx-2"
              onClick={saveChanges}
            >Save</button>
            <button 
              // type="submit" 
              className="btn btn-danger mx-2"
              onClick={(e) => removeTitleCo(e, titleco?.id)}
            >Delete</button>
            </>
          )}
        </div>
      </form>
    </div>     
    </>
  )
}