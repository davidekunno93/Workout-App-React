import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const Home = () => {
    const { user, setUser } = useContext(DataContext);
    const { thisWorkout, setThisWorkout } = useContext(DataContext);

    const navigate = useNavigate()

    const goToThisWorkout = (workout) => {
        setThisWorkout(workout);
        navigate('/workout-card')
    }

    const getData = async () => {
        const response = await axios.get("http://localhost:5000/api/exercise-database")
        return response.status === 200 ? response.data : null
    }
    const loadData = async () => {
        let data = await getData()
        // .then(data => console.log(data))
        setExercises(data.data)
    }

    const [exercises, setExercises] = useState(() => loadData())

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
    
    // const getUserById = async (id) => {
        //     if (users && users[0]) {
            //        console.log(users)
            //     }
            // .then(data => console.log(data.data[id-1].username))
            // .then((data) => handleUser(data))
            // }

    const getUsers = async () => {
        const resp = await axios.get("http://localhost:5000/api/users-database")
        return resp.data
    }
    
    const loadUsers = async () => {
        const resp = getUsers()
        .then(data => setUsers(data.data))
    }

    const [users, setUsers] = useState(() => loadUsers())
            
    // const handleUsers = (data) => {
    //     // let d = {}
    //     // for (let i = 0; i < data.length; i++) {
    //     //     d[i+1] = data[i]
    //     // }
    //     console.log(data)
    //     setUsers(data)
    //     // console.log(data)
    //     return data
    // }

    // const returnId = async (id) => {
    //     let resp = await loadUsers()
    //     .then(resp => console.log(resp))    
    // }

    // const toList = (string) => {
    //     string.
    // }
   

    const addToFavorites = async (workout_id) => {
        if (!user) {
            alert("You must be logged in to add a workout to your Favorites")
        } else {
            let data = {"workout_id": workout_id, "user_id": user.id}
            console.log(data)
            const resp = await axios.post("http://localhost:5000/add-to-favorites", JSON.stringify(data), {
                headers : {"Content-Type": "application/json"}
            })
            .then(resp => handleFavorites(resp))
        }
    }

    const removeFromFavorites = async (workout_id) => {
        let data = {"workout_id": workout_id, "user_id": user.id}
            console.log(data)
            const resp = await axios.post("http://localhost:5000/remove-from-favorites", JSON.stringify(data), {
                headers : {"Content-Type": "application/json"}
            })
            .then(resp => handleFavorites(resp))
    }

    const handleFavorites = (resp) => {
        console.log(resp.data)
        setWorkouts(resp.data.data)
        reloadUser()
    }

    const reloadUser = async () => {
        if (user) {
            let data = {"user_id": user.id}
            const resp = axios.post("http://localhost:5000/reload-user", JSON.stringify(data), {
            headers : {"Content-Type": "application/json"}
        })
        .then(resp => setUser(resp.data))
        }
    }

    return (
        <>
        <div className="bg-black pad28 mb-5">
        <img className="welcome" src="/images/fithub-welcome.png" />
        </div>
        {/* to="/workout-card" state={{data: w}} */}
<div className="feed-container flx-c py-3">
        {workouts && Object.keys(workouts).length > 0 ? workouts.map((w, i) => {
            return <div key={i} className="workout-card-div flx-c">
                <div onClick={() => goToThisWorkout(w)} className="wc-top flx1 flx-r just-sb pad8 n-white-text">
                    <div className="wct-left">
                        <p className="wctl-name m0"><strong>{w.wo_name.charAt(0).toUpperCase()+w.wo_name.slice(1)}</strong></p>
                        <div className="wctl-createdby m0 small">Created by: {!Array.isArray(users) ? <Link>w.createdby_id</Link> : users.map((u, i) => {
                            if (u.id === w.createdby_id){ return <div className="inline link-text" key={i}>{u.username}</div>}
                        })} </div>
                    </div>
                    
                    <div className="wct-right mt-1h">
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        ({w.numOfRatings})
                    </div>
                </div>
                <div onClick={() => goToThisWorkout(w)} className="wc-mid flx7 flx-r just-se n-text">
                    <div className="wcm-back flx-r flx-wrap just-se">
                        <div className="wcmb-empty"></div>
                        {w.ex_names_dash ? w.ex_names_dash.split("*").map((en, i) => {
                            return <div key={i} className="wcmb-ex">{en}</div>
                        }) : null }
                        
                    </div>
                    <div className="wcm-muscles">
                        <div className="muscs flx-r just-se mt-3">
                            {w.main_muscles.includes("Abdominals") ? <img className="wo-muscle-icon" src="/images/abdominals-logo.png" /> : null}
                            {w.main_muscles.includes("Abductors") ? <img className="wo-muscle-icon" src="/images/abductors-logo.png" /> : null}
                            {w.main_muscles.includes("Adductors") ? <img className="wo-muscle-icon" src="/images/adductors-logo.png" /> : null}
                            {w.main_muscles.includes("Biceps") ? <img className="wo-muscle-icon" src="/images/biceps-logo.png" /> : null}
                            {w.main_muscles.includes("Calves") ? <img className="wo-muscle-icon" src="/images/calves-logo.png" /> : null}
                            {w.main_muscles.includes("Chest") ? <img className="wo-muscle-icon" src="/images/chest-logo.png" /> : null}
                            {w.main_muscles.includes("Forearms") ? <img className="wo-muscle-icon" src="/images/forearms-logo.png" /> : null}
                            {w.main_muscles.includes("Glutes") ? <img className="wo-muscle-icon" src="/images/glutes-logo.png" /> : null}
                            {w.main_muscles.includes("Hamstrings") ? <img className="wo-muscle-icon" src="/images/hamstrings-logo.png" /> : null}
                            {w.main_muscles.includes("Lats") ? <img className="wo-muscle-icon" src="/images/lats-logo.png" /> : null}
                            {w.main_muscles.includes("Lower_back") ? <img className="wo-muscle-icon" src="/images/lower_back-logo.png" /> : null}
                            {w.main_muscles.includes("Middle_back") ? <img className="wo-muscle-icon" src="/images/middle_back-logo.png" /> : null}
                            {w.main_muscles.includes("Neck") ? <img className="wo-muscle-icon" src="/images/neck-logo.png" /> : null}
                            {w.main_muscles.includes("Quadriceps") ? <img className="wo-muscle-icon" src="/images/quadriceps-logo.png" /> : null}
                            {w.main_muscles.includes("Shoulders") ? <img className="wo-muscle-icon" src="/images/shoulders-logo.png" /> : null}
                            {w.main_muscles.includes("Traps") ? <img className="wo-muscle-icon" src="/images/traps-logo.png" /> : null}
                            {w.main_muscles.includes("Triceps") ? <img className="wo-muscle-icon" src="/images/triceps-logo.png" /> : null}
                        </div>
                    </div>
                    
                </div>
                
                <div className="wc-bot flx5 flx-r just-se rel">
                        {w.intRating === "bodyOnly" ? <img className="w-included faded" src={`/images/bodyOnly.png`} /> : <img className="w-included" src={`/images/${w.intRating}-weights-included.png`} /> }
                    <div className="wcb-back eight flx-c">
                        <div className="wcbb-desc flx3">
                            <p className="m0 ml-2"><strong>Focus on: </strong>{w.main_muscles} </p>
                            <p className="m0 ml-2"><strong>Description: </strong></p>
                            <p className="m0 ml-2 small">{w.wo_desc ? w.wo_desc.charAt(0).toUpperCase()+w.wo_desc.slice(1) : "None"} </p>
                        </div>
                        <div className="flx2 flx-r just-r px-2">
                            <div className="icon-box high100 flx-r just-sb">
                                <div className="icon white-text"><img className="wc-icon" src="/images/check-icon.png" /> 0</div>
                                <div className="icon white-text">{user ? (user.favorited.indexOf(w.id) > -1 ? <img className="wc-icon" src="/images/bookmark-icon-full-green.png" onClick={() => removeFromFavorites(w.id)} /> : <img className="wc-icon" src="/images/bookmark-icon.png" onClick={() => addToFavorites(w.id)} />) : <img className="wc-icon" src="/images/bookmark-icon.png" onClick={() => addToFavorites(w.id)} /> } {w.numOfFavs}</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/review-icon.png" /> {w.numOfRatings}</div>
                            </div>
                        </div>
                    </div>
                    <div className="int"></div>
                    <div className="int"><p className="m0 mt-2"><strong>INTENSITY SCORE</strong></p>{w.intScore > 0 ? <span className="xxx-larges">{w.intScore}</span> : <span className="xxx-larges silent">{w.intScore}</span>}<span className="gray-text">/100</span></div>
                    <div className="end"><p className="m0 mt-2"><strong>ENDURANCE RATING</strong></p><p className="xxx-larges m0">{w.endScore}<span className="medium gray-text">/5</span></p></div>
                    <div className="circ"><p className="m0 mt-2"><strong>CIRCUITS</strong></p><p className="xxx-larges m0">{w.circuits == 1 ? <span className="silent">n/a</span> : <span className="green-text">{w.circuits}</span>}</p></div>
                </div>
            </div> }) : null}
        
            <div className="card-empty pad28"></div>

            </div>

        </>
    )
}
export default Home;