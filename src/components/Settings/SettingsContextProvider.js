import React, { useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

export const SettingsContextProvider = ({ children }) => {
  const [minDuration, setMinDuration] = useState(0);
  const [minOccurence, setMinOccurence] = useState(0);
  const [startDate, setStartDate] = useState(new Date(2005, 1, 1));
  const [endDate, setEndDate] = useState(new Date(2045, 12, 31));
  const [subEventsSorted, setSubEventsSorted] = useState("duration");
  const [selectedFile, setSelectedFile] = useState(null);

  const value = {
    minDuration,
    setMinDuration,
    minOccurence,
    setMinOccurence,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    subEventsSorted,
    setSubEventsSorted,
    selectedFile,
    setSelectedFile,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
