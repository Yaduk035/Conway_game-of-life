import React, { useEffect, useRef } from "react";

const GameOfLife = () => {
  const canvasRef = useRef(null);
  const resolution = 10;
  const COLS = 80; // 800 / 10
  const ROWS = 80; // 800 / 10

  const buildGrid = () => {
    return new Array(COLS)
      .fill(null)
      .map(() =>
        new Array(ROWS).fill(null).map(() => Math.floor(Math.random() * 2))
      );
  };

  let grid = buildGrid();

  const nextGen = (grid) => {
    const nextGen = grid.map((arr) => [...arr]);

    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
        let numNeighbours = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            const x_cell = col + i;
            const y_cell = row + j;

            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
              const currentNeighbour = grid[col + i][row + j];
              numNeighbours += currentNeighbour;
            }
          }
        }

        // rules
        if (cell === 1 && numNeighbours < 2) {
          nextGen[col][row] = 0;
        } else if (cell === 1 && numNeighbours > 3) {
          nextGen[col][row] = 0;
        } else if (cell === 0 && numNeighbours === 3) {
          nextGen[col][row] = 1;
        }
      }
    }
    return nextGen;
  };

  const renderGrid = (grid, ctx) => {
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];

        ctx.beginPath();
        ctx.rect(col * resolution, row * resolution, resolution, resolution);
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = COLS * resolution;
    canvas.height = ROWS * resolution;

    const update = () => {
      grid = nextGen(grid);
      renderGrid(grid, ctx);
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    return () => cancelAnimationFrame(update);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default GameOfLife;
