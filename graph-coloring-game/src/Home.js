import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home({ toggleMusic, isPlaying }) {
    return (
        <div className="home-container">
            <p className="title">Graph Coloring Game</p>

            {/* Navigation Buttons */}
            <Link to="/graph">
                <button className="home-buttons start-button">Start</button>
            </Link>
            <Link to="/help">
                <button className="home-buttons">
                    How to <br /> play?
                </button>
            </Link>
            {/* Play/Pause Music Button */}
            <button className="home-buttons" onClick={toggleMusic}>
                {isPlaying ? "Pause Music" : "Play Music"}
            </button>
        </div>
    );
}

export default Home;
