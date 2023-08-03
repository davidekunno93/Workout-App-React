import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";


const BuildFinal = (props) => {
    const { user, setUser } = useContext(DataContext);
    const workout = props.workout
    const setWorkout = props.setWorkout
    // const location = useLocation()
    // const { data } = location.state || {};
    // console.log(data)
    console.log(props.finalWorkout)

    const flipCard = (i) => {
        const instruction = document.getElementById(i)
        instruction.classList.toggle('d-none')
        console.log(instruction)
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    const moveUp = (i) => {
        let finalCopy = [...props.finalWorkout];
        console.log(finalCopy)
        let a = finalCopy[i - 1];
        let b = finalCopy[i];
        finalCopy.splice(i - 1, 2, b, a);
        console.log(finalCopy)
        props.setFinalWorkout(finalCopy);
    }
    const moveDown = (i) => {
        let finalCopy = [...props.finalWorkout];
        let a = finalCopy[i];
        let b = finalCopy[i + 1];
        finalCopy.splice(i, 2, b, a);
        console.log(finalCopy)
        props.setFinalWorkout(finalCopy);
    }

    const incrementSets = (i) => {
        let finalCopy = [...props.finalWorkout];
        console.log(finalCopy[i]);
        if (finalCopy[i].sets == 8) {
            alert("Maximum number of sets for one exercise is 8")
        } else {
            finalCopy[i].sets++;
            console.log(finalCopy[i]);
            props.setFinalWorkout(finalCopy);
        }
    }
    const decrementSets = (i) => {
        let finalCopy = [...props.finalWorkout];
        console.log(finalCopy[i]);
        if (finalCopy[i].sets == 1) {
            alert("Minimum number of sets for one exercise is 1")
        } else {
            finalCopy[i].sets--;
            console.log(finalCopy[i]);
            props.setFinalWorkout(finalCopy);
        }
    }
    const incrementReps = (i) => {
        let finalCopy = [...props.finalWorkout];
        console.log(finalCopy[i]);
        if (finalCopy[i].reps == 100) {
            alert("Maximum number of reps for one exercise is 100")
        } else {
            finalCopy[i].reps++;
            finalCopy[i].reps++;
            console.log(finalCopy[i]);
            props.setFinalWorkout(finalCopy);
        }
    }
    const decrementReps = (i) => {
        let finalCopy = [...props.finalWorkout];
        console.log(finalCopy[i]);
        if (finalCopy[i].reps == 2) {
            alert("Minimum number of reps for one exercise is 2")
        } else {
            finalCopy[i].reps--;
            finalCopy[i].reps--;
            console.log(finalCopy[i]);
            props.setFinalWorkout(finalCopy);
        }
    }

    const removeItFromWorkout = (exercise, i) => {
        let finalCopy = [...props.finalWorkout];
        finalCopy.splice(i, 1);
        console.log(finalCopy);
        props.setFinalWorkout(finalCopy)

        // Also transform workout so the user can go to previous page and changes persist
        let workoutCopy = { ...workout };
        console.log(workoutCopy)
        workoutCopy.size--;
        workoutCopy.exercises[exercise.id].quantity === 1 ?
            delete workoutCopy.exercises[exercise.id]
            :
            workoutCopy.exercises[exercise.id].quantity--;
        console.log(workoutCopy);
        setWorkout(workoutCopy);
    }

    const changeIntensity = (i) => {
        let finalCopy = [...props.finalWorkout];
        if (finalCopy[i].intensity === "light") {
            finalCopy[i].intensity = "medium"
        } else if (finalCopy[i].intensity === "medium") {
            finalCopy[i].intensity = "heavy"
        } else if (finalCopy[i].intensity === "heavy") {
            finalCopy[i].intensity = "light"
        };
        console.log(finalCopy);
        props.setFinalWorkout(finalCopy);
    }


    const updateCircuit = (e) => {
        let finalCopy = [...props.finalWorkout];
        // console.log(e.target.value);
        let pen = finalCopy.length - 1;
        finalCopy[pen].info.circuits = e.target.value;
        console.log(finalCopy);
        props.setFinalWorkout(finalCopy);
    }

    const createWorkout = async () => {
        if (user === null) {
            alert("You must be logged in to do this action")
            navigate('/login')
        }
        let finalCopy = [...props.finalWorkout];
        let pen = finalCopy.length - 1;
        console.log(user)
        finalCopy[pen].info.user_id = user.id
        let url = "http://localhost:5000/create-workout"
        const resp = await fetch(url, {
            "method": "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalCopy)
        })
            .then(resp => resp.json())
            // .then(data => console.log(data))
            .then(data => handleData(data))
    }

    const handleData = (data) => {
        if (data.data === "nameDuplicate") {
            alert("This workout name already exists! Please create another one")
        } else if (data.data === "workoutDuplicate") {
            alert("This workout already exists! Please make some changes to it before you create it")
        } else if (data.data === "noName") {
            alert("Please Create a name for your workout")
        } else if (data.message === "successful") {
            console.log(data)
            let emptyWorkout = { "size": 0, "exercises": {} }
            setWorkout(emptyWorkout)
            navigate('/workout-card')
        } else {
            console.log(data)
        }
    }

    const updateName = (e) => {
        let finalCopy = [...props.finalWorkout];
        let pen = finalCopy.length - 1
        finalCopy[pen].info.name = e.target.value;
        console.log(finalCopy);
    }

    const updateDesc = (e) => {
        let finalCopy = [...props.finalWorkout];
        let pen = finalCopy.length - 1
        finalCopy[pen].info.desc = e.target.value;
        console.log(finalCopy);
    }


    return (
        <>
            <h1 className="center-text">Choose reps, sets, and intensity...</h1>
            <div className="triplet flx-c center">
                {props.finalWorkout && props.finalWorkout.length > 0 ?
                    <div className="circuit-div flx-r just-ce">
                        <label className="large mx-2" htmlFor="circuit-checkbox">Circuits:</label>

                        <select onChange={updateCircuit} id="repeats" name="repeats">
                            <option value="1">None</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                    :
                    null}
                {props.finalWorkout && props.finalWorkout.length > 0 ? props.finalWorkout.slice(0, -1).map((ex, i) => {
                    return <div key={i} className="flx-r just-ce">
                        <div onClick={() => changeIntensity(i)} className="left-column">{ex.intensity === "na" ? <img className="intensity-disabled" src={`/images/intensity-${ex.intensity}.png`}></img> : <img className="intensity" src={`/images/intensity-${ex.intensity}.png`} />}</div>

                        <div key={i} className="wo-card ml-4 my-2">
                            <div className="close-btn"></div>
                            <img onClick={() => removeItFromWorkout(ex, i)} className="close-cross" src="/images/white-cross-curved.png" />
                            <div id={`${i}top`} className="wo-instructions d-none"><p className="pad8 x-small white-text center-text"><span className="medium bold white-text">Instructions:</span> <br /> {ex.instructions}</p></div>

                            <div className="one flx1 wide100 front"><p className="m0 white-text center-text"><strong>{ex.name}</strong></p></div>
                            <div className="two flx5 pt-2 front">
                                {ex.equipment === "e_z_curl_bar" || ex.equipment === "dumbbell" || ex.equipment === "barbell" ?
                                    <img className="equip-icon" src={`/images/weight-logo.png`} /> : <div className="card-empty"></div>}
                                <img className="wo-muscle-group-icon" src={`/images/${ex.muscle}-logo.png`} />
                                <img className="diff-icon" src={`/images/${ex.difficulty}-logo.png`} />
                            </div>


                            <div className="wo-four flx1 wide100"><p className="m0 center-text"><Link onClick={() => flipCard(`${i}top`)} className="black-text">Instructions</Link></p></div>
                        </div>

                        <div className="reorder flx-c">
                            {i === 0 ? <img className="arrow-disabled mt-5" src="/images/up-arrow4.png"></img> : <img onClick={() => moveUp(i)} className="arrow2 mt-5" src="/images/up-arrow4.png"></img>
                            }
                            {i === props.finalWorkout.length - 2 ?
                                <img className="arrow-disabled mt-3" src="/images/down-arrow4.png"></img> : <img onClick={() => moveDown(i)} className="arrow2 mt-3" src="/images/down-arrow4.png"></img>
                            }
                        </div>



                        <div className="sr-box flx-c ml-4">
                            <div className="flx1 space"></div>
                            <div className="flx1 inc flx-r">
                                <div onClick={() => incrementSets(i)} className="five plus flx1 center-text x-large mx-n">+</div>
                                <div onClick={() => incrementReps(i)} className="five plus flx1 center-text x-large">+</div>
                            </div>
                            <div className="set-rep-box flx1 flx-r just-se">
                                <div className="set-count x-large" id={`${i}-sets`}><strong><span className="medium">&nbsp;&nbsp;SETS:</span> {ex.sets}</strong> &nbsp;</div>
                                <div className="rep-count flx-r x-large" id={`${i}-reps`}>
                                    <strong><span className="medium">&nbsp;&nbsp;&nbsp;&nbsp; REPS:</span></strong>
                                    <div className="rep-number">
                                        <strong>&nbsp;{ex.reps}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="flx1 dec flx-r">
                                <div onClick={() => decrementSets(i)} className="five minus flx1 center-text x-large mx-n">-</div>
                                <div onClick={() => decrementReps(i)} className="five minus flx1 center-text x-large">-</div>
                            </div>
                            <div className="flx1 space"></div>
                        </div>
                    </div>
                }) : null
                }
            </div>
            {props.finalWorkout && props.finalWorkout.length > 0 ?
            <div className="wo-dets flx-c my-3">
                <div className="wod-title white-text bg-black pad8 x-large">Final touches...</div>
                <input type="text" onChange={updateName} className="wo-title center pad8 mt-4" placeholder="Name your workout"></input>
                <textarea type="text" onChange={updateDesc} className="wo-desc center my-2 pad8" placeholder="Describe your workout..."></textarea>
            </div> : null }

            <div className="flx-r just-ce">
                <button type="button" onClick={() => goBack()} className="dark-btn mx-2">Go Back</button>
                {props.finalWorkout && props.finalWorkout.length > 0 ?
                    <button onClick={() => createWorkout()} className="green-btn mx-2">Create Workout</button>
                    :
                    <button title="Add exercises to create a workout" className="disabled mx-2">Create Workout</button>}
            </div>
            <div className="card-empty"></div>
        </>
    )
}
export default BuildFinal;