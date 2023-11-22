import React, { useRef, useState, useEffect } from "react";
import { produce } from "immer";
import { Container } from "@mui/material";
import ControlPanel from "./components/ControlPanel";
import "./components/homepage.css";
import Header from "./components/Header";
import { borders } from "./components/Patterns";

function App() {
  const [colwidth, setColwidth] = useState(30);
  const [nightmode, setNightmode] = useState(false);

  const RowLength = colwidth - colwidth / 2;
  const ColLength = colwidth;
  const resolution = 1100;
  const cellSize = resolution / ColLength;
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(410);
  const [ranValue, setRanValue] = useState(6);

  // console.log("cellsize: ", cellSize);

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
            borders.forEach(([x, y]) => {
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
  const drawPatterns = (value) => {
    cellWidthControl(50);
    clearGrid();
    setTimeout(() => {
      setGrid((g) => {
        return produce(g, (draw) => {
          value.forEach(([x, y]) => {
            draw[x][y] = 1;
          });
        });
      });
    }, [500]);
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

  function cellWidthControl(value) {
    setColwidth(value);
  }

  const toggleNightmode = (value) => {
    setNightmode(value);
  };

  const setRandomizevalue = (value) => {
    setRanValue(value);
  };
  return (
    <>
      <div className={!nightmode ? "light-mode" : "night-mode"}>
        <Header nightmode={toggleNightmode} currentmode={nightmode} />
        <Container maxWidth="xl">
          <br />
          <br />
          <div
            className="controls-div"
            style={{
              boxShadow: nightmode
                ? "0 5px 25px rgba(150,150,150,0.5)"
                : "0 10px 25px rgba(0,0,0,0.5)",

              backgroundColor: "transparent",
              textAlign: "center",
            }}
          >
            <ControlPanel
              speedControl={speedControl}
              speed={speed}
              cellWidth={cellWidthControl}
              running={running}
              currentmode={nightmode}
              ranValue={setRandomizevalue}
              randomizeButton={randomize}
              clearGrid={clearGrid}
              startButton={startButton}
              currentWidth={colwidth}
              drawPatterns={drawPatterns}
            />
          </div>
          <br />
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${ColLength},${cellSize + 2}px)`,
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
                    backgroundColor: grid[i][j]
                      ? !nightmode
                        ? "rgba(17, 17, 17, 0.9)"
                        : "rgba(200, 200, 200, 0.9)"
                      : undefined,
                    transform: grid[i][j] ? "scale(1.1)" : "scale(0.95)",
                    zIndex: grid[i][j] ? 2 : 1,
                    transition:
                      grid[i][j] && speed < 100
                        ? ""
                        : grid[i][j]
                        ? "all 0.09s"
                        : "all 0s",
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
        <br /> <br />
        <br /> <br />
      </div>
    </>
  );
}

export default App;
