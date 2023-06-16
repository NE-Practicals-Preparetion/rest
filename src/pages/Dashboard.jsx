import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  useEffect(()=>{
    //redirect to login form when no token found
    if(!token){
      navigate('/login');
    }
  },[token])
  return (
    <div>
      <Navbar/>
        <div className='mt-12'>
          {/* <h1 className='mb-12'>Welcome, <span className='font-bold'>Nick</span></h1> */}
            <Table/>
        </div>
    </div>
  )
}

export default Dashboard