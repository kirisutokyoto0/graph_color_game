import React from "react";
import { Link } from "react-router-dom";
import "./Help.css";

function Help() {
    return (
        <div className="how-to-play-container">
            <Link to="/">
                <button className="back-button">Back</button>
                <br />
            </Link>
            <hr className="top" />

            <div className="context">
                <p className="help-title">
                    🎨 How to Play: The Graph Coloring Game 🧩
                </p>
                <p className="intro-text">
                    Welcome to Graph Coloring – a game that tests your strategic
                    thinking, creativity, and problem-solving skills. In this
                    game, you’ll need to color the vertices of a graph using a
                    limited number of colors. The challenge? No two adjacent
                    vertices can have the same color. Are you up for it?
                </p>
                <hr />

                <p className="section-title">📜 Game Objective:</p>
                <p className="section-content">
                    Your mission is simple: Color all the vertices of the graph,
                    but with a twist! You are only allowed to use a specific
                    number of colors. Make sure no two adjacent vertices share
                    the same color. It’s all about finding the perfect
                    combination with the limited colors you have!
                </p>
                <hr />

                <p className="section-title">🎮 How to Play:</p>
                <ol className="instructions-list">
                    <li>
                        <strong>Start the Game:</strong>
                        <ul>
                            <li>
                                The game will display a graph with vertices
                                (points) and edges (connections between the
                                points).
                            </li>
                            <li>
                                Your task is to assign colors to the vertices,
                                but there's a catch: you can only use a set
                                number of colors (e.g., 3 colors, 4 colors,
                                etc.).
                            </li>
                            <li>
                                The total number of colors you can use is shown
                                at the start of each level. Pay close attention
                                to the number of colors you have available!
                            </li>
                        </ul>
                    </li>

                    <li>
                        <strong>Pick a Color:</strong>
                        <ul>
                            <li>
                                A color palette will appear on the screen, and
                                you can choose from the available colors. The
                                number of colors you can use is limited, so
                                think carefully!
                            </li>
                            <li>
                                Pick a color first, then move on to coloring the
                                vertices.
                            </li>
                        </ul>
                    </li>

                    <li>
                        <strong>Color the Vertices:</strong>
                        <ul>
                            <li>
                                After selecting a color from the palette, click
                                on a vertex (node) you want to color.
                            </li>
                            <li>
                                No two connected vertices (vertices with an edge
                                between them) can share the same color. If you
                                color a vertex with the same color as a
                                neighboring vertex, you'll create a conflict.
                                The game will not alert you, so it's up to you
                                to carefully avoid conflicts as you color the
                                graph.
                            </li>
                        </ul>
                    </li>

                    <li>
                        <strong>Check for Conflicts:</strong>
                        <ul>
                            <li>
                                As you color the graph, keep a sharp eye on the
                                adjacent vertices. If you accidentally color two
                                connected vertices the same, you’ll have to go
                                back and change one of the colors.
                            </li>
                            <li>
                                The key is to make sure that no two adjacent
                                vertices share the same color — it’s a game of
                                logic and foresight!
                            </li>
                        </ul>
                    </li>

                    <li>
                        <strong>Complete the Graph:</strong>
                        <ul>
                            <li>
                                Continue coloring the vertices while keeping an
                                eye on the available colors and avoiding
                                conflicts. Make sure all adjacent vertices have
                                different colors!
                            </li>
                            <li>
                                If you successfully color all the vertices with
                                no conflicts and within the given number of
                                colors, you complete the level. 🎉
                            </li>
                        </ul>
                    </li>
                </ol>
                <hr />
                <p className="section-title">⚡ Tips for Success:</p>
                <ul className="tips">
                    <li>
                        <strong>
                            Start with the most connected vertices:{" "}
                        </strong>
                        Look for the vertices that have the most edges
                        (connections). These vertices are the most restricted in
                        terms of colors and should be colored first to help you
                        avoid conflicts later.
                    </li>
                    <li>
                        <strong> Use the fewest colors possible: </strong>
                        The fewer colors you use, the more challenging the
                        puzzle becomes. Can you color the graph with just 2 or 3
                        colors? The fewer colors you use, the better you’ll get
                        at spotting patterns!
                    </li>

                    <li>
                        <strong>Think ahead: </strong>
                        Always think a few moves ahead. Before coloring a
                        vertex, check its neighbors. Plan how you’ll distribute
                        the colors across the entire graph to avoid running into
                        problems later.
                    </li>

                    <li>
                        <strong>Undo and retry: </strong>
                        If you get stuck, don’t hesitate to undo a move and try
                        a different strategy. Every mistake is a chance to
                        learn!
                    </li>

                    <li>
                        <strong>Keep an eye on the color count: </strong>
                        You only have a certain number of colors to work with.
                        Be mindful of how many colors you've already used, and
                        think carefully before using your last remaining color.
                    </li>
                </ul>
                <hr />
                <p className="section-title">🏁 Level Up!</p>
                <p className="section-content">
                    As you progress through the game, the graphs will become
                    more complex, and the number of vertices and edges will
                    increase. You'll need to think smarter and use your colors
                    wisely. The levels get tougher – but can you rise to the
                    challenge? 🔥
                </p>

                <hr />
                <p className="section-title">🎉 Ready to Start?</p>
                <p className="section-content">
                    The clock is ticking, and the challenge awaits! Dive in and
                    show your coloring skills. Can you conquer each level using
                    only the given number of colors, or will the graph outsmart
                    you?
                </p>
                <hr></hr>
                <p className="section-title">
                    Good luck, and most importantly – have fun! 🧠🎨
                </p>
            </div>
        </div>
    );
}

export default Help;
