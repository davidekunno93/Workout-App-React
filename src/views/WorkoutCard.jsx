import { Link } from "react-router-dom";

const WorkoutCard = () => {


    return (
        <>
            <h1 className="center-text">The Workout Card</h1>
            <div className="workout-card-div flx-c">
                <Link className="wc-top flx1 flx-r just-sb pad8 n-white-text">
                    <div className="wct-left">
                        <p className="wctl-name m0"><strong>Name</strong></p>
                        <p className="wctl-createdby m0 small">Created by: </p>
                    </div>
                    <div className="wct-right mt-1h">
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        <img className="star mx-1" src="/images/no-star.png"></img>
                        (0)
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
                    <div className="wcm-muscles flx-r just-se">
                        muscle groups
                    </div>
                    
                </Link>
                
                <div className="wc-bot flx4 flx-r just-se">
                    <div className="wcb-back eight flx-c">
                        <div className="wcbb-desc flx3">
                            <p className="m0 ml-2"><strong>Focus on: </strong></p>
                            <p className="m0 ml-2"><strong>Description: </strong></p>
                            <p className="m0 ml-2 small">This is a challenging workout even for gym goers! Try it and let me know if you like it! This is a challenging workout even for gym goers! Try it and let me know if you like it!adslk dasljfd sdfhlkdfs</p>
                        </div>
                        <div className="flx2 flx-r just-r px-2">
                            <div className="icon-box high100 flx-r just-sb">
                                <div className="icon white-text"><img className="wc-icon" src="/images/check-icon.png" />(0)</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/bookmark-icon.png" /> (0)</div>
                                <div className="icon white-text"><img className="wc-icon" src="/images/review-icon.png" /> (0)</div>
                            </div>
                        </div>
                    </div>
                    <div className="int"><p className="m0 mt-2"><strong>INTENSITY SCORE</strong></p><span className="xxx-larges">94</span><span className="gray-text">/100</span></div>
                    <div className="end"><p className="m0 mt-2"><strong>ENDURANCE RATING</strong></p><p className="xxx-larges m0">3<span className="medium gray-text">/5</span></p></div>
                    <div className="circ"><p className="m0 mt-2"><strong>CIRCUITS</strong></p><p className="xxx-larges m0">n/a</p></div>
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
                conditional rendering...
            </div>
            </div>
            <div className="card-empty pad28"></div>
        </>
    )
}
export default WorkoutCard;