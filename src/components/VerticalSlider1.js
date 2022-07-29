import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export default function VerticalSlider1() {
  const { setMinDuration } = useContext(DataContext);
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <Box sx={{ height: 150 }}>
      <p>Durée minimale&nbsp;&nbsp;</p>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
        }}
        orientation="vertical"
        defaultValue={1}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
        onChange={(e) => {
          setMinDuration(e.target.value);
        }}
      />
    </Box>
  );
}
