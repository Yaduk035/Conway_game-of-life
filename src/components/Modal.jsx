import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import img1 from "../images/Game_of_life_animated_glider.gif";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ openModal, handleModal }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    handleModal(false);
  };
  React.useEffect(() => {
    if (openModal) {
      setOpen(openModal);
    }
  }, [openModal]);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            What is John Conway's game of life?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Conway's Game of Life is a cellular automaton that is played on a 2D
            square grid. Each square (or "cell") on the grid can be either alive
            or dead, and they evolve according to the following rules:
            <ul>
              <li>
                Any live cell with fewer than two live neighbours dies (referred
                to as underpopulation).
              </li>
              <li>
                Any live cell with more than three live neighbours dies
                (referred to as overpopulation).
              </li>
              <li>
                Any live cell with two or three live neighbours lives,
                unchanged, to the next generation. Any dead cell with exactly
                three live neighbours comes to life.
              </li>
            </ul>
            The initial configuration of cells can be created by a human, but
            all generations thereafter are completely determined by the above
            rules. The goal of the game is to find patterns that evolve in
            interesting ways – something that people have now been doing for
            over 50 years.
          </Typography>
          <img src={img1} alt="" />
        </Box>
      </Modal>
    </div>
  );
}
