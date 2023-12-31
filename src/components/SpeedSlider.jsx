import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid } from "@mui/material";
import { ElectricBolt } from "@mui/icons-material";

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({ speedControl, currentmode }) {
  return (
    <Box sx={{ width: 300 }}>
      <Grid container spacing={0} alignItems="center">
        <Grid item>
          <ElectricBolt style={{ color: currentmode ? "wheat" : "" }} />
        </Grid>
        <Grid item xs>
          <Slider
            style={{ color: currentmode ? "wheat" : "" }}
            aria-label="Temperature"
            defaultValue={160}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `Speed: x${value / 100}`}
            step={5}
            marks
            min={100}
            max={200}
            onChange={(e) => {
              let sliderValue = e.target.value;
              let invertedValue = 201 - sliderValue;
              speedControl(invertedValue * 10);
              // console.log(invertedValue * 10);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
