import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import { SettingsContext } from "../contexts/SettingsContext";
import { latinize } from "../utils/accent"; //necessary import do not remove

const useFilter = () => {
  const [value, setValue] = useState("1");
  const [inputText, setInputText] = useState("");
  const [searchBarUsed, setSearchBarUsed] = useState(false);

  const { eventRecapsArray } = useContext(DataContext);
  const { minOccurence, minDuration, subEventsSorted } =
    useContext(SettingsContext);
  const [eventRecapsArrayFiltered, setEventRecapsArrayFiltered] =
    useState(eventRecapsArray);

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
   * Permets de sélectionner les évènements dont leurs noms ou les noms de leurs sous Events contiennent ce qui a été écrit dans la bar de recherche
   * @return { Object[] } findSearchedEvents
   */
  const findSearchedEvents = () => {
    let res = [];
    eventRecapsArray.forEach((e) => {
      if (e.duration >= minDuration && e.occurence >= minOccurence) {
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
      }
    });

    if (subEventsSorted === "duration") {
      res.forEach((e) => {
        e.subEvents.sort(function compare(a, b) {
          if (a.duration < b.duration) return 1;
          if (a.duration > b.duration) return -1;
          return 0;
        });
      });
    }
    if (subEventsSorted === "occurence") {
      res.forEach((e) => {
        e.subEvents.sort(function compare(a, b) {
          if (a.occurence < b.occurence) return 1;
          if (a.occurence > b.occurence) return -1;
          return 0;
        });
      });
    }

    return res;
  };

  useEffect(() => {
    setEventRecapsArrayFiltered(findSearchedEvents());
  }, [
    eventRecapsArray,
    inputText,
    searchBarUsed,
    value,
    minDuration,
    minOccurence,
    subEventsSorted,
  ]);

  return {
    eventRecapsArrayFiltered,
    handleChange,
    inputHandler,
    value,
  };
};
export default useFilter;
