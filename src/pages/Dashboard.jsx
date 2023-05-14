import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

function Dashboard() {

  return (
    <div>
      <Navbar/>
        <div>
          <h1 className='mb-12'>Welcome, <span className='font-bold'>Nick</span></h1>
            <Table/>
        </div>
    </div>
  )
}

export default Dashboard