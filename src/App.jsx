import { useContext, useState } from 'react'
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
import { DataContext } from './context/DataProvider'
import WorkoutCard from './views/WorkoutCard'
import Search from './views/Search'
import FindWorkout from './views/FindWorkout'


function App() {
  const [count, setCount] = useState(0)
  const [workout, setWorkout] = useState({ "size": 0, "exercises": {} })
  const [finalWorkout, setFinalWorkout] = useState({});
  const [searchWorkouts, setSearchWorkouts] = useState(null);
  const [workoutSearchData, setWorkoutSearchData] = useState(null);
  const { user, setUser } = useContext(DataContext);
 
  // function requireAuth(nextState, replace, next) {
  //   console.log(user)
  //   if (!user) {
  //     replace({
  //       pathname: "/login",
  //       state: {nextPathname: nextState.location.pathname}
  //     });
  //   }
  //   console.log(user)
  //   next();
  // }


  return (
    <>
      <Navbar />
      <Routes>
        <Route children path='/' element={<Home />} />
        <Route children path='/register' element={<Register />} />
        <Route children path='/login' element={<Login />} />
        <Route children path='/workout' element={<Workout />} />
        <Route children path='/workout/search' element={<Search searchWorkouts={searchWorkouts} setSearchWorkouts={setSearchWorkouts} />} />
        <Route children path='/workout/search/workouts' element={<FindWorkout searchWorkouts={searchWorkouts} setSearchWorkouts={setSearchWorkouts} />} />
        <Route children path='/workout/build' element={<Build finalWorkout={finalWorkout} setFinalWorkout={setFinalWorkout} workout={workout} setWorkout={setWorkout} />} />
        <Route children path='/workout/build-final' element={<BuildFinal finalWorkout={finalWorkout} setFinalWorkout={setFinalWorkout} workout={workout} setWorkout={setWorkout} />} />
        <Route children path='/workout/ready' element={<ReadyMade />} />
        <Route children path='/workout-card' element={<WorkoutCard />} />
      </Routes>
      
    </>
  )
}

export default App
