import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Link to="/graph">
                <button>Go to graph</button>
            </Link>
        </div>
    );
}

export default Home;
