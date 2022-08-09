import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState("duration");
  const { setSubEventsSorted } = useContext(DataContext);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSubEventsSorted(event.target.value);
  };

  return (
    <div className="subEventsSort">
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Classer les sous évènements par
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
            label="Durée"
          />
          <FormControlLabel
            value="occurence"
            control={<Radio />}
            label="Occurence"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
