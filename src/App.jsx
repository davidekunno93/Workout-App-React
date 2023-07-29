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
import BuildFinal from './views/BuildFinal'


function App() {
  const [count, setCount] = useState(0)
  const [workout, setWorkout] = useState({ "size": 0, "exercises": {} })
  const [finalWorkout, setFinalWorkout] = useState({});

  return (
    <>
      <Navbar />
      <Routes>
        <Route children path='/' element={<Home />} />
        <Route children path='/register' element={<Register />} />
        <Route children path='/login' element={<Login />} />
        <Route children path='/workout' element={<Workout />} />
        <Route children path='/workout/build' element={<Build finalWorkout={finalWorkout} setFinalWorkout={setFinalWorkout} workout={workout} setWorkout={setWorkout} />} />
        <Route children path='/workout/build-final' element={<BuildFinal finalWorkout={finalWorkout} setFinalWorkout={setFinalWorkout} workout={workout} setWorkout={setWorkout} />} />
        <Route children path='/workout/ready' element={<ReadyMade />} />
      </Routes>
      
    </>
  )
}

export default App
