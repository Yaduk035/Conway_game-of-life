import SpeedSlider from "./SpeedSlider";
import CellSlider from "./CellWidthSlider";
import RandomizeSlider from "./RandomizeSlider";
import { Button, Stack, Grid, Box } from "@mui/material";

const ControlPanel = (props) => {
  return (
    <>
      <div>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "monospace",
            fontWeight: "bolder",
            color: props.currentmode ? "wheat" : "rgb(80, 80, 80)",
          }}
        >
          Controls
        </h1>
      </div>
      <Box>
        <Grid container justifyContent="center">
          <Grid item style={{ marginLeft: "10px", marginRight: "10px" }}>
            <SpeedSlider
              speedControl={props.speedControl}
              speed={props.speed}
              currentmode={props.currentmode}
            />
          </Grid>
          <Grid style={{ marginLeft: "10px", marginRight: "10px" }}>
            <CellSlider
              cellWidth={props.cellWidth}
              running={props.running}
              currentmode={props.currentmode}
            />
          </Grid>
          <Grid style={{ marginLeft: "10px", marginRight: "10px" }}>
            <RandomizeSlider
              randomizeButton={props.randomizeButton}
              ranValue={props.ranValue}
              currentmode={props.currentmode}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              variant="outlined"
              color="error"
              onClick={props.startButton}
              style={{ color: props.currentmode ? "wheat" : "rgb(50,50,50)" }}
            >
              <span style={{ fontWeight: "bolder" }}>
                {props.running ? "Stop" : "Start"}
              </span>
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="success"
              onClick={props.clearGrid}
              style={{ color: props.currentmode ? "wheat" : "rgb(50,50,50)" }}
            >
              <span style={{ fontWeight: "bolder" }}>Clear</span>
            </Button>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};

export default ControlPanel;
