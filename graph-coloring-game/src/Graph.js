import React, { useState } from "react";
import "./Graph.css";

const colorsPalette = ["red", "blue", "green", "yellow", "orange", "purple"];

// Graph maps for each level
const graphMaps = {
    easy: [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0],
    ],
    medium: [
        [0, 1, 1, 0, 0],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 1, 0],
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
        [0, 1, 1, 0, 1, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 0, 1, 1, 0, 0, 1, 0],
    ],
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
        //const uniqueColors = new Set(colors.filter((color) => color !== null));

        if (isValidColoring(graph, colors)) {
            setResult("Correct! You colored the graph properly.");
        } else {
            //const conflicts = findConflicts(graph, colors);

            setResult(
                `Incorrect! Adjacent vertices that share the same color were found.`
            );
        }
    };
    //For hints--- Don't delete
    const findConflicts = (graph, colors) => {
        const conflicts = [];
        for (let i = 0; i < graph.length; i++) {
            for (let j = 0; j < graph.length; j++) {
                if (graph[i][j] === 1 && colors[i] === colors[j]) {
                    conflicts.push(`(${i}, ${j})`); // Collect conflicting vertex pairs
                }
            }
        }
        return conflicts;
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
    const svgSize = 100 + graph.length * 80; // 80px per vertex for padding

    return (
        <div className="graph-container">
            <h2>Minimum Colors Needed: {minColors}</h2>

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

            <div className="color-palette">
                {colorsPalette.map((color) => (
                    <div
                        key={color}
                        className={`color-swatch ${
                            selectedColor === color ? "selected" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                    />
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
        for (let j = 0; j < graph.length; j++) {
            if (graph[i][j] === 1 && colors[i] === colors[j]) {
                return false; // Found a conflict
            }
        }
    }
    return true; // No conflicts found
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
            ];
        case "medium":
            return [
                { x: 100, y: 100 },
                { x: 300, y: 100 },
                { x: 100, y: 350 },
                { x: 300, y: 350 },
                { x: 200, y: 350 },
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
                { x: 50, y: 100 - 50 }, //0
                { x: 200, y: 25 }, //1
                { x: 100, y: 300 - 50 }, //2
                { x: 400, y: 350 - 50 }, //3
                { x: 200, y: 400 - 50 }, //4
                { x: 350, y: 100 - 50 }, //5
                { x: 450, y: 150 - 50 }, //6
                { x: 500, y: 400 - 50 }, //7
                { x: 600, y: 380 - 50 }, //8
                { x: 350, y: 500 - 50 }, //9
                { x: 200, y: 500 - 50 }, //10
            ];
        default:
            return [];
    }
};

export default Graph;
