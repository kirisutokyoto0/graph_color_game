import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-container">
            <p className="title">Graph Coloring Game</p>

            <Link to="/graph">
                <button className="home-buttons start-button">Start</button>
            </Link>
            <Link>
                <button className="home-buttons">
                    How to <br></br> play?
                </button>
            </Link>
        </div>
    );
}

export default Home;
