import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import img1 from "../images/Game_of_life_animated_glider.gif";
import img2 from "../images/82px-Game_of_life_boat.svg.png";
import img3 from "../images/98px-Game_of_life_beehive.svg.png";
import img4 from "../images/98px-Game_of_life_loaf.svg.png";
import img5 from "../images/Game_of_life_block_with_border.svg.png";
import img6 from "../images/Game_of_life_flower.svg.png";
import img7 from "../images/img7.gif";
import img10 from "../images/img10.gif";
import img11 from "../images/img11.gif";
import img12 from "../images/img12.gif";
import img13 from "../images/img13.gif";
import { Grid } from "@mui/material";

export default function BasicModal({ openModal, handleModal, currentmode }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: currentmode ? "black" : "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overFlow: "scroll",
    color: currentmode ? "white" : "black",
    maxHeight: "90vh",
    overflowY: "auto",
  };
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
          <Typography id="modal-modal-title" variant="h5" component="h2">
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
            <br />
            <Typography id="modal-modal-title" variant="h5" component="h2">
              How to play game of life?
            </Typography>
            Select a probablity value from the randomize slider and click on the
            randomize button to generate random live cells. Click on the start
            button to start the simulation. The user can control the cells per
            row and column and the speed of the simulation by adjusting the
            slider.
          </Typography>
          <br />
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Patterns(Still life and oscillating)
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box>
              <Grid>
                <Grid
                  item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img src={img2} alt="" style={{ margin: "10px" }} />
                  <img src={img3} alt="" style={{ margin: "10px" }} />
                  <img src={img4} alt="" style={{ margin: "10px" }} />
                  <img src={img5} alt="" style={{ margin: "10px" }} />
                  <img src={img6} alt="" style={{ margin: "10px" }} />
                </Grid>
                <Grid
                  item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img src={img1} alt="" style={{ margin: "5px" }} />
                  <img src={img7} alt="" style={{ margin: "5px" }} />
                  <img src={img10} alt="" style={{ margin: "5px" }} />
                  <img src={img11} alt="" style={{ margin: "5px" }} />
                  <img src={img12} alt="" style={{ margin: "5px" }} />
                  <img src={img13} alt="" style={{ margin: "5px" }} />
                </Grid>
              </Grid>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
