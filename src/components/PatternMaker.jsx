import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import {
  pulsar,
  glider,
  HWSS,
  MWSS,
  LWSS,
  gosperGliderGun,
  reflector,
  galaxy,
} from "./Patterns";

export default function SelectAutoWidth({ drawPatterns, currentmode }) {
  const [pattern, setPattern] = React.useState("");

  const handleChange = (event) => {
    setPattern(event.target.value);
  };

  React.useEffect(() => {
    if (!pattern) return;

    drawPatterns(pattern);
  }, [pattern]);

  const handleClick = (e) => {
    if (!pattern) return;
    drawPatterns(pattern);
  };

  return (
    <div>
      <FormControl sx={{ m: 2, minWidth: 150, color: "wheat" }}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          style={{ color: currentmode ? "wheat" : "" }}
          color="info"
        >
          Pattern
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={pattern}
          onChange={handleChange}
          autoWidth
          label="Select a pattern"
          style={{
            color: currentmode ? "wheat" : "",
          }}
        >
          {/* <MenuItem value={pattern}>
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={glider}>Glider</MenuItem>
          <MenuItem value={pulsar}>Pulsar</MenuItem>
          <MenuItem value={LWSS}>Light Spaceship</MenuItem>
          <MenuItem value={MWSS}>Medium Spaceship</MenuItem>
          <MenuItem value={HWSS}>Heavy Spaceship</MenuItem>
          <MenuItem value={gosperGliderGun}>Gosper Glider Gun</MenuItem>
          <MenuItem value={reflector}>Reflector</MenuItem>
          <MenuItem value={galaxy}>Galaxy</MenuItem>
        </Select>
        <Button
          onClick={handleClick}
          variant="outlined"
          color="error"
          sx={{ marginTop: "4px" }}
        >
          <span
            style={{
              fontWeight: "bold",
              color: currentmode ? "wheat" : "rgb(50,50,50)",
            }}
          >
            Re-draw pattern
          </span>
        </Button>
      </FormControl>
    </div>
  );
}
