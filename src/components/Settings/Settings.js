import React, { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

import VerticalSliderDuration from "./VerticalSliderDuration";
import VerticalSliderOccurence from "./VerticalSliderOccurence";
import Button from "@mui/material/Button";
import Calendar from "./Calendar";
import SubEventsSort from "../SubEventsSort";
import IconButton from "@mui/material/IconButton";
import CloudUpload from "@mui/icons-material/CloudUpload";

const Settings = () => {
  const {
    setMinDuration,
    setMinOccurence,
    setStartDate,
    setEndDate,
    setSubEventsSorted,
    setSelectedFile,
  } = useContext(DataContext);

  return (
    <div>
      <h6>Sélectionnez ce que vous souhaitez et uploadez votre fichier ICS</h6>
      <div className="selection">
        <VerticalSliderDuration />
        <VerticalSliderOccurence />
        <div className="calendrier">
          <Calendar />
        </div>

        <SubEventsSort />
        <br />
        <div className="buttonclass">
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              accept=".ics"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept=".ics"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <CloudUpload />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Settings;
