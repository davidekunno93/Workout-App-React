import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './views/Register'
import Login from './views/Login'
import Navbar from './components/Navbar'
import Workout from './views/Workout'
import Build from './views/Build'
import ReadyMade from './views/ReadyMade'
import Home from './views/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route children path='/' element={<Home />} />
        <Route children path='/register' element={<Register />} />
        <Route children path='/login' element={<Login />} />
        <Route children path='/workout' element={<Workout />} />
        <Route children path='/workout/build' element={<Build />} />
        <Route children path='/workout/ready' element={<ReadyMade />} />
      </Routes>
      
    </>
  )
}

export default App
