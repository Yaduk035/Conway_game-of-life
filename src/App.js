import React, { useCallback, useRef, useState, useEffect } from "react";
import { produce } from "immer";
import { Button, Container } from "@mui/material";
import ControlPanel from "./components/ControlPanel";
import InputSlider from "./components/SpeedSlider";
import "./components/homepage.css";
import Header from "./components/Header";

const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const defaultColWidth = 30;
function App() {
  const [colwidth, setColwidth] = useState(30);
  const [hovered, setHovered] = useState(false);
  const [nightmode, setNightmode] = useState(false);

  const RowLength = colwidth - colwidth / 2;
  const ColLength = colwidth;
  const resolution = 1000;
  const cellSize = resolution / ColLength;
  const [running, setRunning] = useState(false);
  const runSpeed = 1000;
  const [speed, setSpeed] = useState(410);
  const [ranValue, setRanValue] = useState(6);

  // console.log(running);

  const [grid, setGrid] = useState(() => {
    const rows = [];

    for (let i = 0; i < RowLength; i++) {
      rows.push(Array.from(Array(ColLength), () => 0));
    }
    return rows;
  });
  // console.log(grid);

  useEffect(() => {
    setGrid(() => {
      const rows = [];
      for (let i = 0; i < RowLength; i++) {
        rows.push(Array.from(Array(ColLength), () => 0));
      }
      return rows;
    });
  }, [RowLength, ColLength, cellSize]);

  const runningRef = useRef(running);
  runningRef.current = running;

  const simulation = () => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < RowLength; i++) {
          for (let j = 0; j < ColLength; j++) {
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (
                newI >= 0 &&
                newI < RowLength &&
                newJ >= 0 &&
                newJ < ColLength
              ) {
                neighbours += g[newI][newJ];
              }
            });
            if (neighbours < 2 || neighbours > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbours === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    //  setTimeout(simulation, speed);
  };

  useEffect(() => {
    if (running) {
      const intervalId = setInterval(() => {
        simulation();
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [running, simulation, speed]);

  const randomize = () => {
    setGrid(() => {
      const rows = [];

      for (let i = 0; i < RowLength; i++) {
        rows.push(
          Array.from(Array(ColLength), () =>
            ranValue === 1
              ? 1
              : Math.floor(Math.random() * 10) >= ranValue
              ? 1
              : 0
          )
        );
      }
      return rows;
    });
  };
  const clearGrid = () => {
    setGrid(() => {
      const rows = [];

      for (let i = 0; i < RowLength; i++) {
        rows.push(Array.from(Array(ColLength), () => 0));
      }
      return rows;
    });
  };
  const populateGrid = () => {
    setGrid(() => {
      const rows = [];

      for (let i = 0; i < RowLength; i++) {
        rows.push(Array.from(Array(ColLength), () => 1));
      }
      return rows;
    });
  };

  const startButton = () => {
    setRunning((prev) => !prev);
    if (!running) {
      runningRef.current = true;
      simulation();
    }
  };

  const speedControl = (value) => {
    setSpeed(value);
  };

  const cellWidthControl = (value) => {
    setColwidth(value);
  };

  const toggleNightmode = (value) => {
    setNightmode(value);
  };

  const setRandomizevalue = (value) => {
    setRanValue(value);
  };
  console.log(ranValue);

  return (
    <>
      <div className={!nightmode ? "light-mode" : "night-mode"}>
        <Header nightmode={toggleNightmode} currentmode={nightmode} />
        <Container>
          <br />
          <br />
          <div
            className="controls-div"
            style={{
              boxShadow: nightmode
                ? "0 5px 25px rgba(150,150,150,0.5)"
                : "0 10px 25px rgba(0,0,0,0.5)",

              backgroundColor: "transparent",
              // backgroundImage: nightmode
              //   ? "linear-gradient(rgb(58, 5, 5), rgb(70, 69, 69)"
              //   : "linear-gradient(rgb(250, 196, 196), rgb(226, 161, 161)",
            }}
          >
            <ControlPanel
              speedControl={speedControl}
              speed={speed}
              cellWidth={setColwidth}
              running={running}
              currentmode={nightmode}
              ranValue={setRandomizevalue}
              randomizeButton={randomize}
              clearGrid={clearGrid}
              startButton={startButton}
            />
          </div>
          <br />
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${ColLength},${cellSize + 2}px)`,
              // backgroundImage: nightmode
              //   ? "linear-gradient(rgb(32, 50, 68), rgb(68, 63, 63)"
              //   : "linear-gradient(rgb(199, 189, 189), white)",
            }}
          >
            {grid.map((rows, i) =>
              rows.map((col, j) => (
                <div
                  key={`${i}-${j}`}
                  className="cell"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    // border: nightmode ? "1px solid wheat" : "1px solid gray",
                    backgroundColor: grid[i][j]
                      ? !nightmode
                        ? "rgba(17, 17, 17, 0.9)"
                        : "rgba(200, 200, 200, 0.9)"
                      : undefined,
                    transform: grid[i][j] ? "scale(1.1)" : "scale(0.95)",
                    zIndex: grid[i][j] ? 2 : 1,
                    transition:
                      grid[i][j] && speed < 100
                        ? "all 0.000001s"
                        : grid[i][j]
                        ? "all 0.09s"
                        : "all 0s",
                    // cursor: "pointer",
                    // boxShadow: "0 0.35em 0.7em rgba(17,17, 17, 0.5)",
                  }}
                  // onMouseEnter={() => setHovered(true)}
                  // onMouseLeave={() => setHovered(false)}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      gridCopy[i][j] = grid[i][j] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                />
              ))
            )}
          </div>
        </Container>
        <br />
        <br />
      </div>
    </>
  );
}

export default App;
