// import { Navigate } from "react-router-dom";
import { userContext } from "../App"
import { api } from "../utilities"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage(){
  const { whoAmI, setUser } = useContext(userContext);
  
  useEffect(()=>{
    whoAmI()
  },[])

  return(
    <>
      <h1>Dashboard</h1>
    </>
  )
}