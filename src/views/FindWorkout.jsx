import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const FindWorkout = (props) => {

    console.log(props.searchWorkouts)

    const getData = async () => {
        const resp = axios.get("localhost:5000/search-e")
    }

    const getUsers = async () => {
        const resp = await axios.get("http://localhost:5000/api/users-database")
        return resp.data
    }
    
    const loadUsers = async () => {
        const resp = getUsers()
        .then(data => setUsers(data.data))
    }

    const [users, setUsers] = useState(() => loadUsers())

    return (
        <>
            <h1 className="center-text">Choose your Workout!</h1>
            <div className="flx-r flex-wrap">
            {props.searchWorkouts.map((w, i) => {
                return <div key={i} className="workout-card2-div flx-c">
                <Link to="/workout-card" state={{data: w}} className="wc-top flx1 flx-r just-sb pad8 n-white-text">
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
                </Link>
                <Link to="/workout-card" state={{data: w}} className="wc-mid flx7 flx-r just-se n-text">
                    <div className="wcm-back flx-r flx-wrap just-se">
                        <div className="wcmb-empty"></div>
                        {w.ex_names_dash ? w.ex_names_dash.split("*").map((en, i) => {
                            return <div key={i} className="wcmb-ex2">{en}</div>
                        }) : null }
                        
                    </div>
                    <div className="wcm-muscles">
                        <div className="muscs flx-r just-se mt-3">
                            {w.main_muscles.includes("Abdominals") ? <img className="wo-muscle-icon2" src="/images/abdominals-logo.png" /> : null}
                            {w.main_muscles.includes("Abductors") ? <img className="wo-muscle-icon2" src="/images/abductors-logo.png" /> : null}
                            {w.main_muscles.includes("Adductors") ? <img className="wo-muscle-icon2" src="/images/adductors-logo.png" /> : null}
                            {w.main_muscles.includes("Biceps") ? <img className="wo-muscle-icon2" src="/images/biceps-logo.png" /> : null}
                            {w.main_muscles.includes("Calves") ? <img className="wo-muscle-icon2" src="/images/calves-logo.png" /> : null}
                            {w.main_muscles.includes("Chest") ? <img className="wo-muscle-icon2" src="/images/chest-logo.png" /> : null}
                            {w.main_muscles.includes("Forearms") ? <img className="wo-muscle-icon2" src="/images/forearms-logo.png" /> : null}
                            {w.main_muscles.includes("Glutes") ? <img className="wo-muscle-icon2" src="/images/glutes-logo.png" /> : null}
                            {w.main_muscles.includes("Hamstrings") ? <img className="wo-muscle-icon2" src="/images/hamstrings-logo.png" /> : null}
                            {w.main_muscles.includes("Lats") ? <img className="wo-muscle-icon2" src="/images/lats-logo.png" /> : null}
                            {w.main_muscles.includes("Lower_back") ? <img className="wo-muscle-icon2" src="/images/lower_back-logo.png" /> : null}
                            {w.main_muscles.includes("Middle_back") ? <img className="wo-muscle-icon2" src="/images/middle_back-logo.png" /> : null}
                            {w.main_muscles.includes("Neck") ? <img className="wo-muscle-icon2" src="/images/neck-logo.png" /> : null}
                            {w.main_muscles.includes("Quadriceps") ? <img className="wo-muscle-icon2" src="/images/quadriceps-logo.png" /> : null}
                            {w.main_muscles.includes("Shoulders") ? <img className="wo-muscle-icon2" src="/images/shoulders-logo.png" /> : null}
                            {w.main_muscles.includes("Traps") ? <img className="wo-muscle-icon2" src="/images/traps-logo.png" /> : null}
                            {w.main_muscles.includes("Triceps") ? <img className="wo-muscle-icon2" src="/images/triceps-logo.png" /> : null}
                        </div>
                    </div>
                    
                </Link>
                
                <div className="wc-bot flx5 flx-r just-se rel">
                        {w.intRating === "bodyOnly" ? <img className="w-included2 faded" src={`/images/bodyOnly.png`} /> : <img className="w-included2" src={`/images/${w.intRating}-weights-included.png`} /> }
                    <div className="wcb-back eight flx-c">
                        <div className="wcbb-desc flx3">
                            <p className="m0 ml-2"><strong>Focus on: </strong>{w.main_muscles} </p>
                            <p className="m0 ml-2"><strong>Description: </strong></p>
                            <p className="m0 ml-2 small">{w.wo_desc ? w.wo_desc.charAt(0).toUpperCase()+w.wo_desc.slice(1) : "None"} </p>
                        </div>
                        <div className="flx2 flx-r just-r px-2">
                            <div className="icon-box high100 flx-r just-sb">
                                <div className="icon white-text"><img className="wc-icon" src="/images/check-icon.png" /> 0</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/bookmark-icon.png" /> {w.numOfFavs}</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/review-icon.png" /> {w.numOfRatings}</div>
                            </div>
                        </div>
                    </div>
                    <div className="int"></div>
                    <div className="int"><p className="m0 mt-2"><strong>INTENSITY</strong></p>{w.intScore > 0 ? <span className="xxx-larges">{w.intScore}</span> : <span className="xxx-larges silent">{w.intScore}</span>}<span className="gray-text">/100</span></div>
                    <div className="end"><p className="m0 mt-2"><strong>ENDURANCE</strong></p><p className="xxx-larges m0">{w.endScore}<span className="medium gray-text">/5</span></p></div>
                    <div className="circ"><p className="m0 mt-2"><strong>CIRCUITS</strong></p><p className="xxx-larges m0">{w.circuits == 1 ? <span className="silent">n/a</span> : <span className="green-text">{w.circuits}</span>}</p></div>
                </div>
            </div> })}
            </div>
            <div className="card-empty"></div>
        </>
    )
}
export default FindWorkout;