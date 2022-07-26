import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export default function Tabs() {
  const [value, setValue] = useState("1");
  const [reload, setReload] = useState("0");
  const [fileArray, setFileArray] = useState([]);
  const { file } = useContext(DataContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const objectToArray = () => {
    let res = [];
    Object.keys(file).map((e) => {
      res.push({
        name: e,
        duration: Math.round(file[e].duration * 10) / 10,
        occurence: file[e].occurence,
        subEvents: file[e].subEvents,
      });
    });
    return res;
  };

  useEffect(() => {
    setFileArray(objectToArray(file));
    console.log(fileArray);
  }, [file]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Classement par nombre d'heures décroissantes"
              value="1"
            />
            <Tab label="Classement par occurence décroissante" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {fileArray.length > 0
            ? fileArray
                .sort(function compare(a, b) {
                  if (a.duration < b.duration) return 1;
                  if (a.duration > b.duration) return -1;
                  return 0;
                })
                .map((e) => {
                  return (
                    <h1>
                      {e.name} {e.duration}h {e.occurence}
                    </h1>
                  );
                })
            : "Merci de sélectionner votre fichier ICS"}
        </TabPanel>
        <TabPanel value="2">
          {fileArray.length > 0
            ? fileArray
                .sort(function compare(a, b) {
                  if (a.occurence < b.occurence) return 1;
                  if (a.occurence > b.occurence) return -1;
                  return 0;
                })
                .map((e) => {
                  return (
                    <h1>
                      {e.name} {e.duration}h {e.occurence}
                    </h1>
                  );
                })
            : "Merci de sélectionner votre fichier ICS"}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
