import React, { useEffect, useState } from "react";
import icsToJson from "ics-to-json-extended";

import Tabs from "../components/Tabs";
import Settings from "../components/Settings/Settings";

import { icsDateToGoodDate } from "../utils/IcsDateToGoodDate";

import { DataContext } from "../contexts/DataContext";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState({});
  const [reload, setReload] = useState(0);
  const [startDate, setStartDate] = useState(new Date(2005, 1, 1));
  const [endDate, setEndDate] = useState(new Date(2045, 12, 31));
  const [minDuration, setMinDuration] = useState(0);
  const [minOccurence, setMinOccurence] = useState(0);
  const [subEventsSorted, setSubEventsSorted] = useState("duration");

  /*
   * Converti le fichier ICS uploadé par l'utilisateur en JSON qui contient les données du fichier
   * @param { file } fileLocation
   * @return { Object } IcsData
   */
  const myConvert = async (fileLocation) => {
    //const icsRes = await fetch(fileLocation);
    // le fichier est déja la en tant que fichier
    const icsData = await selectedFile.text();
    // Convert
    const data = icsToJson(icsData);

    return data;
  };

  /*
   * Converti un objet de type ICS en un tableau d'évènements
   * @return { Object[] } ArrayOfEvents - Chaque évènement contient les informations de l'évènement ICS plus sa durée et ses dates mises au bon format
   */
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
    }
    return arrayEvent;
  };

  /*
   * Converti le tableau d'évènements en un Objet de la forme {Sport:{duration:0,occurence:0,subEvents:{}},Piano:{duration:6,occurence:6,subEvents:{Cours:{duration:6,occurence:6}}} }
   * @param { Object[] } eventArray
   * @return { Object } eventsRecaps - Chaque évènement de même type ont étés regroupés ensemble
   */
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
            res[RegExp.$1.trim()].time.push({
              date: eventArray[e].endDate,
              duration: eventArray[e].durationMiliseconds,
            });
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
              time: [
                {
                  date: eventArray[e].endDate,
                  duration: eventArray[e].durationMiliseconds,
                },
              ],
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
          res[eventArray[e].summary.trim()].time.push({
            date: eventArray[e].endDate,
            duration: eventArray[e].durationMiliseconds,
          });
        } else {
          res[eventArray[e].summary.trim()] = {
            duration: eventArray[e].durationMiliseconds,
            subEvents: {},
            time: [
              {
                date: eventArray[e].endDate,
                duration: eventArray[e].durationMiliseconds,
              },
            ],
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
      for (let time in res[e].time) {
        res[e].time[time].duration /= 1000 * 60 * 60;
      }
    }
    return res;
  };

  /*
   * Permets d'appeler goodArrayToResults de manière asynchrone et donc de récupérer le récap des events
   * @return { Object } eventsRecaps - Chaque évènement de même type ont étés regroupés ensemble
   */
  const getData = async () => {
    return await goodArrayToResults(await fileToArray());
  };

  /*
   * Petit bordel pour récupérer les données et les mettre dans les useState
   */
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
    });
  }, [
    selectedFile,
    reload,
    startDate,
    endDate,
    minOccurence,
    minDuration,
    subEventsSorted,
  ]);

  return (
    <div>
      <DataContext.Provider
        value={{
          setMinDuration,
          setMinOccurence,
          setStartDate,
          setEndDate,
          setSubEventsSorted,
          setSelectedFile,
        }}
      >
        <Settings />
      </DataContext.Provider>

      <DataContext.Provider
        value={{
          file: file,
          minOccurence: minOccurence,
          minDuration: minDuration,
          subEventsSorted: subEventsSorted,
        }}
      >
        <Tabs />
      </DataContext.Provider>
    </div>
  );
};

export default Home;
