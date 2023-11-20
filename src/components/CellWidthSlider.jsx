import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid, Typography } from "@mui/material";
import { Grid3x3 } from "@mui/icons-material";

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({ cellWidth, running, currentmode }) {
  return (
    <Box sx={{ width: 300 }}>
      <Grid container spacing={0} alignItems="center">
        <Grid item>
          <Grid3x3 style={{ color: currentmode ? "wheat" : "" }} />
        </Grid>
        <Grid item xs>
          <Slider
            style={{ color: currentmode ? "wheat" : "" }}
            disabled={running}
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} x ${Math.ceil(value / 2)}  `}
            step={1}
            marks
            min={20}
            max={50}
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
