import { useContext, useState } from "react"
import { api } from "../utilities";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userCompany, setUserCompany] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showLoginBox, setShowLoginBox] = useState(true)
  const [showRegisterBox, setShowRegisterBox] = useState(false)
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  
  const toggleRegisterBox = () => {
    setShowLoginBox(false);
    setShowRegisterBox(true);
  }

  const toggleLoginBox = () => {
    setShowLoginBox(true);
    setShowRegisterBox(false);
  }


  // this function sends the request to the server for a token for an existing user
  const logIn = async(e) => {
    e.preventDefault();
    let response = await api.post("users/login/", {
      "email": userName,
      "password": password,
    })
    .catch((err) => {
      alert("Incorrect Credentials")
    });
    console.log(response.data)
    let user = response.data.user;
    let token = response.data.token;
    setUser(user);
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    navigate("/home")
  }

  // this function sends the request to the server to create a User instance and return a token
  const registerUser = async(e) => {
    e.preventDefault();
    // before api call, validate that the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return
    }

    let response = await api.post("users/register/", {
      "first_name": userFirstName,
      "last_name": userLastName,
      "company": userCompany,
      "phone": userPhone,
      "email": userEmail,
      "password": password
    })
    .catch((err) => {
      alert("Unable to register this user.  Does the user already exist?")
    })
    let user = response.data.user;
    let token = response.data.token;
    setUser(user);
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    navigate("/home")
  }

  return (
    <>
      <div className="login_register_page">
        <h1>Real Estate Transaction Manager</h1>
        <div 
          id="login_box" 
          className="signin_signup"
          style={{ display: showLoginBox ? "" : "none" }}
        >
          <form onSubmit={(e) => logIn(e)}>
            <input className="entryfield" 
              type="email"
              placeholder="email"
              value={userName}
              onChange={(e)=> setUserName(e.target.value)} 
            />
            <input className="entryfield"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)} 
            />
            <input  className="login_register_button" type="submit" value="Log In" />
          </form>
          <h4>or</h4>
          <button className="create_acct_button" onClick={toggleRegisterBox}>
            Create New Account
          </button>
        </div>
        <div 
          id="register_box" 
          className="signin_signup" 
          style = {{ display: showRegisterBox ? "" : "none" }}
          >
          <h3>Sign up</h3>
          <form onSubmit={(e) => registerUser(e)}>
            <input className="entryfield" 
              placeholder="First Name"
              value={userFirstName}
              onChange={(e)=> setUserFirstName(e.target.value)} 
            />
            <input className="entryfield" 
              placeholder="Last Name"
              value={userLastName}
              onChange={(e)=> setUserLastName(e.target.value)} 
            />
            <input className="entryfield" 
              placeholder="Company - optional"
              value={userCompany}
              onChange={(e)=> setUserCompany(e.target.value)} 
            />
            <input className="entryfield" 
              placeholder="Phone - optional"
              value={userPhone}
              onChange={(e)=> setUserPhone(e.target.value)} 
            />
            <input className="entryfield" 
              placeholder="Email"
              value={userEmail}
              onChange={(e)=> setUserEmail(e.target.value)} 
            />
            <input className="entryfield"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)} 
            />
            <input className="entryfield" 
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input className="login_register_button" type="submit" value="Register" />
          </form>
            <h4>or</h4>
            <button className="create_acct_button" onClick={toggleLoginBox}>
              Login with existing account
          </button>
        </div>
      </div>
    </>
  )
}