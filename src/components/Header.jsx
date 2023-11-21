import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import DarkmodeButton from "./DarkmodeButton";
import { GridView } from "@mui/icons-material";
import Modal from "./Modal";
import { HelpOutline } from "@mui/icons-material";

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleModal = (value) => {
    setOpenModal(value);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(17,17,17,0.8)",
        boxShadow: props.currentmode
          ? "0 5px 25px rgba(150,150,150,0.5)"
          : "0 10px 25px rgba(0,0,0,0.5)",
        borderRadius: "0px 0px 10px 10px",
      }}
    >
      <Container maxWidth="xl" className="day" style={{ padding: "10px" }}>
        <Toolbar>
          <GridView
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "5rem",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CONWAY'S
            <br />
            Game of life
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Typography textAlign="center">
                  {" "}
                  <DarkmodeButton
                    nightmode={props.nightmode}
                    currentmode={props.currentmode}
                  />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <GridView sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Conway's Game of life
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <span onClick={() => handleModal(true)}>
                <HelpOutline
                  style={{
                    fontSize: "1.9rem",
                    color: "gray",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            <DarkmodeButton
              nightmode={props.nightmode}
              currentmode={props.currentmode}
            />
            {/* <Button sx={{ my: 2, color: "white", display: "block" }}></Button> */}
          </Box>

          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
        <Modal
          openModal={openModal}
          handleModal={handleModal}
          currentmode={props.currentmode}
        />
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
