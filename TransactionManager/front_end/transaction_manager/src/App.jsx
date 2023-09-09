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
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)

  const navigate = useNavigate();


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

    try {
      const response = await api.get('users/');
      console.log('Response:', response)

      if (response.data) {
        setUser(response.data);
        navigate('home');
      } else {
        setUser(null);
        navigate('login')
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      navigate('login');
    }
  }
  
  const logOut = async() => {
    let response = await api.post("users/logout/")
    if(response.status === 204) {
      setUser(null)
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

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
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
                  <img src={RETMLogo} alt="Logo" style={{ height: '50px' }} />
                </Link>
                <button className="navbar-toggler" type="button" onClick={handleNavCollapse} aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/home" className="nav-link active" onClick={handleNavCollapse}>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/transactions" className="nav-link disabled" onClick={handleNavCollapse}>Transactions</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contacts/clients" className="nav-link active" onClick={handleNavCollapse}>Contacts</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/properties" className="nav-link active" onClick={handleNavCollapse}>Properties</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/tasks/master" className="nav-link active" onClick={handleNavCollapse}>Tasks</Link>
                    </li>
                  </ul>
                  <div className="ms-auto d-flex align-items-center">
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
