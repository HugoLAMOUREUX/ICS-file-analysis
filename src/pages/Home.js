import React, { useEffect } from "react";
import { useState } from "react";
import icsToJson from "ics-to-json-extended";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";
import CloudUpload from "@mui/icons-material/CloudUpload";
import Tabs from "../components/Tabs";
import SelectInput from "@mui/material/Select/SelectInput";
import { DataContext } from "../contexts/DataContext";
import Calendar from "../components/Calendar";
import { fontGrid } from "@mui/material/styles/cssUtils";
import VerticalSlider1 from "../components/VerticalSlider1";
import VerticalSlider2 from "../components/VerticalSlider2";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState({});
  const [fileArray, setFileArray] = useState({});
  const [reload, setReload] = useState(0);
  const [apply, setApply] = useState(0);
  const [startDate, setStartDate] = useState(new Date(2005, 1, 1));
  const [endDate, setEndDate] = useState(new Date(2045, 12, 31));
  const [minDuration, setMinDuration] = useState(0);
  const [minOccurence, setMinOccurence] = useState(0);

  const getData = async () => {
    //file = goodArrayToResults(await fileToArray());
    return await goodArrayToResults(await fileToArray());
  };

  const fileToArray = async () => {
    let arrayEvent = [];
    if (selectedFile != null) {
      arrayEvent = await myConvert(selectedFile);
      arrayEvent.forEach((e) => {
        let start = icsDateToGoodDate(e.startDate);
        let end = icsDateToGoodDate(e.endDate);
        if (endDate == startDate) {
          e.startDate = start;
          e.endDate = end;
          e.durationMiliseconds = Math.abs(e.endDate - e.startDate);
        } else if (endDate - end > 0 && start - startDate > 0) {
          e.startDate = start;
          e.endDate = end;
          e.durationMiliseconds = Math.abs(e.endDate - e.startDate);
        }
      });
      setFileArray(arrayEvent);
    }
    return arrayEvent;
  };

  const icsDateToGoodDate = (icsDate) => {
    let x = icsDate.indexOf(":");
    let icalStr = icsDate.slice(x + 1);

    let strYear = icalStr.substr(0, 4);
    let strMonth = parseInt(icalStr.substr(4, 2), 10) - 1;
    let strDay = icalStr.substr(6, 2);
    let strHour = parseInt(icalStr.substr(9, 2)) + 2;
    let strMin = icalStr.substr(11, 2);
    let strSec = icalStr.substr(13, 2);

    let oDate = new Date(strYear, strMonth, strDay, strHour, strMin, strSec);

    return oDate;
  };

  const goodArrayToResults = (eventArray) => {
    let res = {};
    let regex = new RegExp("^([^-]*)(-+)(.*)");

    for (let e in eventArray) {
      if (eventArray[e].durationMiliseconds < 30 * 60 * 60 * 1000) {
        if (regex.test(eventArray[e].summary)) {
          let match = eventArray[e].summary.match(regex);

          if (RegExp.$1.trim() in res) {
            res[RegExp.$1.trim()].duration += eventArray[e].durationMiliseconds;
            res[RegExp.$1.trim()].occurence += 1;
            if (RegExp.$3.trim() in res[RegExp.$1.trim()].subEvents) {
              res[RegExp.$1.trim()].subEvents[RegExp.$3.trim()].duration +=
                eventArray[e].durationMiliseconds;
              res[RegExp.$1.trim()].subEvents[RegExp.$3.trim()].occurence += 1;
            } else {
              res[RegExp.$1.trim()].subEvents[RegExp.$3.trim()] = {
                duration: eventArray[e].durationMiliseconds,
                occurence: 1,
              };
            }
          } else {
            res[RegExp.$1.trim()] = {
              duration: eventArray[e].durationMiliseconds,
              subEvents: {},
              occurence: 1,
            };
            res[RegExp.$1.trim()].subEvents[RegExp.$3.trim()] = {
              duration: eventArray[e].durationMiliseconds,
              occurence: 1,
            };
          }
        } else if (eventArray[e].summary.trim() in res) {
          res[eventArray[e].summary.trim()].duration +=
            eventArray[e].durationMiliseconds;
          res[eventArray[e].summary.trim()].occurence += 1;
        } else {
          res[eventArray[e].summary.trim()] = {
            duration: eventArray[e].durationMiliseconds,
            subEvents: {},
            occurence: 1,
          };
        }
      }
    }
    for (let e in res) {
      res[e].duration /= 1000 * 60 * 60;
      for (let sub in res[e].subEvents) {
        res[e].subEvents[sub].duration /= 1000 * 60 * 60;
      }
    }
    return res;
  };

  const myConvert = async (fileLocation) => {
    //const icsRes = await fetch(fileLocation);
    // le fichier est déja la en tant que fichier
    const icsData = await selectedFile.text();
    // Convert
    const data = icsToJson(icsData);

    return data;
  };

  useEffect(() => {
    getData().then((data) => {
      if (selectedFile != null && reload == 0) {
        setFile(data);
        setReload(1);
      }
      if (reload != 0) {
        setFile(data);
      }
      if (selectedFile != null && reload != 0) {
        setSelectedFile(null);
        setReload(0);
      }
      //console.log(file);
    });
    //console.log(file);
    //console.log(goodArrayToResults(getData()));
  }, [
    selectedFile,
    reload,
    startDate,
    endDate,
    apply,
    minOccurence,
    minDuration,
  ]);

  return (
    <div>
      <h6>Sélectionnez ce que vous souhaitez et uploadez votre fichier ICS</h6>
      <div className="selection">
        <DataContext.Provider
          value={{
            setMinDuration,
            setMinOccurence,
          }}
        >
          <VerticalSlider1 />
          <VerticalSlider2 />
        </DataContext.Provider>
        <div className="calendrier">
          <DataContext.Provider
            value={{
              setStartDate,
              setEndDate,
            }}
          >
            <Calendar />
          </DataContext.Provider>
        </div>
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
          <Button
            onClick={() => {
              setApply((previous) => previous + 1);
            }}
            variant="contained"
          >
            Apply
          </Button>
        </div>
      </div>
      <DataContext.Provider
        value={{
          file: file,
          minOccurence: minOccurence,
          minDuration: minDuration,
          fileArray: fileArray,
        }}
      >
        <Tabs />
      </DataContext.Provider>
    </div>
  );
};

export default Home;
