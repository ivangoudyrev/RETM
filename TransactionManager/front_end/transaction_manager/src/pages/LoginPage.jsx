import { useContext, useState } from "react"
import { api } from "../utilities";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const logIn = async(e) => {
    e.preventDefault();
    let response = await api.post("users/login/", {
      "email": userName,
      "password": password,
    })
    .catch((err) => {
      alert("Incorrect Credentials")
    });
    let user = response.data.user;
    let token = response.data.token;
    setUser(user);
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    navigate("home")
  }

  return (
    <>
      <div>
        <h1>Please Login</h1>
        <form onSubmit={(e) => logIn(e)}>
          <h5>Log In</h5>
          <input 
            type="email"
            value={userName}
            onChange={(e)=> setUserName(e.target.value)} 
          />
          <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)} 
          />
          <input type="submit" />
        </form>
        <h4>Or Click Here to Register</h4>
      </div>
    </>
  )
}