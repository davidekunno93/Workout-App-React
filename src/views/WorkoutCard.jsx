import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const WorkoutCard = () => {
    const { thisWorkout, setThisWorkout } = useContext(DataContext)
    const location = useLocation()
    const { data } = location.state

    console.log(data)

    return (
        <>
            <h1 className="center-text">{data.wo_name}</h1>
            <div className="workout-card-div flx-c">
                <div className="wc-top flx1 flx-r just-sb pad8 n-white-text">
                    <div className="wct-left">
                        <p className="wctl-name m0"><strong>{data.wo_name}</strong></p>
                        <p className="wctl-createdby m0 small">Created by: <span className="link-text">{data.createdby_un}</span> </p>
                    </div>
                    <div className="wct-right mt-1h">
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        ({data.numOfRatings})
                    </div>
                </div>
                <div className="wc-mid flx7 flx-r just-se n-text">
                    <div className="wcm-back flx-r flx-wrap just-se">
                        <div className="wcmb-empty"></div>
                        {data.ex_names_dash ? data.ex_names_dash.split("*").map((en, i) => {
                            return <div key={i} className="wcmb-ex">{en}</div>
                        }) : null}
                    </div>
                    <div className="wcm-muscles">
                        <div className="muscs flx-r just-se mt-3">
                            {data.main_muscles.includes("Abdominals") ? <img className="wo-muscle-icon" src="/images/abdominals-logo.png" /> : null}
                            {data.main_muscles.includes("Abductors") ? <img className="wo-muscle-icon" src="/images/abductors-logo.png" /> : null}
                            {data.main_muscles.includes("Adductors") ? <img className="wo-muscle-icon" src="/images/adductors-logo.png" /> : null}
                            {data.main_muscles.includes("Biceps") ? <img className="wo-muscle-icon" src="/images/biceps-logo.png" /> : null}
                            {data.main_muscles.includes("Calves") ? <img className="wo-muscle-icon" src="/images/calves-logo.png" /> : null}
                            {data.main_muscles.includes("Chest") ? <img className="wo-muscle-icon" src="/images/chest-logo.png" /> : null}
                            {data.main_muscles.includes("Forearms") ? <img className="wo-muscle-icon" src="/images/forearms-logo.png" /> : null}
                            {data.main_muscles.includes("Glutes") ? <img className="wo-muscle-icon" src="/images/glutes-logo.png" /> : null}
                            {data.main_muscles.includes("Hamstrings") ? <img className="wo-muscle-icon" src="/images/hamstrings-logo.png" /> : null}
                            {data.main_muscles.includes("Lats") ? <img className="wo-muscle-icon" src="/images/lats-logo.png" /> : null}
                            {data.main_muscles.includes("Lower_back") ? <img className="wo-muscle-icon" src="/images/lower_back-logo.png" /> : null}
                            {data.main_muscles.includes("Middle_back") ? <img className="wo-muscle-icon" src="/images/middle_back-logo.png" /> : null}
                            {data.main_muscles.includes("Neck") ? <img className="wo-muscle-icon" src="/images/neck-logo.png" /> : null}
                            {data.main_muscles.includes("Quadriceps") ? <img className="wo-muscle-icon" src="/images/quadriceps-logo.png" /> : null}
                            {data.main_muscles.includes("Shoulders") ? <img className="wo-muscle-icon" src="/images/shoulders-logo.png" /> : null}
                            {data.main_muscles.includes("Traps") ? <img className="wo-muscle-icon" src="/images/traps-logo.png" /> : null}
                            {data.main_muscles.includes("Triceps") ? <img className="wo-muscle-icon" src="/images/triceps-logo.png" /> : null}
                        </div>
                    </div>

                </div>

                <div className="wc-bot flx5 flx-r just-se rel">
                {data.intRating === "bodyOnly" ? <img className="w-included faded" src={`/images/bodyOnly.png`} /> : <img className="w-included" src={`/images/${data.intRating}-weights-included.png`} /> }
                    <div className="wcb-back eight flx-c">
                        <div className="wcbb-desc flx3">
                            <p className="m0 ml-2"><strong>Focus on:</strong> {data.main_muscles}</p>
                            <p className="m0 ml-2"><strong>Description: </strong></p>
                            <p className="m0 ml-2 small">{data.wo_desc}</p>
                        </div>
                        <div className="flx2 flx-r just-r px-2">
                            <div className="icon-box high100 flx-r just-sb">
                                <div className="icon white-text"><img className="wc-icon" src="/images/check-icon.png" /> 0</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/bookmark-icon.png" /> {data.numOfFavs}</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/review-icon.png" /> {data.numOfRatings}</div>
                            </div>
                        </div>
                    </div>
                    <div className="int"></div>
                    <div className="int"><p className="m0 mt-2"><strong>INTENSITY SCORE</strong></p><span className="xxx-larges">{data.intScore}</span><span className="gray-text">/100</span></div>
                    <div className="end"><p className="m0 mt-2"><strong>ENDURANCE RATING</strong></p><p className="xxx-larges m0">{data.endScore}<span className="medium gray-text">/5</span></p></div>
                    <div className="circ"><p className="m0 mt-2"><strong>CIRCUITS</strong></p><p className="xxx-larges m0">{data.circuits === 1 ? <span className="silent">n/a</span> : <span className="green-text">data.circuits</span>}</p></div>
                </div>
            </div>

            <div className="wc-foot mt-4 bg-black">
                <div className="wc-info flx-r just-se">
                    <button className="nav-btn info-exes large"><strong>EXERCISES</strong></button>
                    <button className="nav-btn info-desc"><strong>DESCRIPTION</strong></button>
                    <button className="nav-btn info-reviews"><strong>REVIEWS</strong></button>
                    <button className="nav-btn info-completes"><strong>USERS COMPLETED</strong></button>
                </div>
                <div className="wcf-display white-text pad28">
                    conditional rendering coming soon...
                </div>
            </div>
            <div className="card-empty pad28"></div>
        </>
    )
}
export default WorkoutCard;