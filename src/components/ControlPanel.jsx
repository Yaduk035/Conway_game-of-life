import SpeedSlider from "./SpeedSlider";
import CellSlider from "./CellWidthSlider";

const ControlPanel = (props) => {
  return (
    <>
      <SpeedSlider speedControl={props.speedControl} speed={props.speed} />
      <CellSlider cellWidth={props.cellWidth} running={props.running} />
    </>
  );
};

export default ControlPanel;
