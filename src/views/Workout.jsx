import { useNavigate } from "react-router-dom";


const Workout = () => {
    const navigate = useNavigate()

    const toBuildPage = () => {
        navigate('/workout/build')
    }

    return (
        <>
            <h1 className="center-text">How do you want to Workout?</h1>
            <div className="flx-r just-se">
                <div onClick={()=> toBuildPage()} className="build-workout-box flx-c pad28">
                    <div className="title flx1 center-text gains-text mb-5"><h2>Build a Workout</h2></div>
                    <div className="picture flx1"><img className="img-blocks center" src="/images/build-blocks.png" /></div>
                    <div className="desc flx1">
                        <p className="white-text center-text"><br /><strong>Build a Workout: </strong><br />
                        Create a workout from scratch using the hundreds of exercises in our databases. A minimum of 2 exercises up to a maximuum of 12.</p>
                    </div>
                </div>
                <div className="search-workout-box flx-c pad28">
                <div className="title flx1 center-text gains-text mb-5"><h2>Search for a Workout</h2></div>
                    <div className="picture flx1"><img className="img-mag center" src="/images/mag-glass.png" /></div>
                    <div className="desc flx1">
                        <p className="white-text center-text"><strong>Search for a Workout: </strong><br />
                        Browse workouts created by other users. Tailor your search based on muscle groups, equipment needed, intensity level etc. Rate and review workouts to give users feedback!</p>
                    </div>
                </div>
            </div>
            <div className="card-empty pad28"></div>
        </>
    )
}
export default Workout;