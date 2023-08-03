import axios from "axios"
import { useState } from "react"

const Search = () => {
    const [mus, setMus] = useState([])

    const muscleFind = e => {
        let text = e.target.value.toLowerCase()
        if (text.includes("abdominals") && !mus.includes("Abdominals  ")) {
            let musCopy = mus.slice();
            musCopy.push("Abdominals  ");
            setMus(musCopy);
        } else if (!text.includes("abdominals") && mus.includes("Abdominals  ")) {
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
        if (text.includes("back") && !mus.includes("Backs  ")) {
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
        if (text.includes("glutes") && !mus.includes("Glutes  ")) {
            let musCopy = mus.slice();
            musCopy.push("Glutes  ");
            setMus(musCopy);
        } else if (!text.includes("glutes") && mus.includes("Glutes  ")) {
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
        if (text.includes("shoulders") || text.includes("delt") && !mus.includes("Shoulders  ")) {
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
        const resp = await axios.post('http://localhost:5000/api/search-workout', JSON.stringify(mus), {
            headers: { "Content-Type": "application/json" }
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    return (
        <>
            <h1 className="center-text">What do you want to train today?</h1>

            <div className="search-wo-box center-text">
                <input type="text" onChange={e => muscleFind(e)} className="wo-title pad8 mt-5" placeholder="Chest, triceps, back etc..."></input>
                <p className="white-text left-text mx-6">{mus}</p>
            </div>
            <div className="card-empty"></div>
            <button className="green-btn center" onClick={() => searchForWorkout()}>Find Workout</button>
        </>
    )
}
export default Search;