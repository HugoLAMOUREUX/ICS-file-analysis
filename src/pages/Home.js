import React, { useEffect } from "react";
import { useState } from "react";
import icsToJson from "ics-to-json-extended";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      console.log(goodArrayToResults(await fileToArray()));
      return await fileToArray();
    };
    getData();
    //console.log(getData());
    //console.log(goodArrayToResults(getData()));
  }, [selectedFile]);

  const fileToArray = async () => {
    let arrayEvent = [];
    if (selectedFile != null) {
      arrayEvent = await myConvert(selectedFile);
      arrayEvent.forEach((e) => {
        e.startDate = icsDateToGoodDate(e.startDate);
        e.endDate = icsDateToGoodDate(e.endDate);
        e.durationMiliseconds = Math.abs(e.endDate - e.startDate);
      });
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
              res[RegExp.$1.trim()].subEvents[RegExp.$3.trim()] +=
                eventArray[e].durationMiliseconds;
            } else {
              res[RegExp.$1.trim()].subEvents[RegExp.$3.trim()] =
                eventArray[e].durationMiliseconds;
            }
          } else {
            res[RegExp.$1.trim()] = {
              duration: eventArray[e].durationMiliseconds,
              subEvents: {},
              occurence: 1,
            };
            res[RegExp.$1.trim()].subEvents[RegExp.$3.trim()] =
              eventArray[e].durationMiliseconds;
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

  return (
    <div>
      <h1>bonjour</h1>
      <form>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </form>
      {selectedFile == null ? (
        ""
      ) : (
        <button onClick={() => myConvert(selectedFile)}></button>
      )}
    </div>
  );
};

export default Home;
