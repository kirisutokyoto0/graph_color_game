import React, { useState } from "react";
import "./Graph.css";
import { Link } from "react-router-dom";

const colorsPalette = [
    "#D7263D",
    "#F46036",
    "#E56399",
    "#1B998B",
    "#C5D86D",
    null,
];

// Graph maps for each level
const graphMaps = {
    easy: [
        [0, 1, 1, 0, 0, 1, 1], //0
        [1, 0, 0, 1, 1, 1, 1], //1
        [1, 0, 0, 1, 0, 1, 1], //2
        [0, 1, 1, 0, 1, 1, 1], //3
        [0, 1, 0, 1, 0, 0, 0], //4
        [1, 1, 1, 1, 0, 0, 1], //5
        [1, 1, 1, 1, 0, 1, 0], //6
    ],
    medium: [
        [0, 1, 1, 0, 0, 0, 0, 0, 0], //0
        [1, 0, 1, 1, 0, 0, 1, 0, 1], //1
        [1, 1, 0, 0, 1, 1, 1, 0, 0], //2
        [0, 1, 0, 0, 1, 0, 1, 0, 1], //3
        [0, 0, 1, 1, 0, 1, 0, 0, 0], //4
        [0, 0, 1, 0, 1, 0, 1, 1, 0], //5
        [0, 1, 1, 1, 0, 1, 0, 1, 0], //6
        [0, 0, 0, 0, 0, 1, 1, 0, 0], //7
        [0, 1, 0, 1, 0, 0, 0, 0, 0], //8
    ],
    hard: [
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0], //0
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 0], //1
        [0, 1, 0, 0, 0, 1, 0, 0, 1, 0], //2
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1], //3
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 1], //4
        [1, 0, 1, 0, 1, 0, 0, 0, 1, 0], //5
        [0, 1, 0, 1, 1, 0, 0, 1, 0, 0], //6
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 1], //7
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 1], //8
        [0, 0, 0, 1, 1, 0, 0, 1, 1, 0], //9
    ],
    hardcore: [
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], //0
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1], //1
        [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], //2
        [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0], //3
        [0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0], //4
        [0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0], //5
        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0], //6
        [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0], //7
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], //8
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], //9
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //10
    ],
    nightmare: [
        //0  1  2  3  4  5  6  7  8  9  10 11 12
        [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0], //0
        [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0], //1
        [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1], //2
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0], //3
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1], //4
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0], //5
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0], //6
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0], //7
        [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0], //8
        [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1], //9
        [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0], //10
        [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], //11
        [0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], //12
    ],
};

const vertexPositions = (level) => {
    // Adjust positions based on level's graph size
    switch (level) {
        case "easy":
            return [
                { x: 200, y: 100 },
                { x: 400, y: 100 },
                { x: 200, y: 300 },
                { x: 400, y: 300 },
                { x: 500, y: 200 },
                { x: 300, y: 200 },
                { x: 300, y: 400 },
            ];
        case "medium":
            return [
                { x: 150, y: 100 }, //0
                { x: 350, y: 100 }, //1
                { x: 150, y: 350 }, //2
                { x: 350, y: 350 }, //3
                { x: 250, y: 350 }, //4
                { x: 200, y: 170 }, //5
                { x: 295, y: 280 }, //6
                { x: 450, y: 225 }, //7
                { x: 550, y: 225 }, //8
            ];
        case "hard":
            return [
                { x: 150, y: 80 }, //0
                { x: 350, y: 80 }, //1
                { x: 150, y: 280 }, //2
                { x: 350, y: 280 }, //3
                { x: 350, y: 180 }, //4
                { x: 150, y: 180 }, //5
                { x: 450, y: 130 }, //6
                { x: 450, y: 230 }, //7
                { x: 250, y: 380 }, //8
                { x: 550, y: 380 }, //9
            ];
        case "hardcore":
            return [
                { x: 120, y: 90 }, //0
                { x: 320, y: 90 }, //1
                { x: 170, y: 290 }, //2
                { x: 320, y: 290 }, //3
                { x: 420, y: 90 }, //4
                { x: 420, y: 290 }, //5
                { x: 520, y: 190 }, //6
                { x: 245, y: 440 }, //7
                { x: 470, y: 440 }, //8
                { x: 520, y: 70 }, //9
                { x: 190, y: 160 }, //10
            ];
        case "nightmare":
            return [
                { x: 100, y: 100 }, //0
                { x: 250, y: 50 }, //1
                { x: 100, y: 300 }, //2
                { x: 450, y: 350 }, //3
                { x: 250, y: 400 }, //4
                { x: 400, y: 100 }, //5
                { x: 500, y: 200 }, //6
                { x: 600, y: 400 }, //7
                { x: 480, y: 400 }, //8
                { x: 250, y: 210 }, //9
                { x: 400, y: 470 }, //10
                { x: 600, y: 270 }, //11
                { x: 100, y: 400 }, //11
            ];
        default:
            return [];
    }
};

