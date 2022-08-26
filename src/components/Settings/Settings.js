import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

import VerticalSliderDuration from "./VerticalSliderDuration";
import VerticalSliderOccurence from "./VerticalSliderOccurence";
import Button from "@mui/material/Button";
import Calendar from "./Calendar";
import LanguageSelector from "./LanguageSelector";
import SubEventsSort from "./SubEventsSort";
import IconButton from "@mui/material/IconButton";
import CloudUpload from "@mui/icons-material/CloudUpload";
import HelpIcon from "@mui/icons-material/Help";

import { useTranslation } from "react-i18next";

const Settings = () => {
  const {
    setMinDuration,
    setMinOccurence,
    setStartDate,
    setEndDate,
    setSubEventsSorted,
    setSelectedFile,
  } = useContext(DataContext);

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="upBar">
        <h6>{t("instructions")}</h6>
        <IconButton aria-label="delete">
          <HelpIcon
            aria-label="delete"
            color="primary"
            className="helpIcon"
            onClick={() => navigate("/info")}
          />
        </IconButton>

        <div className="lSelector">
          <LanguageSelector />
        </div>
      </div>

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
