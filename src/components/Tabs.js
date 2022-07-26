import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import CollapsibleTable from "./CollapsibleTable";

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
    let i = 0;
    Object.keys(file).map((e) => {
      res.push({
        name: e,
        duration: Math.round(file[e].duration * 10) / 10,
        occurence: file[e].occurence,
        durPerOccurence:
          Math.round((file[e].duration * 10) / file[e].occurence) / 10,
        subEvents: [],
      });
      Object.keys(file[e].subEvents).map((sub) => {
        res[i].subEvents.push({
          name: sub,
          duration: Math.round(file[e].subEvents[sub].duration * 10) / 10,
          occurence: file[e].subEvents[sub].occurence,
          durPerOccurence:
            Math.round(
              (file[e].subEvents[sub].duration * 10) /
                file[e].subEvents[sub].occurence
            ) / 10,
        });
      });
      i += 1;
    });
    return res;
  };

  useEffect(() => {
    setFileArray(objectToArray(file));
    console.log(
      fileArray.sort(function compare(a, b) {
        if (a.duration < b.duration) return 1;
        if (a.duration > b.duration) return -1;
        return 0;
      })
    );
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
          {fileArray.length > 0 ? (
            <CollapsibleTable
              fileArray={fileArray}
              key={fileArray[0].name}
              sort={"duration"}
            />
          ) : (
            "Merci de sélectionner votre fichier ICS"
          )}
        </TabPanel>
        <TabPanel value="2">
          {fileArray.length > 0 ? (
            <CollapsibleTable
              fileArray={fileArray}
              key={fileArray[0].name}
              sort={"occurence"}
            />
          ) : (
            "Merci de sélectionner votre fichier ICS"
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
