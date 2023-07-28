import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Build = () => {


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
        
    }
    const findData = async () => {
        let data = await getData()
        setExercises(data)
    }

    const [exercises, setExercises] = useState(() => loadData())

    const flipCard = (i) => {
        const instruction = document.getElementById(i)
        instruction.classList.toggle('d-none')
        console.log(instruction)
        const dets = document.getElementById(`${i}-dets`)
        dets.classList.toggle('o-none')
        console.log(dets)


    }


    return (
        <section className="build-bg">
            <h1>This is Build!</h1>
            <div className="search-bar">
                <form method="POST" onSubmit={searchData}>
                    <label htmlFor="muscle" className="white-text">Muscle Group:</label>
                    <select id="cars" name="muscle">
                        <option value=""></option>
                        <option value="abdominals">Abdominals</option>
                        <option value="abductors">Abductors</option>
                        <option value="adductors">Adductors</option>
                        <option value="biceps">Biceps</option>
                        <option value="calves">Calves</option>
                        <option value="chest">Chest</option>
                        <option value="middle_Back">Middle Back</option>
                        <option value="lats">Lats</option>
                        <option value="lower_Back">Lower Back</option>
                        <option value="traps">Traps</option>
                        <option value="triceps">Triceps</option>
                    </select>
                    <label className="white-text" htmlFor="difficulty">Difficulty:</label>
                    <select id="difficulty" name="cars">
                        <option value=""></option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                    <input id="no-weights" value="no weights" type="checkbox" />
                    <label className="white-text" htmlFor="no-weights">No weights?</label>
                    <button className="darkblue-btn">Submit</button>
                </form>
            </div>
            <div className="exercises flx-r just-se flx-wrap">
                {exercises.data && exercises.data.length > 0 ? exercises.data.slice(0, 5).map((e, i) => {
                    return <div key={i} className="ex-card mx-2 my-2" title={e.instructions}>
                        <div className="selection-full"></div>
                        <div className="selection-count">1</div>
                        <div id={i} className="instructions d-none"><p className="pad8 x-small white-text center-text"><span className="medium bold white-text">Instructions:</span> <br /> {e.instructions}</p></div>
                        <div className="one flx1 wide100 front"><p className="m0 white-text center-text"><strong>{e.name}</strong></p></div>
                        <div className="two flx5 pad8 front">
                            {e.equipment === "machine" || e.equipment === "dumbell" || e.equipment === "barbell" ?
                                <img className="equip-icon" src={`/images/${e.equipment}-logo.png`} /> : <div className="card-empty"></div>}
                            <img className="muscle-group-icon" src={`/images/${e.muscle}-logo.png`} />
                            <img className="diff-icon" src={`/images/${e.difficulty}-logo.png`} />
                        </div>
                        <div id={`${i}-dets`} className="three flx2 grid-2c border-top-b">
                            <p className="m0 mx-3"><span className="card-att">Muscle:</span> {e.muscle.charAt(0).toUpperCase() + e.muscle.slice(1)}</p>
                            <p className="m0 mx-3"><span className="card-att">Equip:</span> {e.equipment.charAt(0).toUpperCase() + e.equipment.slice(1)}</p>
                            <p className="m0 mx-3"><span className="card-att">Type:</span> {e.ex_type.charAt(0).toUpperCase() + e.ex_type.slice(1)}</p>
                            <p className="m0 mx-3"><span className="card-att">Diff:</span> {e.difficulty.charAt(0).toUpperCase() + e.difficulty.slice(1)}</p>
                        </div>
                        <div className="four flx1 wide100"><p className="m0 center-text"><Link className="black-text" onClick={() => { flipCard(i) }}>Instructions</Link></p></div>


                    </div>
                }) : <h3><FontAwesomeIcon icon={faSpinner} spin />&nbsp;&nbsp;Loading</h3>}
            </div>
        </section>
    )
}
export default Build;