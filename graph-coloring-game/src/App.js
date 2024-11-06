import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Graph from "./Graph";
import Help from "./Help";

const App = () => {
    const [isPlaying, setIsPlaying] = useState(false); // Control music play/pause
    const audioRef = useRef(null); // Reference to the background music
    const clickSoundRef = useRef(null); // Reference to the click sound

    // Function to toggle music play/pause
    const toggleMusic = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    // Function to play button click sound
    const playButtonClickSound = () => {
        clickSoundRef.current.play().catch((error) => {
            console.error("Error playing click sound:", error);
        });
    };

    // Use effect to play/pause audio based on the state
    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            if (isPlaying) {
                audioElement.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });
            } else {
                audioElement.pause();
            }
        }
    }, [isPlaying]);

    return (
        <Router>
            <div className="App">
                {/* Background Music (Plays across all pages) */}
                <audio ref={audioRef} loop>
                    <source src="/bg-music.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>

                {/* Click Sound Effect (For Buttons) */}
                <audio ref={clickSoundRef}>
                    <source src="/button-click.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>

                {/* Routes for different pages */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                toggleMusic={toggleMusic}
                                isPlaying={isPlaying}
                                playButtonClickSound={playButtonClickSound}
                            />
                        }
                    />
                    <Route path="/graph" element={<Graph />} />
                    <Route path="/help" element={<Help />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
