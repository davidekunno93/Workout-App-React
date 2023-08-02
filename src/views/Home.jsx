import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    
    const getData = async () => {
        const response = await axios.get("http://localhost:5000/api/exercise-database")
        return response.status === 200 ? response.data : null
    }
    const loadData = async () => {
        let data = await getData()
        setExercises(data)
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
        // .then(data => handleUsers(data.data))
        .then(data => setUsers(data.data))
        // .then(data => console.log(data.data[0]))
        // .then(resp => useData(resp.data))
    }

    // const useData = async (stuff) => {
    //     console.log(stuff[0].username)
    // }

    
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


    return (
        <>
        <div className="bg-black pad28 mb-5">
        <img className="welcome" src="/images/fithub-welcome.png" />
        </div>

<div className="feed-container flx-c py-3">
        {workouts && Object.keys(workouts).length > 0 ? workouts.map((w, i) => {
            return <div key={i} className="workout-card-div flx-c">
                <Link className="wc-top flx1 flx-r just-sb pad8 n-white-text">
                    <div className="wct-left">
                        <p className="wctl-name m0"><strong>{w.wo_name.charAt(0).toUpperCase()+w.wo_name.slice(1)}</strong></p>
                        <p className="wctl-createdby m0 small">Created by: {!users ? <Link>w.createdby_id</Link> : users.map((u, i) => {
                            if (u.id === w.createdby_id){ return <Link>{u.username}</Link>}
                        })} </p>
                    </div>
                    <div className="wct-right mt-1h">
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        ({w.numOfRatings})
                    </div>
                </Link>
                <Link className="wc-mid flx7 flx-r just-se n-text">
                    <div className="wcm-back flx-r flx-wrap just-se">
                        <div className="wcmb-empty"></div>
                        <div className="wcmb-ex">Workout 1</div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                        <div className="wcmb-ex"></div>
                    </div>
                    <div className="wcm-muscles">
                        <div className="muscs flx-r just-se mt-3">
                            {workouts && Object.keys(workouts).length > 0 ? null : null}
                        <img className="wo-muscle-icon" src="/images/biceps-logo.png" />
                        </div>
                    </div>
                    
                </Link>
                
                <div className="wc-bot flx4 flx-r just-se">
                    <div className="wcb-back eight flx-c">
                        <div className="wcbb-desc flx3">
                            <p className="m0 ml-2"><strong>Focus on: </strong>{w.main_muscles} </p>
                            <p className="m0 ml-2"><strong>Description: </strong></p>
                            <p className="m0 ml-2 small">{w.wo_desc.charAt(0).toUpperCase()+w.wo_desc.slice(1)} </p>
                        </div>
                        <div className="flx2 flx-r just-r px-2">
                            <div className="icon-box high100 flx-r just-sb">
                                <div className="icon white-text"><img className="wc-icon" src="/images/check-icon.png" /> 0</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/bookmark-icon.png" /> {w.numOfFavs}</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/review-icon.png" /> {w.numOfRatings}</div>
                            </div>
                        </div>
                    </div>
                    <div className="int"><p className="m0 mt-2"><strong>INTENSITY SCORE</strong></p><span className="xxx-larges">{w.intScore}</span><span className="gray-text">/100</span></div>
                    <div className="end"><p className="m0 mt-2"><strong>ENDURANCE RATING</strong></p><p className="xxx-larges m0">{w.endScore}<span className="medium gray-text">/5</span></p></div>
                    <div className="circ"><p className="m0 mt-2"><strong>CIRCUITS</strong></p><p className="xxx-larges m0">{w.circuits == 1 ? "n/a" : w.circuits}</p></div>
                </div>
            </div> }) : null}
        
            <div className="card-empty pad28"></div>

            </div>

        </>
    )
}
export default Home;