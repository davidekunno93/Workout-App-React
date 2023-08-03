import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import BuildFinal from "./BuildFinal";
import { DataContext } from "../context/DataProvider";

const Build = (props) => {
    const { user, setUser } = useContext(DataContext);
    // const [workout, setWorkout] = useState({ "size": 0, "exercises": {} })
    // useEffect(() => console.log("Change"), [workout])
    const workout = props.workout
    const setWorkout = props.setWorkout

    const getData = async () => {
        const response = await axios.get("http://localhost:5000/api/exercise-database")
        return response.status === 200 ? response.data : null
    }
    const loadData = async () => {
        let data = await getData()
        setExercises(data)
    }

    const searchData = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formJson = Object.fromEntries(formData.entries())
        console.log(formJson)
        const resp = await fetch("http://localhost:5000/api/exercise-search", {
            "method": "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formJson)
        })
            .then(resp => resp.json())
            // .then(data => console.log(data.data))
            .then(data => setExercises(data))
            .catch(error => console.log(error))
    }
    const [exercises, setExercises] = useState(() => loadData())

    const addToWorkout = (exercise) => {
        if (workout.size === 12) {
            alert("You've reached the maximuum number of exercises in your workout (12)")
        } else {
        let workoutCopy = { ...workout };    
        workoutCopy.size++;
        workoutCopy.exercises[exercise.id] ?
            workoutCopy.exercises[exercise.id].quantity++
            :
            workoutCopy.exercises[exercise.id] = { "data": exercise, "quantity": 1 };
        console.log(workoutCopy);
        setWorkout(workoutCopy);
        toOrderedDict();
    }
    }

    const removeFromWorkout = (exercise) => {
        let workoutCopy = { ...workout };    
        workoutCopy.size--;
        workoutCopy.exercises[exercise.id].quantity === 1 ?
        delete workoutCopy.exercises[exercise.id] 
        :
        workoutCopy.exercises[exercise.id].quantity--;
        console.log(workoutCopy);
        setWorkout(workoutCopy);
        toOrderedDict();
    }

    const flipCard = (i) => {
        const instruction = document.getElementById(i)
        instruction.classList.toggle('d-none')
        console.log(instruction)
        const dets = document.getElementById(`${i}-dets`)
        if (dets){
            dets.classList.toggle('o-none')
        console.log(dets)
        }
        
    }

    const isInWorkout = (ex_id) => {
        console.log(workout.exercises)
        if (Object.keys(workout.exercises).includes(ex_id)){
            console.log("it's here!")
            return true
        } else {
            console.log("not here")
            return false
        }
    }

    // const [v, setV] = useState(null)
    // useEffect(()=> {console.log(`${v} <--- CHANGE`), [v]})

    const toOrderedDict = () => {
        let workoutCopy = {...workout}
        // d is a dict of the finalworkout
        let d = {}
        // l is a list of the finalworkout
        let l = []
        console.log(Object.values(workoutCopy.exercises))
        // loop thru workout exs, add ex to dict as many times as q
        let k = 1
        let exes = Object.values(workoutCopy.exercises)
        const sets = {"sets": 4}
        const reps = {"reps": 10}
        const intensity = {"intensity": "light"}
        const intensity_na = {"intensity": "na"}
        const circuits = {"circuits": 1}
        const wo_name = {"name": ""}
        const wo_desc = {"desc": ""}
        // const totalReps = {"totalReps": null}
        // const intensityOverall = {"intensity" : null}
        const info = {"info" : {...circuits, ...wo_name, ...wo_desc}}
        for (let ex of exes){
            for (let q = 0; q < ex.quantity; q++){
                let exercise = {}
                if (ex.data.equipment === "body_only"){
                    exercise = {...ex.data, ...sets, ...reps, ...intensity_na}
                } else {
                    exercise = {...ex.data, ...sets, ...reps, ...intensity}
                }
                // dict needs to be updated with copies of sets/reps or the sets/reps value for all duplicate exercises will change at the same time
                // ex.data["sets"] = 4
                // ex.data["reps"] = 10
                d[k] = exercise
                l.push(exercise)
                k++
            }
          }
        console.log(l)
        l.push({...info})
        props.setFinalWorkout(l)
        console.log(props.finalWorkout)
    }

    
    const check = () => {
        console.log(props.finalWorkout)
    }

    

    return (
        <>
        <section className="build-bg">
            <h1 onClick={() => check()} className="center-text">Let's build your Workout...</h1>
            <div className="flx-r flx-wrap">
                {workout.exercises && workout.size > 0 ? Object.values(workout.exercises).map((ex, i) => {
                    return <div key={i} className="wo-card mx-2 my-2">
                        <div className="close-btn"></div>
                        <img onClick={() => removeFromWorkout(ex.data)} className="close-cross" src="/images/white-cross-curved.png" />
                        <div id={`${i}top`} className="wo-instructions d-none"><p className="pad8 x-small white-text center-text"><span className="medium bold white-text">Instructions:</span> <br /> {ex.data.instructions}</p></div>

                        <div className="one flx1 wide100 front"><p className="m0 white-text center-text"><strong>{ex.data.name} *{ex.quantity}</strong></p></div>
                        <div className="two flx5 pt-2 front">
                            {ex.data.equipment === "e_z_curl_bar" || ex.data.equipment === "dumbbell" || ex.data.equipment === "barbell" || ex.equipment === "cable" ?
                                <img className="equip-icon" src={`/images/curved-weight-logo.png`} /> : <div className="card-empty"></div>}
                            <img className="wo-muscle-group-icon" src={`/images/${ex.data.muscle}-logo.png`} />
                            <img className="diff-icon" src={`/images/${ex.data.difficulty}-logo.png`} />
                        </div>

                        
                        <div className="wo-four flx1 wide100"><p className="m0 center-text"><Link className="black-text" onClick={() => { flipCard(`${i}top`) }}>Instructions</Link></p></div>
                    </div>
                })
                    : null
                }

                {workout.size < 12 ? 
                <div title="Add up to 12 exercises from the search results below!" className="ex-box mx-2 my-2 center-text">
                    <span className="v-helper"></span>
                    <p className="m0 xxx-large v-helped white-text">+</p>
                </div> : null
                }
            </div>
            {workout.size > 1 ? <Link to="/workout/build-final"><button className="green-btn center my-3">Complete?</button></Link> : <button title="Add 2 or more exercises to create a workout" className="disabled center my-3">Complete?</button> }
                

            <form method="POST" onSubmit={searchData}>
                <div className="search-bar flx-r just-se large">

                    <div className="pad2">
                        <label htmlFor="muscle" className="white-text">Muscle Group:&nbsp;</label>
                        <select id="muscles-dropdown" name="muscle">
                            <option value=""></option>
                            <option value="abdominals">Abdominals</option>
                            <option value="abductors">Abductors</option>
                            <option value="adductors">Adductors</option>
                            <option value="biceps">Biceps</option>
                            <option value="calves">Calves</option>
                            <option value="chest">Chest</option>
                            <option value="glutes">Glutes</option>
                            <option value="hamstrings">Hamstrings</option>
                            <option value="lats">Lats</option>
                            <option value="lower_back">Lower Back</option>
                            <option value="middle_back">Middle Back</option>
                            <option value="quadriceps">Quadriceps</option>
                            <option value="shoulders">Shoulders</option>
                            <option value="traps">Traps</option>
                            <option value="triceps">Triceps</option>
                        </select>
                    </div>
                    <div className="pad2">
                        <label className="white-text" htmlFor="difficulty">Difficulty:&nbsp;</label>
                        <select id="difficulty" name="difficulty">
                            <option value=""></option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    <div className="pad2">
                        <input name="no-weights" id="no-weights" value="body_only" type="checkbox" />
                        <label className="white-text" htmlFor="no-weights">No weights?</label>
                    </div>
                    <button className="sub-btn small">Search</button>
                </div>
            </form>


            <div className="exercises flx-r just-se flx-wrap">
                {exercises.data && exercises.data.length > 0 ? exercises.data.map((ex, i) => {
                    return <div key={i} className="ex-card mx-2 my-2">
                        {workout.exercises[ex.id] ? <div className="selection-full"></div> : <div className="selection-empty"></div>}
                        {workout.exercises[ex.id] ? <div className="selection-count">{workout.exercises[ex.id].quantity}</div> : null }
                        
                        <div id={i} className="instructions d-none"><p className="pad8 x-small white-text center-text"><span className="medium bold white-text">Instructions:</span> <br /> {ex.instructions}</p></div>
                        <div onClick={() => addToWorkout(ex)} className="wide100 center-text">
                            <div className="one flx1 wide100 front"><p className="m0 white-text center-text"><strong>{ex.name}</strong></p></div>
                            <div className="two flx5 pad8 front">
                                {ex.equipment === "dumbbell" || ex.equipment === "barbell" || ex.equipment === "e-z_curl_bar" || ex.equipment === "cable" ?
                                    <img className="equip-icon" src={`/images/curved-weight-logo.png`} /> : <div className="card-empty"></div>}
                                <img className="muscle-group-icon" src={`/images/${ex.muscle}-logo.png`} />
                                <img className="diff-icon" src={`/images/${ex.difficulty}-logo.png`} />
                            </div>
                        </div>
                        <div id={`${i}-dets`} className="three flx2 grid-2c border-top-b">
                            <p className="m0 mx-3"><span className="card-att">Muscle:</span> {ex.muscle.charAt(0).toUpperCase() + ex.muscle.slice(1)}</p>
                            <p className="m0 mx-3"><span className="card-att">Equip:</span> {ex.equipment.charAt(0).toUpperCase() + ex.equipment.slice(1)}</p>
                            <p className="m0 mx-3"><span className="card-att">Type:</span> {ex.ex_type === "olympic_weightlifting" ? <p className="m0 inline">Olympic lifting</p> : ex.ex_type.charAt(0).toUpperCase() + ex.ex_type.slice(1)}</p>
                            <p className="m0 mx-3"><span className="card-att">Diff:</span> {ex.difficulty.charAt(0).toUpperCase() + ex.difficulty.slice(1)}</p>
                        </div>
                        <div className="four flx1 wide100"><p className="m0 center-text"><Link className="black-text" onClick={() => { flipCard(i) }}>Instructions</Link></p></div>


                    </div>
                }) : <h3><FontAwesomeIcon icon={faSpinner} spin />&nbsp;&nbsp;Loading</h3>}
            </div>
        </section>
        </>
    )
}
export default Build;