import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid, Typography } from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { Button } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({
  randomizeButton,
  ranValue,
  currentmode,
}) {
  return (
    <>
      <Box sx={{ width: 300 }}>
        {/* <Typography>
        <span style={{ fontFamily: "monospace" }}>Speed</span>
      </Typography> */}
        <Grid container spacing={0} alignItems="center">
          <Grid item>
            <Shuffle style={{ color: currentmode ? "wheat" : "" }} />
          </Grid>
          <Grid item xs>
            <Slider
              style={{ color: currentmode ? "wheat" : "" }}
              aria-label="Temperature"
              defaultValue={5}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(e) => {
                ranValue(11 - e.target.value);
                // console.log(invertedValue * 10);
              }}
            />
          </Grid>
          <Grid item>
            <Button
              size="small"
              onClick={randomizeButton}
              variant="outlined"
              style={{
                color: currentmode ? "wheat" : "rgb(50,50,50)",
                marginLeft: "10px",
              }}
            >
              <span style={{ fontWeight: "bolder" }}>Randomize</span>
            </Button>
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  );
}
