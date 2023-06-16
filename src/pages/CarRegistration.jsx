import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import CarPost from '../components/CarPost'
import { useNavigate } from 'react-router-dom';

function CarRegistration() {
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
            <CarPost/>
        </div>
    </div>
  )
}

export default CarRegistration