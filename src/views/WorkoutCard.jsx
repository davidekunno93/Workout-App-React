import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import axios from "axios";

const WorkoutCard = () => {
    const { thisWorkout, setThisWorkout } = useContext(DataContext)
    const { user, setUser } = useContext(DataContext);
    // const location = useLocation()
    // const { data } = location.state

    // console.log(data)
    // setThisWorkout(data)

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    const getData = async () => {
        const response = await axios.get("http://localhost:5000/api/pexercise-database")
        return response.status === 200 ? response.data : null
    }
    const loadData = async () => {
        let data = await getData()
        // .then(data => console.log(data))
        setPexercises(data.data)
    }

    const getWorkouts = async () => {
        const url = "http://localhost:5000/api/workout-database"
        const response = await axios.get(url);
        // return response.data
        return response.status === 200 ? response.data : null
    }
    
    const loadWorkouts = async () => {
        let data = await getWorkouts()
        .then(data => handleWorkoutData(data))
        // .then(data => console.log(data.data))
        // .then(data => setWorkouts(data.data))
    }
    
    const handleWorkoutData = (data) => {
        setWorkouts(data.data);
        console.log(data.data)
    }
    
    const [workouts, setWorkouts] = useState(() => loadWorkouts())

    const flipCard = (i) => {
        const instruction = document.getElementById(i)
        instruction.classList.toggle('d-none')
        console.log("instruction") 
    }

    const [pexercises, setPexercises] = useState(() => loadData())

    let index = 0

    const showDisplay = (header) => {
        if (header === "pexercises") {
            const element = document.getElementById('pexercises')
            element.classList.remove('d-none')
            const element2 = document.getElementById('description')
            element2.classList.add('d-none')
        } else if (header === "description") {
            const element = document.getElementById('description')
            element.classList.remove('d-none')
            const element2 = document.getElementById('pexercises')
            element2.classList.add('d-none')
        }
    }
    
    const addToFavorites = async (workout_id) => {
        event.preventDefault()
        if (!user) {
            alert("You must be logged in to add a workout to your Favorites")
        } else {
            let data = {"workout_id": workout_id, "user_id": user.id}
            console.log(data)
            const resp = await axios.post("http://localhost:5000/add-to-favorites", JSON.stringify(data), {
                headers : {"Content-Type": "application/json"}
            })
            .then(resp => handleFavorites(resp))
            // .then(resp => console.log(resp))
        }
    }

    const removeFromFavorites = async (workout_id) => {
        event.preventDefault()
        let data = {"workout_id": workout_id, "user_id": user.id}
        console.log(data)
        const resp = await axios.post("http://localhost:5000/remove-from-favorites", JSON.stringify(data), {
            headers : {"Content-Type": "application/json"}
        })
        .then(resp => handleFavorites(resp))
        // .then(resp => console.log(resp))
    }

    const handleFavorites = (resp) => {
        event.preventDefault()
        console.log(resp)
        setThisWorkout(resp.data.data2)
        reloadUser()
    }

    // console.log(user)

    const reloadUser = async () => {
        if (user) {
            let data = {"user_id": user.id}
            const resp = axios.post("http://localhost:5000/reload-user", JSON.stringify(data), {
            headers : {"Content-Type": "application/json"}
        })
        .then(resp => setUser(resp.data))
        console.log("User reloaded")
        }
    }

    return (
        <>
        {thisWorkout ? <>
            <h1 className="center-text">{thisWorkout.wo_name}</h1>
            <div className="workout-card-div flx-c">
                <div className="wc-top flx1 flx-r just-sb pad8 n-white-text">
                    <div className="wct-left">
                        <p className="wctl-name m0"><strong>{thisWorkout.wo_name}</strong></p>
                        <p className="wctl-createdby m0 small">Created by: <span className="link-text">{thisWorkout.createdby_un}</span> </p>
                    </div>
                    <div className="wct-right mt-1h">
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        ({thisWorkout.numOfRatings})
                    </div>
                </div>
                <div className="wc-mid flx7 flx-r just-se n-text">
                    <div className="wcm-back flx-r flx-wrap just-se">
                        <div className="wcmb-empty"></div>
                        {thisWorkout.ex_names_dash ? thisWorkout.ex_names_dash.split("*").map((en, i) => {
                            return <div key={i} className="wcmb-ex">{en}</div>
                        }) : null}
                    </div>
                    <div className="wcm-muscles">
                        <div className="muscs flx-r just-se mt-3">
                            {thisWorkout.main_muscles.includes("Abdominals") ? <img className="wo-muscle-icon" src="/images/abdominals-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Abductors") ? <img className="wo-muscle-icon" src="/images/abductors-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Adductors") ? <img className="wo-muscle-icon" src="/images/adductors-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Biceps") ? <img className="wo-muscle-icon" src="/images/biceps-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Calves") ? <img className="wo-muscle-icon" src="/images/calves-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Chest") ? <img className="wo-muscle-icon" src="/images/chest-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Forearms") ? <img className="wo-muscle-icon" src="/images/forearms-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Glutes") ? <img className="wo-muscle-icon" src="/images/glutes-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Hamstrings") ? <img className="wo-muscle-icon" src="/images/hamstrings-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Lats") ? <img className="wo-muscle-icon" src="/images/lats-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Lower_back") ? <img className="wo-muscle-icon" src="/images/lower_back-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Middle_back") ? <img className="wo-muscle-icon" src="/images/middle_back-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Neck") ? <img className="wo-muscle-icon" src="/images/neck-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Quadriceps") ? <img className="wo-muscle-icon" src="/images/quadriceps-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Shoulders") ? <img className="wo-muscle-icon" src="/images/shoulders-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Traps") ? <img className="wo-muscle-icon" src="/images/traps-logo.png" /> : null}
                            {thisWorkout.main_muscles.includes("Triceps") ? <img className="wo-muscle-icon" src="/images/triceps-logo.png" /> : null}
                        </div>
                    </div>

                </div>

                        

                <div className="wc-bot flx5 flx-r just-se rel">
                    {thisWorkout.intRating === "bodyOnly" ? <img className="w-included faded" src={`/images/bodyOnly.png`} /> : <img className="w-included" src={`/images/${thisWorkout.intRating}-weights-included.png`} />}
                    <div className="wcb-back eight flx-c">
                        <div className="wcbb-desc flx3">
                            <p className="m0 ml-2"><strong>Focus on:</strong> {thisWorkout.main_muscles}</p>
                            <p className="m0 ml-2"><strong>Description: </strong></p>
                            <p className="m0 ml-2 small">{thisWorkout.wo_desc}</p>
                        </div>
                        <div className="flx2 flx-r just-r px-2">
                            <div className="icon-box high100 flx-r just-sb">
                                <div className="icon white-text"><img className="wc-icon" src="/images/check-icon.png" /> 0</div>
                                <div className="icon white-text"> {user ? (user.favorited.indexOf(thisWorkout.id) > -1 ? <img className="wc-icon" src="/images/bookmark-icon-full-green.png" onClick={() => removeFromFavorites(thisWorkout.id)} /> : <img className="wc-icon" src="/images/bookmark-icon.png" onClick={() => addToFavorites(thisWorkout.id)} />) : <img className="wc-icon" src="/images/bookmark-icon.png" onClick={() => addToFavorites(thisWorkout.id)} />} {thisWorkout.numOfFavs}</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/review-icon.png" /> {thisWorkout.numOfRatings}</div>
                            </div>
                        </div>
                    </div>
                    <div className="int"></div>
                    <div className="int"><p className="m0 mt-2"><strong>INTENSITY SCORE</strong></p><span className="xxx-larges">{thisWorkout.intScore}</span><span className="gray-text">/100</span></div>
                    <div className="end"><p className="m0 mt-2"><strong>ENDURANCE RATING</strong></p><p className="xxx-larges m0">{thisWorkout.endScore}<span className="medium gray-text">/5</span></p></div>
                    <div className="circ"><p className="m0 mt-2"><strong>CIRCUITS</strong></p><p className="xxx-larges m0">{thisWorkout.circuits === 1 ? <span className="silent">n/a</span> : <span className="green-text">{thisWorkout.circuits}</span>}</p></div>
                </div>
            </div>


            <div className="wc-foot mt-4 bg-black">
                <div className="wc-info flx-r just-se">
                    <button className="nav-btn info-exes large" onClick={() => showDisplay("pexercises")}><strong>EXERCISES</strong></button>
                    <button className="nav-btn info-desc" onClick={() => showDisplay("description")}><strong>DESCRIPTION</strong></button>
                    <button className="nav-btn info-reviews"><strong>REVIEWS</strong></button>
                    <button className="nav-btn info-completes"><strong>USERS COMPLETED</strong></button>
                </div>
                <div className="wcf-display white-text rel">
                    <div id="pexercises" className="pexercises seven wide100 high10 abs flx-r flx-wrap just-se d-none">
            
                    {Array.isArray(pexercises) ? pexercises.map((ex, i) => {
                        if (thisWorkout.pexercise_ids.includes(ex.id)) {
                            index++
                    return <div key={i} className="wo-card2 mx-2 my-2">
                        <div id={i} className="wo-instructions d-none"><p className="pad8 x-small white-text center-text"><span className="medium bold white-text">Instructions:</span> <br /> {ex.ex_instructions}</p></div>
                        <div className="one flx1 wide100 front"><p className="m0 white-text center-text"><strong>{ex.ex_name}</strong></p></div>
                        <div className="two flx5 pt-2 front">
                            <p className="index-counter m0 abs">#{index} </p>
                            {ex.ex_equipment === "e_z_curl_bar" || ex.ex_equipment === "dumbbell" || ex.ex_equipment === "barbell" || ex.equipment === "cable" ?
                                <img className="equip-icon" src={`/images/curved-weight-logo.png`} /> : <div className="card-empty"></div>}
                            <img className="wo-muscle-group-icon" src={`/images/${ex.ex_muscle}-logo.png`} />
                            <div className="setreps inline ml-5 black-text x-large">
                                <p className="sets-text"><strong>SETS: {ex.sets}</strong> </p>
                                <p className="reps-text"><strong>REPS: {ex.reps}</strong> </p>
                            </div>
                        </div>

                        
                        <div className="wo-four flx1 wide100"><div className="instructions-btn black-text center-text" onClick={() => flipCard(i)}>Instructions</div></div>
                    </div>
                    }
                })
                    : null
                }

                    </div>
                    <div id="description" className="description d-none high100 wide100 abs">
                        <p className="mx-4 center-text"><strong>Description:</strong> <br />{thisWorkout.wo_desc ? thisWorkout.wo_desc : "No workout description"}</p>
                    </div>
                    
                </div>
            </div> </> : null }
            <br />
            <button type="button" onClick={() => goBack()} className="gray-btn center">Go Back</button>
            <br /><div className="card-empty pad28"></div>

        </>
    )
}
export default WorkoutCard;