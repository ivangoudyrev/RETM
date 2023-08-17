import "./App.css";
import { useState, useEffect, createContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { api } from "./utilities";

export const userContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(user)
  }, [user])

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

  useEffect(()=>{
    whoAmI()
  },[])

  // const logOut = async() => {
  //   let response = await api.post("users/logout/")
  //   console.log(response)
  //   if(response.status === 204) {
  //     localStorage.removeItem("token")
  //     setUser(null)
  //     delete api.defaults.headers.common["Authorization"]
  //     navigate("login")
  //   }
  // }
  
  return (
      <div>
        <h1>Transaction Manager</h1>
        <userContext.Provider value={{ user, setUser }}>
          <Outlet />
        </userContext.Provider>
      </div>
  )
}
