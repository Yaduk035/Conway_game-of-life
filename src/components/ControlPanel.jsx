import Slider from "./Slider";

const ControlPanel = (props) => {
  return (
    <>
      <Slider speedControl={props.speedControl} speed={props.speed} />
    </>
  );
};

export default ControlPanel;
