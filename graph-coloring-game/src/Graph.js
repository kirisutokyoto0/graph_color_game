import React, { useState } from "react";
import "./Graph.css";

const colorsPalette = ["red", "blue", "green", "yellow", "orange", "purple", null];

// Graph maps for each level
const graphMaps = {
    easy: [
        [0, 1, 1, 0, 0, 1, 1],//0
        [1, 0, 0, 1, 1, 1, 1],//1
        [1, 0, 0, 1, 0, 1, 1],//2
        [0, 1, 1, 0, 1, 1, 1],//3
        [0, 1, 0, 1, 0, 0, 0],//4
        [1, 1, 1, 1, 0, 0, 1],//5
        [1, 1, 1, 1, 0, 1, 0],//6
    ],
    medium: [
        //[0, 0, 0, 0, 0, 0, 0, 0], //6
        [0, 1, 1, 0, 0, 0, 0, 0], //0
        [1, 0, 1, 1, 0, 0, 0, 0], //1
        [1, 1, 0, 0, 1, 1, 1, 0], //2
        [0, 1, 0, 0, 1, 0, 1, 0], //3
        [0, 0, 1, 1, 0, 1, 0, 0], //4
        [0, 0, 1, 0, 1, 0, 1, 1], //5
        [0, 0, 1, 1, 0, 1, 0, 1], //6
        [0, 0, 0, 0, 0, 1, 1, 0], //7
    ],
    hard: [
        [0, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [0, 0, 1, 0, 1, 0],
    ],
    hardcore: [
        [0, 1, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0],
        [1, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 0],
    ],
    nightmare: [
        //0  1  2  3  4  5  6  7  8  9  10 11
        [0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0], //0
        [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0], //1
        [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0], //2
        [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1], //3
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0], //4
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0], //5
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1], //6
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1], //7
        [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1], //8
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0], //9
        [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0], //10
        [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0], //11
    ],
};

const vertexPositions = (level) => {
    // Adjust positions based on level's graph size
    switch (level) {
        case "easy":
            return [
                { x: 100, y: 100 },
                { x: 300, y: 100 },
                { x: 100, y: 300 },
                { x: 300, y: 300 },
                { x: 400, y: 200 },
                { x: 200, y: 200 },
                { x: 200, y: 400 },
            ];
        case "medium":
            return [
                { x: 100, y: 100 }, //0
                { x: 300, y: 100 }, //1
                { x: 100, y: 350 }, //2
                { x: 300, y: 350 }, //3
                { x: 200, y: 350 }, //4
                { x: 150, y: 170 }, //5
                { x: 245, y: 280 }, //6
                { x: 400, y: 225 }, //7
            ];
        case "hard":
            return [
                { x: 100, y: 100 },
                { x: 300, y: 100 },
                { x: 100, y: 300 },
                { x: 300, y: 300 },
                { x: 300, y: 200 },
                { x: 100, y: 200 },
            ];
        case "hardcore":
            return [
                { x: 150, y: 100 },
                { x: 300, y: 100 },
                { x: 150, y: 300 },
                { x: 300, y: 300 },
                { x: 400, y: 100 },
                { x: 400, y: 300 },
                { x: 500, y: 200 },
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
                { x: 500, y: 400 }, //8
                { x: 250, y: 210 }, //9
                { x: 400, y: 470 }, //10
                { x: 600, y: 270 }, //11
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
    const minColors = calculateMinColors(graph);

    const handleReset = () => {
        setColors(Array(graph.length).fill(null));
        setResult("");
    };

    const handleLevelChange = (newLevel) => {
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
        //Check if the player uses only the minimum number of color
        let colorisNULL = false;
        let totalColorUsed = 0;
        let uniqueColors = [];

        colors.forEach((color) => {
            if (color === null) colorisNULL = true;
            if (color !== null && !uniqueColors.includes(color)) {``
                uniqueColors.push(color);
                totalColorUsed += 1;
            }
        });
        //If the player only uses the minimum number of colors
        if (totalColorUsed > calculateMinColors(graph)) {
            setResult(`Please use only ${calculateMinColors(graph)} colors`);
        } else if (colorisNULL) {
            //if the player didn't color all the vertices
            setResult(`Please fill in all the vertices with color.`);
        } else if (isValidColoring(graph, colors)) {
            //is the player did correctly colored all the vertices
            setResult("Correct! You colored the graph properly.");
        } else {
            setResult(
                `Wrong! Adjacent vertices 
                  share the same color was found.`
            );
        }
    };

    const autoAnswer = () => {
        const autoColors = Array(graph.length).fill(null);
        if (colorGraph(autoColors, 0)) {
            setColors(autoColors);
            setResult("The graph has been auto-colored!");
        } else {
            setResult("No valid coloring found.");
        }
    };

    const colorGraph = (autoColors, vertexIndex) => {
        if (vertexIndex === graph.length) {
            return true;
        }

        for (let color of colorsPalette) {
            if (isSafe(autoColors, graph, vertexIndex, color)) {
                autoColors[vertexIndex] = color;

                if (colorGraph(autoColors, vertexIndex + 1)) {
                    return true;
                }

                autoColors[vertexIndex] = null;
            }
        }

        return false;
    };

    const isSafe = (autoColors, graph, vertexIndex, color) => {
        for (let j = 0; j < graph.length; j++) {
            if (graph[vertexIndex][j] === 1 && autoColors[j] === color) {
                return false;
            }
        }
        return true;
    };

    // Set SVG size based on graph size
    const svgSize = 0;

    return (
        <div className="graph-container">
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
            <p>Use [{minColors}] color's only</p>

            <div className="color-palette">
                {colorsPalette.map((color) => (
                <div
                    key={color || 'clear'}
                    className="color-swatch"
                    style={{ backgroundColor: color ? color : 'white', position: 'relative' }}
                    onClick={() => setSelectedColor(color || 'white')}
                >
                    {!color && (
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#000',
                            fontWeight: 'bold'
                        }}>
                            X
                        </span>
                    )}
                </div>

                ))}
            </div>

            <div className="action-buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={autoAnswer}>Answer</button>
                <button onClick={handleReset}>Reset</button>
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
                            fill="black" // You can change the color as needed
                            fontSize="12" // Adjust the font size as needed
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
