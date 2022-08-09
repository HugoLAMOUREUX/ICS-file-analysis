import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import CollapsibleTable from "./CollapsibleTable";
import TextField from "@mui/material/TextField";
import { latinize } from "../utils/accent";
import Classification from "./Classification";

export default function Tabs() {
  const [value, setValue] = useState("1");
  const [fileArray, setFileArray] = useState([]);
  const [fileArrayFiltered, setFileArrayFiltered] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchBarUsed, setSearchBarUsed] = useState(false);
  const { file } = useContext(DataContext);
  const { minDuration } = useContext(DataContext);
  const { minOccurence } = useContext(DataContext);

  /*
   * Appelé quand on change d'onglet de la nav bar
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setInputText("");
    setSearchBarUsed(false);
  };

  /*
   * Une fois la barre de recherche utilisée, cette fonction est lancée et permets de stocker le texte rentré dans inputText et de signifier que la barre a été utilisé à travers le searchBarUse à true
   * @param { Object } évènement
   */
  const inputHandler = (e) => {
    //convert input text to lower case
    setInputText(e.target.value.toLowerCase().latinize());
    setSearchBarUsed(true);
  };

  /*
   * Converti le dictionnaire en un tableau d'objet avec un champ nampe qui contient l'ancien nom de l'event stocké par clé du dictionnaire, permets aussi de filtrer par occurence et durée minimale
   * @return { Object[] } RecapTabFiltered
   */
  const objectToArray = () => {
    let res = [];
    let i = 0;

    Object.keys(file).map((e) => {
      if (
        file[e].occurence >= minOccurence &&
        file[e].duration >= minDuration
      ) {
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
      }
    });
    return res;
  };

  /*
   * Permets de sélectionner les évènements dont leurs noms ou les noms de leurs sous Events contiennent ce qui a été écrit dans la bar de recherche
   * @return { Object[] } findSearchedEvents
   */
  const findSearchedEvents = () => {
    let res = [];
    fileArray.map((e) => {
      let finded = false;
      if (e.name.toLowerCase().latinize().includes(inputText)) {
        res.push(e);
        finded = true;
      }

      e.subEvents.forEach((element) => {
        if (
          element.name.toLowerCase().latinize().includes(inputText) &&
          !finded
        ) {
          res.push(e);
          finded = true;
        }
      });
    });
    return res;
  };

  useEffect(() => {
    if (!searchBarUsed) {
      let objToArr = objectToArray(file);
      setFileArray(objToArr);
      setFileArrayFiltered(objToArr);
    } else {
      setFileArray(objectToArray(file));

      if (inputText != "") {
        setFileArrayFiltered(findSearchedEvents());
      } // dans le cas où on a écrit dans la bar de recherche donc barUsed -> true mais qu'on a effacé apres
      else {
        setFileArrayFiltered(fileArray);
      }
    }
  }, [file, inputText, searchBarUsed, minOccurence, minDuration]);

  return (
    <div className="boxMargin">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Classement par nombre d'heures décroissantes"
                value="1"
              />
              <Tab label="Classement par occurence décroissante" value="2" />
              <Tab label="Classification et analyse" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="search">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
              />
            </div>

            {fileArray.length > 0 ? (
              <CollapsibleTable
                fileArray={fileArrayFiltered}
                key={fileArray[0].name}
                sort={"duration"}
              />
            ) : (
              "Merci de sélectionner votre fichier ICS"
            )}
          </TabPanel>
          <TabPanel value="2">
            <div className="search">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
              />
            </div>
            {fileArray.length > 0 ? (
              <CollapsibleTable
                fileArray={fileArrayFiltered}
                key={fileArray[0].name}
                sort={"occurence"}
              />
            ) : (
              "Merci de sélectionner votre fichier ICS"
            )}
          </TabPanel>
          <TabPanel value="3">
            <div>
              {fileArray.length > 0 ? (
                <Classification fileArray={fileArray} key={fileArray[0].name} />
              ) : (
                "Merci de sélectionner votre fichier ICS"
              )}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
