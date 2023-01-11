import { useContext, useEffect } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import icsToJson from "ics-to-json-extended";
import { icsDateToGoodDate } from "../utils/IcsDateToGoodDate";
import { useState } from "react";

const useICS = () => {
  const { selectedFile, endDate, startDate } = useContext(SettingsContext);

  const [arrayEvents, setArrayEvents] = useState([]);
  const [eventRecapsArray, setEventRecapsArray] = useState([]);

  /*
   * Converti le fichier ICS uploadé par l'utilisateur en JSON qui contient les données du fichier
   * @param { file } fileLocation
   * @return { Object } IcsData
   */
  const myConvert = async (fileLocation) => {
    //const icsRes = await fetch(fileLocation);
    // le fichier est déja la en tant que fichier
    const icsData = await fileLocation.text();
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
    let res = [];
    if (selectedFile != null) {
      arrayEvent = await myConvert(selectedFile);
      arrayEvent.forEach((e) => {
        let start = icsDateToGoodDate(e.startDate);
        let end = icsDateToGoodDate(e.endDate);
        e.startDate = start;
        e.endDate = end;
        e.durationMiliseconds = Math.abs(e.endDate - e.startDate);
        if (endDate - end > 0 && start - startDate > 0) {
          res.push(e);
        }
      });
    }
    return res;
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
   * Converti le dictionnaire en un tableau d'objet avec un champ name qui contient l'ancien nom de l'event stocké par clé du dictionnaire, permets aussi de filtrer par occurence et durée minimale
   * @return { Object[] } RecapTabFiltered
   */
  const objectToArray = (file) => {
    let res = [];
    let i = 0;

    Object.keys(file).forEach((e) => {
      res.push({
        name: e,
        duration: Math.round(file[e].duration * 10) / 10,
        occurence: file[e].occurence,
        durPerOccurence:
          Math.round((file[e].duration * 10) / file[e].occurence) / 10,
        subEvents: [],
      });
      Object.keys(file[e].subEvents).forEach((sub) => {
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
    fileToArray().then((v) => {
      setArrayEvents(v);
      let objectRecap = goodArrayToResults(v);
      setEventRecapsArray(objectToArray(objectRecap));
    });
  }, [selectedFile, endDate, startDate]);

  return { arrayEvents, eventRecapsArray };
};

export default useICS;
