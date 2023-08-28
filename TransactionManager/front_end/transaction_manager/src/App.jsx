// import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { api } from "./utilities";
import RETMLogo from "./assets/images/4.png";

export const userContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [properties, setProperties] = useState([])
  const [clients, setClients] = useState([])

  const navigate = useNavigate();
  // const RETMLogo = RETMLogo();

  useEffect(()=>{
    whoAmI();
  },[])

  useEffect(() => {
    if (user){
      getTasks();
      getTransactions();
      getProperties();
      getClients();
    }
  },[user])
  
  const whoAmI = async() => {
    let token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setUser(response.data)
      navigate("home")
    } else {
      setUser(null)
      navigate("login")
    }
  }
  
  const logOut = async() => {
    let response = await api.post("users/logout/")
    // console.log(response)
    if(response.status === 204) {
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"]
      navigate("/login")
    }
  }
  
  const getTasks = async() => {
    let response = await api.get("tasks/");
    setTasks(response.data);
  }

  const getTransactions = async() => {
    let response = await api.get("transactions/");
    setTransactions(response.data);
  }

  const getProperties = async() => {
    let response = await api.get("properties/");
    setProperties(response.data);
  }

  const getClients = async() => {
    let response = await api.get("contacts/clients/");
    setClients(response.data);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
  }

  return (
    <div>
      <header>
        { user ?
          <>
          <div className="container">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link to="/home" className="navbar-brand">
                <img src={RETMLogo} alt="Logo" style={{height:'50px'}} />
              </Link>
              {/* <span className="navbar-brand" href="#">RETM</span> */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/home " className="nav-link active" aria-current="page" href="#">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/transactions" className="nav-link disabled" aria-disabled="true" aria-current="page" href="#">Transactions</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contacts/clients" className="nav-link active" aria-current="page" href="#">Contacts</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/properties" className="nav-link active" aria-current="page" href="#">Properties</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/tasks" className="nav-link disabled" aria-disabled="true" aria-current="page" href="#">Tasks</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/tasks" className="nav-link disabled" aria-disabled="true" aria-current="page" href="#">Tasks</Link>
                  </li>
                </ul>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-secondary" type="button" onClick={logOut}>Log Out</button>
                </div>
              </div>
            </div>
          </nav>
          </div>
          </>
          :
          <></>
        }
      </header>
      <div id="page_container">
        <userContext.Provider value={{ 
          whoAmI, 
          user, 
          setUser, 
          tasks, 
          setTasks, 
          transactions, 
          setTransactions, 
          properties, 
          setProperties,
          clients,
          setClients,
          getTransactions,
          getProperties,
          getClients,
          getTasks,
          formatDate
          }}>
          <Outlet />
        </userContext.Provider>
      </div>
    </div>
  )
}
