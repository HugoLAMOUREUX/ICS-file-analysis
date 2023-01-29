import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "../../contexts/SettingsContext";

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = useState("duration");
  const { setSubEventsSorted } = useContext(SettingsContext);
  const { t } = useTranslation();

  const handleChange = (event) => {
    setValue(event.target.value);
    setSubEventsSorted(event.target.value);
  };

  return (
    <div className="subEventsSort">
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          {t("classifySubEventsBy")}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="duration"
            control={<Radio />}
            label={t("duration")}
          />
          <FormControlLabel
            value="occurence"
            control={<Radio />}
            label={t("occurence")}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
