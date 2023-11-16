import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid, Typography } from "@mui/material";
import { Grid3x3 } from "@mui/icons-material";

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({ cellWidth, running }) {
  return (
    <Box sx={{ width: 300 }}>
      {/* <Typography>
        <span style={{ fontFamily: "monospace" }}>Speed</span>
      </Typography> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Grid3x3 />
        </Grid>
        <Grid item xs>
          <Slider
            disabled={running}
            aria-label="Temperature"
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={20}
            max={35}
            onChange={(e) => {
              cellWidth(e.target.value);
              // console.log(invertedValue * 10);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
