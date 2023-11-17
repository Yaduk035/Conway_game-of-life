import SpeedSlider from "./SpeedSlider";
import CellSlider from "./CellWidthSlider";
import RandomizeSlider from "./RandomizeSlider";
import { Button, Stack, Grid, Box } from "@mui/material";

const ControlPanel = (props) => {
  return (
    <>
      <Box sx={{ width: "300px" }}>
        <SpeedSlider
          speedControl={props.speedControl}
          speed={props.speed}
          currentmode={props.currentmode}
        />
        <CellSlider
          cellWidth={props.cellWidth}
          running={props.running}
          currentmode={props.currentmode}
        />
        <RandomizeSlider
          randomizeButton={props.randomizeButton}
          ranValue={props.ranValue}
          currentmode={props.currentmode}
        />
        <Grid container justifyContent="center">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={props.startButton}
            >
              {props.running ? "Stop" : "Start"}
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={props.clearGrid}
            >
              Clear
            </Button>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};

export default ControlPanel;
