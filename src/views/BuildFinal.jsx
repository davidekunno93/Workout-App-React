import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const BuildFinal = (props) => {
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

    return (
        <>
            <h1>How many sets and reps?</h1>
            {props.finalWorkout && props.finalWorkout.length > 0 ? props.finalWorkout.map((ex, i) => {
                return <div className="flx-r">
                    <div key={i} className="wo-card mx-2 my-2">
                        <div className="close-btn"></div>
                        <img onClick={()=> removeItFromWorkout(ex, i)} className="close-cross" src="/images/white-cross-curved.png" />
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
                        {i === 0 ? <img className="arrow o-none" src="/images/up-arrow.png"></img> : <img onClick={() => moveUp(i)} className="arrow" src="/images/up-arrow.png"></img>
                        }
                        {i === props.finalWorkout.length - 1 ?
                            <img className="arrow mt-3 o-none" src="/images/down-arrow.png"></img> : <img onClick={() => moveDown(i)} className="arrow mt-3" src="/images/down-arrow.png"></img>
                        }
                    </div>
                    <div className="sr-box flx-c">
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

            <button onClick={() => goBack()} className="dark-btn">Go Back</button>
            <button className="green-btn">Create Workout</button>
        </>
    )
}
export default BuildFinal;