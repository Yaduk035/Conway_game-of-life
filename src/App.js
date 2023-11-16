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

  const RowLength = colwidth - colwidth / 2;
  const ColLength = colwidth;
  const resolution = 1000;
  const cellSize = resolution / ColLength;
  const [running, setRunning] = useState(false);
  const runSpeed = 1000;
  const [speed, setSpeed] = useState(410);

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
            Math.floor(Math.random() * 10) > 6 ? 1 : 0
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

  const speedControl = (value) => {
    setSpeed(value);
  };

  const cellWidthControl = (value) => {
    setColwidth(value);
  };

  return (
    <>
      <Header />
      <Container>
        <br />
        <br />
        <br />
        <ControlPanel
          speedControl={speedControl}
          speed={speed}
          cellWidth={setColwidth}
          running={running}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setRunning((prev) => !prev);
            if (!running) {
              runningRef.current = true;
              simulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </Button>
        <Button variant="outlined" onClick={randomize}>
          Randomize
        </Button>
        <Button variant="outlined" onClick={clearGrid}>
          Clear
        </Button>
        <Button variant="outlined" onClick={populateGrid}>
          Populate
        </Button>
        <div>
          <label>Speed</label>
          <input
            onChange={(e) => setSpeed(e.target.value)}
            type="number"
            value={speed}
            name=""
            id=""
          />
          <p>{speed}</p>
        </div>
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${ColLength},${cellSize}px)`,
            justifyContent: "center",
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  width: cellSize,
                  height: cellSize,
                  border: "1px solid grey",
                  borderRadius: "4px",
                  backgroundColor: grid[i][j] ? "black" : undefined,
                  cursor: "pointer",
                  boxShadow: "0 0.35em 0.7em rgba(17,17, 17, 0.5)",
                }}
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
    </>
  );
}

export default App;
