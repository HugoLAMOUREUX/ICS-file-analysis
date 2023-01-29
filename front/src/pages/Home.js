import React, { useEffect } from "react";
import Tabs from "../components/Tabs";
import Settings from "../components/Settings/Settings";
import { DataContext } from "../contexts/DataContext";
import useICS from "../hooks/useICS";

const Home = () => {
  const { arrayEvents, eventRecapsArray } = useICS();

  useEffect(() => {
    console.log(arrayEvents);
    console.log(eventRecapsArray);
  }, [arrayEvents, eventRecapsArray]);

  return (
    <div>
      <Settings />

      <DataContext.Provider
        value={{
          eventRecapsArray: eventRecapsArray,
          arrayEvents: arrayEvents,
        }}
      >
        <Tabs />
      </DataContext.Provider>
    </div>
  );
};

export default Home;
