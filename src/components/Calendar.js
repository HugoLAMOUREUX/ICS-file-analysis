// import { useState } from "react";
// import DatePicker from "react-datepicker";
import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "rsuite";
import { DataContext } from "../contexts/DataContext";

const Calendar = () => {
  const { setStartDate } = useContext(DataContext);
  const { setEndDate } = useContext(DataContext);

  return (
    <>
      <p>Date de début</p>
      <DatePicker
        oneTap
        onSelect={(e) => setStartDate(e)}
        onClean={() => {
          setStartDate(new Date(2005, 1, 1));
        }}
        style={{ width: 200 }}
      />
      <hr />
      <p>Date de fin</p>
      <DatePicker
        oneTap
        onSelect={(e) => setEndDate(e)}
        onClean={() => {
          setStartDate(new Date(2045, 12, 31));
        }}
        style={{ width: 200 }}
      />
    </>
  );
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date("2050/01/01"));
  // return (
  //   <>
  //     <DatePicker
  //       selected={startDate}
  //       onChange={(date) => setStartDate(date)}
  //       selectsStart
  //       startDate={startDate}
  //       endDate={endDate}
  //     />
  //     <DatePicker
  //       selected={endDate}
  //       onChange={(date) => setEndDate(date)}
  //       selectsEnd
  //       startDate={startDate}
  //       endDate={endDate}
  //       minDate={startDate}
  //     />
  //   </>
  // );
};

export default Calendar;
