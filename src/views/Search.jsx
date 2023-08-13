import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Search = (props) => {
    // mus is the list of muscles searched for by the user
    const [mus, setMus] = useState([]);
    const [intensity, setIntensity] = useState(null);
    const [circuits, setCircuits] = useState(null);

    const muscleFind = e => {
        let text = e.target.value.toLowerCase()
        if (text.includes("abdominals") && !mus.includes("Abdominals  ") || text.includes("abs") && !mus.includes("Abdominals  ")) {
            let musCopy = mus.slice();
            musCopy.push("Abdominals  ");
            setMus(musCopy);
        } else if (!text.includes("abdominals") && !text.includes("abs") && mus.includes("Abdominals  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Abdominals  ';
            });
            setMus(musCopy);
        }
        if (text.includes("abductors") && !mus.includes("Abductors  ")) {
            let musCopy = mus.slice();
            musCopy.push("Abductors  ");
            setMus(musCopy);
        } else if (!text.includes("abductors") && mus.includes("Abductors  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Abductors  ';
            });
            setMus(musCopy);
        }
        if (text.includes("adductors") && !mus.includes("Adductors  ")) {
            let musCopy = mus.slice();
            musCopy.push("Adductors  ");
            setMus(musCopy);
        } else if (!text.includes("adductors") && mus.includes("Adductors  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Adductors  ';
            });
            setMus(musCopy);
        }
        if (text.includes("back") && !mus.includes("Back  ")) {
            let musCopy = mus.slice();
            musCopy.push("Back  ");
            setMus(musCopy);
        } else if (!text.includes("back") && mus.includes("Back  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Back  ';
            });
            setMus(musCopy);
        }
        if (text.includes("bicep") && !mus.includes("Biceps  ")) {
            let musCopy = mus.slice();
            musCopy.push("Biceps  ");
            setMus(musCopy);
        } else if (!text.includes("bicep") && mus.includes("Biceps  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Biceps  ';
            });
            setMus(musCopy);
        }
        if (text.includes("calves") && !mus.includes("Calves  ")) {
            let musCopy = mus.slice();
            musCopy.push("Calves  ");
            setMus(musCopy);
        } else if (!text.includes("calves") && mus.includes("Calves  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Calves  ';
            });
            setMus(musCopy);
        }
        if (text.includes("chest") && !mus.includes("Chest  ")) {
            let musCopy = mus.slice();
            musCopy.push("Chest  ");
            setMus(musCopy);
        } else if (!text.includes("chest") && mus.includes("Chest  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Chest  ';
            });
            setMus(musCopy);
        }
        if (text.includes("glutes") && !mus.includes("Glutes  ") || text.includes("butt") && !mus.includes("Glutes  ")) {
            let musCopy = mus.slice();
            musCopy.push("Glutes  ");
            setMus(musCopy);
        } else if (!text.includes("glutes") && !text.includes("butt") && mus.includes("Glutes  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Glutes  ';
            });
            setMus(musCopy);
        }
        if (text.includes("hamstring") && !mus.includes("Hamstrings  ")) {
            let musCopy = mus.slice();
            musCopy.push("Hamstrings  ");
            setMus(musCopy);
        } else if (!text.includes("hamstring") && mus.includes("Hamstrings  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Hamstrings  ';
            });
            setMus(musCopy);
        }
        if (text.includes("lats") && !mus.includes("Lats  ")) {
            let musCopy = mus.slice();
            musCopy.push("Lats  ");
            setMus(musCopy);
        } else if (!text.includes("lats") && mus.includes("Lats  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Lats  ';
            });
            setMus(musCopy);
        }
        if (text.includes("neck") && !mus.includes("Neck  ")) {
            let musCopy = mus.slice();
            musCopy.push("Neck  ");
            setMus(musCopy);
        } else if (!text.includes("neck") && mus.includes("Neck  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Neck  ';
            });
            setMus(musCopy);
        }
        if (text.includes("quad") && !mus.includes("Quadriceps  ")) {
            let musCopy = mus.slice();
            musCopy.push("Quadriceps  ");
            setMus(musCopy);
        } else if (!text.includes("quad") && mus.includes("Quadriceps  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Quadriceps  ';
            });
            setMus(musCopy);
        }
        if (text.includes("shoulders") && !mus.includes("Shoulders  ") || text.includes("delt") && !mus.includes("Shoulders  ")) {
            let musCopy = mus.slice();
            musCopy.push("Shoulders  ");
            setMus(musCopy);
        } else if (!text.includes("shoulders") && !text.includes("delt") && mus.includes("Shoulders  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Shoulders  ';
            });
            setMus(musCopy);
        }
        if (text.includes("trap") && !mus.includes("Traps  ")) {
            let musCopy = mus.slice();
            musCopy.push("Traps  ");
            setMus(musCopy);
        } else if (!text.includes("trap") && mus.includes("Traps  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Traps  ';
            });
            setMus(musCopy);
        }
        if (text.includes("tricep") && !mus.includes("Triceps  ")) {
            let musCopy = mus.slice();
            musCopy.push("Triceps  ");
            setMus(musCopy);
        } else if (!text.includes("tricep") && mus.includes("Triceps  ")) {
            let musCopy = mus.slice();
            musCopy = musCopy.filter(function (letter) {
                return letter !== 'Triceps  ';
            });
            setMus(musCopy);
        }
    }

    const searchForWorkout = async () => {
        if (mus.length === 0) {
            alert("You haven't entered in any muscle groups. Type at least one in, and try again!")
        } else {
            let query = { "muscles": mus, "intensity": intensity, "circuits": circuits }
            const resp = await axios.post('http://localhost:5000/api/search-workout', JSON.stringify(query), {
                headers: { "Content-Type": "application/json" }
            })
                .then(resp => handleResp(resp))
        }
    }

    const handleResp = (resp) => {
        if (resp.status === 200) {
            console.log(resp.data);
            props.setSearchWorkouts(resp.data.data)
            navigate('/workout/search/workouts')
        }
    }

    const updateCircuits = () => {
        if (document.getElementById("circuits-checkbox").checked) {
            console.log("checked")
            setCircuits("Yes")
        } else {
            setCircuits(null);
        }
    }

    const updateIntensity = (e) => {
        if (e.target.value === "none") {
            setIntensity(null)
        } else {
            setIntensity(e.target.value)
        }
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    return (
        <>
            <h1 className="center-text">What do you want to train today?</h1>

            <div className="search-wo-box center-text">
                <input type="text" onChange={e => muscleFind(e)} className="wo-title pad8 mt-5" placeholder="Chest, triceps, back etc..."></input>
                <p className="white-text left-text mx-6">{mus}&nbsp;</p>                
                <div className="flx-r just-se">
                    <div>
                        <label htmlFor="intensity-dropdown" className="white-text">Intensity: </label>
                    <select onChange={(e) => updateIntensity(e)} id="intensity-dropdown">
                        <option value="none"></option>
                        <option value="bodyOnly">No Weights</option>
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="heavy">Heavy</option>
                    </select>
                    </div>
                    <div>
                        <label htmlFor="circuits-checkbox" className="white-text">Circuits Only</label>
                        <input onChange={() => updateCircuits()} type="checkbox" id="circuits-checkbox" />
                    </div>
                </div>
            </div>
            <div className="card-empty"></div>
            <div className="center-text">
            <button className="gray-btn center inline mt-4 mx-2" onClick={() => goBack()}>Go Back</button>
            <button className="green-btn center inline mx-2" onClick={() => searchForWorkout()}>Find Workout</button>
            </div>
        </>
    )
}
export default Search;