const Graph = () => {
    const [level, setLevel] = useState("easy");
    const [graph, setGraph] = useState(graphMaps[level]);
    const [colors, setColors] = useState(Array(graph.length).fill(null));
    const [result, setResult] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [hintsClicked, setHintsClicked] = useState(0);
    const [answerClicked, setAnswerClicked] = useState(0);
    const minColors = calculateMinColors(graph);

    const handleReset = () => {
        let nullColors = 0;
        setColors(Array(graph.length).fill(null));
        colors.forEach(color =>{
            if(color === null || color === 'white') nullColors +=1;
        });

        if(nullColors === graph.length){
            setResult("The board is already cleared!");
        }
        else{
            setResult("The board is cleared, Let the game begin!");
        }
    };

    const handleLevelChange = (newLevel) => {
        setAnswerClicked(0);//Remove the auto answer if player choose new level
        setHintsClicked(0);//Reset hints clicked
        setLevel(newLevel);
        const newGraph = graphMaps[newLevel];
        setGraph(newGraph);
        setColors(Array(newGraph.length).fill(null)); // Reset based on new graph length
        setResult("");
    };

    const handleColorChange = (index) => {
        if (!selectedColor) {
            alert("Please select a color first!"); // Alert user to select a color
            return;
        }
        const newColors = [...colors];
        newColors[index] = selectedColor;
        setColors(newColors);
    };


    const handleSubmit = () => {
        const {hasUncoloredVertices, totalColorUsed } = processColors(colors);
    
        // Check if the player used more than the allowed number of colors
        if (totalColorUsed > calculateMinColors(graph)) {
            setResult(`You can only use ${calculateMinColors(graph)} colors maximum on this level.`);
            return;
        }
    
        // Check if the player didn't color all vertices
        if (hasUncoloredVertices) {
            setResult('Please fill in all the vertices with color.');
            return;
        }
    
        // Check if the player colored the graph correctly
        if (isValidColoring(graph, colors)) {
            setResult('Correct! You colored the graph properly.');
            return;
        }
    
        // If none of the above, coloring is incorrect
        setResult('Wrong! Adjacent vertices share the same color.');
    };
    
    // Helper function to process the colors
    const processColors = (colors) => {
        let hasUncoloredVertices = false; // Flag to track if any vertex is uncolored
        let uniqueColors = [];   // Array to store unique colors
        let totalColorUsed = 0;  // Counter for the number of valid colors used
    
        colors.forEach((color) => {
            if (color === null || color === 'white') {
                hasUncoloredVertices = true; // Found an uncolored vertex
            }
    
            if (color !== null && !uniqueColors.includes(color)) {
                uniqueColors.push(color); // Add the unique color to the array
                totalColorUsed += (color !== 'white') ? 1 : 0; // Only count non-white colors
            }
        });
    
        return {hasUncoloredVertices, totalColorUsed};
    };
    

    const autoAnswer = () => {
        handleAnswerClicks();//Reset after use
        const autoColors = Array(graph.length).fill(null);
        if (colorGraph(autoColors, 0)) {
            setColors(autoColors);
            setResult("This is just one of many possible answers.");
        } else {
            setResult("No valid coloring found.");
        }
    };

    const handleHints = () => {
        // Check if hints should be reset
        if (hintsClicked === 2) {
            handleAnswerClicks();
        }
    
        // Process conflicts and color usage
        const { conflicts, allNull, totalColorUsed } = processColorsAndConflicts();
    
        // Display the result based on the conditions
        setResultMessage(conflicts, allNull, totalColorUsed);
    };
    
    // Helper function to process color conflicts and color usage
    const processColorsAndConflicts = () => {
        let conflicts = new Set(); // To store vertices that have color conflicts (edges with same color)
        let allNull = 0;  // Counter to track how many vertices are not yet colored (i.e., color is null or "white")
        let totalColorUsed = 0;  // To count how many distinct colors are used in the graph
        let uniqueColors = []; // Array to keep track of unique colors used in the coloring

        // Loop through each vertex in the graph to check for color conflicts and count uncolored vertices
        for (let i = 0; i < graph.length; i++) {
            // If the current vertex is uncolored (either "white" or null), increment the allNull counter
            if (colors[i] === "white" || colors[i] === null) allNull += 1;

            // Check for conflicts with other vertices that are connected (i.e., have an edge between them)
            for (let j = i + 1; j < graph.length; j++) {
                // Check if there is an edge between vertex `i` and vertex `j`
                // and if both vertices have the same color (and neither of them is uncolored)
                if (
                    graph[i][j] === 1 &&  // There is an edge between vertex `i` and vertex `j`
                    colors[i] === colors[j] &&  // Both vertices have the same color
                    colors[i] !== null && colors[i] !== "white"  // Both vertices are colored (not null or "white")
                ) {
                    conflicts.add(i); // Add vertex `i` to the conflicts set
                    conflicts.add(j); // Add vertex `j` to the conflicts set
                }
            }
        }

        // Iterate through the colors array to count how many distinct colors are used
        colors.forEach((color) => {
            // Check if the color is not null or "white" and if it hasn't been counted already
            if (color !== null && color !== 'white' && !uniqueColors.includes(color)) {
                uniqueColors.push(color); // Add the color to the list of unique colors
                totalColorUsed += 1;  // Increment the counter for the total number of colors used
            }
        });

        // Return an object containing the processed data
        return {conflicts, allNull, totalColorUsed};
    };

    
    // Helper function to set the result message based on conditions
    const setResultMessage = (conflicts, allNull, totalColorUsed) => {
        // Check if no vertices have been colored yet
        if (allNull === graph.length) {
            setResult(`You haven't started yet.`);
        }
        // Check if there are conflicts in the coloring
        else if (conflicts.size > 0) {
            let conflictingVertices = Array.from(conflicts).sort();
            setResult(`You have a mistake at vertices: ${conflictingVertices.join(", ")}`);
            handleHintsClicks();
        }
        // Check if the player has exceeded the maximum number of colors
        else if (totalColorUsed > calculateMinColors(graph)) {
            setResult(
                `You have used ${totalColorUsed} colors, exceeding the maximum limit of ${calculateMinColors(graph)} colors.`
            );
            handleHintsClicks();
        }
        // Otherwise, the coloring is correct
        else {
            setResult(`You are on the right track!`);
        }
    };
    

    const colorGraph = (autoColors, vertexIndex) => {
        // Base case: If all vertices are processed, the graph is successfully colored.
        if (vertexIndex === graph.length) {
            return true;
        }

        for (let color of colorsPalette) {  // Iterate over each color in the color palette
            // Check if it's safe to assign the current color to vertex `vertexIndex`
            // The isSafe function will ensure no adjacent vertex has the same color
            if (isSafe(autoColors, graph, vertexIndex, color)) {
                
                autoColors[vertexIndex] = color;  // Assign the current color to the current vertex
        
                // Recursively try to color the next vertex (vertexIndex + 1)
                if (colorGraph(autoColors, vertexIndex + 1)) {
                    return true;  // If successfully colored the next vertex, return true (successful solution)
                }
        
                // Backtrack: If coloring the next vertex fails, undo the color assignment for the current vertex
                autoColors[vertexIndex] = null;
            }
        }

        // If no color can be assigned to the current vertex that leads to a solution, return false.
        return false;
    };

    const isSafe = (autoColors, graph, vertexIndex, color) => {
        // Iterate over all vertices to check if any adjacent vertex has the same color
        for (let j = 0; j < graph.length; j++) {
            // If vertex `j` is adjacent to vertex `vertexIndex` and already has the same color
            // (graph[vertexIndex][j] === 1 indicates adjacency between vertexIndex and vertex j)
            // and the color of vertex j is the same as the color we want to assign to vertexIndex,
            // then it's not safe to assign this color to vertex `vertexIndex`.
            if (graph[vertexIndex][j] === 1 && autoColors[j] === color) {
                return false; // Return false since assigning this color would violate the graph coloring rule.
            }
        }
        // If no adjacent vertex has the same color, it is safe to assign the color.
        return true;
    };


    const handleHintsClicks = () => {
        if(hintsClicked < 2){
            setHintsClicked((prev) => prev + 1); // Increment the hintsClicked counter
        }else{
            setHintsClicked((prev) => 0);// Reset it to 0
        }
    };

    const handleAnswerClicks = () => {
        //If the Auto answer was clicked call colorGraph function 
        //reset answerClicked to 0
        //So the answer button will disappear after the player use it
        setAnswerClicked((prev) => (prev === 0 ? 1 : 0));
    };

    // Set SVG size based on graph size
    const svgSize = 0;
    return (
        <div className="graph-container">
            <Link to="/">
                <button className="back-button">Back</button>
            </Link>

            <div className="level-buttons">
                {["easy", "medium", "hard", "hardcore", "nightmare"].map(
                    (lvl) => (
                        <button
                            key={lvl}
                            onClick={() => handleLevelChange(lvl)}
                            className={lvl === level ? "active" : ""}
                        >
                            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                        </button>
                    )
                )}
            </div>
            <p className="color-hint">
                {minColors + 1 === colorsPalette.length
                    ? `Feel free to explore and play with all color available at your fingertips!`
                    : `You can use no more than ${minColors} colors for this level.`}
            </p>

            <div className="color-palette">
                {colorsPalette.map((color) => (
                    <div
                        key={color || "clear"}
                        className={`color-swatch ${
                            selectedColor === color ? "selected" : ""
                        }`}
                        style={{
                            backgroundColor: color ? color : "white",
                            position: "relative",
                        }}
                        onClick={() => setSelectedColor(color || "white")}
                    >
                        {!color && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "#000",
                                    fontWeight: "bold",
                                    userSelect: "none",
                                    pointerEvents: "none",
                                }}
                            >
                                X
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="action-buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleHints}>Hint</button>
                <button onClick={handleReset}>Reset</button>
                {answerClicked ? (
                    <button onClick={autoAnswer}>Answer</button>
                ) : (
                    ""
                )}
            </div>

            {result && <h3>{result}</h3>}

            {/* Adjusting SVG size dynamically */}
            <svg
                width={svgSize}
                height={svgSize}
                style={{ border: "1px solid black" }}
            >
                {graph.map((edges, i) =>
                    edges.map(
                        (edge, j) =>
                            edge === 1 && (
                                <line
                                    key={`${i}-${j}`}
                                    x1={vertexPositions(level)[i].x}
                                    y1={vertexPositions(level)[i].y}
                                    x2={vertexPositions(level)[j].x}
                                    y2={vertexPositions(level)[j].y}
                                    stroke="black"
                                />
                            )
                    )
                )}
                {vertexPositions(level).map((pos, index) => (
                    <g key={index}>
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="20"
                            fill={colors[index] || "white"}
                            stroke="black"
                            onClick={() => handleColorChange(index)}
                        >
                            <title>Vertex {index}</title>
                        </circle>
                        <text
                            x={pos.x}
                            y={pos.y}
                            fill="black"
                            fontSize="12"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            pointerEvents="none"
                            style={{ userSelect: "none" }}
                        >
                            {index} {/* or any text you want */}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

const calculateMinColors = (graph) => {
    const n = graph.length;
    const colors = Array(n).fill(-1);
    colors[0] = 0;

    const availableColors = new Array(n).fill(true);

    for (let i = 1; i < n; i++) {
        availableColors.fill(true);

        for (let j = 0; j < n; j++) {
            if (graph[i][j] === 1 && colors[j] !== -1) {
                availableColors[colors[j]] = false;
            }
        }

        let color;
        for (color = 0; color < n; color++) {
            if (availableColors[color]) {
                break;
            }
        }

        colors[i] = color;
    }

    return Math.max(...colors) + 1;
};

const isValidColoring = (graph, colors) => {
    for (let i = 0; i < graph.length; i++) {
        for (let j = i + 1; j < graph.length; j++) {
            // Start from i+1 to avoid redundant checks
            if (graph[i][j] === 1 && colors[i] === colors[j]) {
                return false; // Found a conflict
            }
        }
    }

    return true; // No conflicts found
};

export default Graph;
