import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "../../contexts/SettingsContext";

export default function VerticalSliderDuration() {
  const { setMinDuration } = useContext(SettingsContext);
  const { t } = useTranslation();

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <Box sx={{ height: 150 }}>
      <p>{t("minDuration")}&nbsp;&nbsp;</p>
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
