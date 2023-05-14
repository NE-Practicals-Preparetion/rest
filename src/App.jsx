import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
