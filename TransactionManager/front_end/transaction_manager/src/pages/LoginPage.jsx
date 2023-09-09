import { useContext, useState } from "react"
import { api } from "../utilities";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom"
import RETMLogo from "../assets/images/4.png";



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
  const [registerMode, setRegisterMode] = useState(false);
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
    // console.log(response.data)
    let user = response.data.user;
    //let token = response.data.token;
    setUser(user);
    //localStorage.setItem("token", token)
    //api.defaults.headers.common["Authorization"] = `Token ${token}`
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

  const toggleRegisterMode = () => {
    setRegisterMode(!registerMode);
  }

  return (
    <>
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '90vh'}}>
      <div className="card p-3" style={{width: 300}}>
        <img src={RETMLogo} className="card-img-top" alt="..."/>
        {!registerMode ? (
        <div className="card-body">
          <p className="h6 d-flex justify-content-center text-secondary">Welcome! Please Sign-in:</p>
          <div className="form-floating mb-3">
            <input 
              type="email" 
              className="form-control" 
              id="floatingInput" 
              placeholder="name@example.com"
              value={userName}
              onChange={(e)=> setUserName(e.target.value)} 
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input 
              type="password" 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)} 
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto mt-4">
            <button className="btn btn-primary" type="button" onClick={logIn}>Sign-In</button>
          </div>
          <div className="h6 mt-4 pt-2 d-flex justify-content-center text-secondary border-top">
            or
          </div>
          <div className="d-grid gap-2 col-6 mx-auto mt-4">
            <button className="btn btn-outline-primary" type="button" onClick={toggleRegisterMode}>Register</button>
          </div>  
        </div>
        ) : (
        <div className="card-body">
          <p className="h6 d-flex justify-content-center text-secondary">Welcome! Please Register:</p>
          <div className="form-floating mb-1">
            <input 
              // type="e" 
              className="form-control" 
              // id="floatingInput" 
              placeholder="First Name"
              value={userFirstName}
              onChange={(e)=> setUserFirstName(e.target.value)} 
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div className="form-floating mb-1">
            <input 
              // type="email" 
              className="form-control" 
              // id="floatingInput" 
              placeholder="Last Name"
              value={userLastName}
              onChange={(e)=> setUserLastName(e.target.value)} 
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div className="form-floating mb-1">
            <input 
              // type="email" 
              className="form-control" 
              // id="floatingInput" 
              placeholder="Company - optional"
              value={userCompany}
              onChange={(e)=> setUserCompany(e.target.value)} 
            />
            <label htmlFor="floatingInput">Company - optional</label>
          </div>
          <div className="form-floating mb-1">
            <input 
              // type="email" 
              className="form-control" 
              // id="floatingInput" 
              placeholder="Phone - optional"
              value={userPhone}
              onChange={(e)=> setUserPhone(e.target.value)} 
            />
            <label htmlFor="floatingInput">Phone - optional</label>
          </div>
          <div className="form-floating mb-1">
            <input 
              // type="email" 
              className="form-control" 
              // id="floatingInput" 
              placeholder="Email"
              value={userEmail}
              onChange={(e)=> setUserEmail(e.target.value)} 
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-1">
            <input 
              type="password" 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)} 
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input 
              type="password" 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto mt-4">
            <button className="btn btn-primary" type="button" onClick={registerUser}>Register</button>
          </div>
          <div className="h6 mt-4 pt-2 d-flex justify-content-center text-secondary border-top">
            already have an account?
          </div>
          <div className="d-grid gap-2 col-6 mx-auto mt-4">
            <button className="btn btn-outline-primary" type="button" onClick={toggleRegisterMode}>Sign-In</button>
          </div>  
        </div>
        )}
      </div>
    </div>
    </>
  )
}
