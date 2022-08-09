import { useContext } from "react";
import { DatePicker } from "rsuite";
import { DataContext } from "../../contexts/DataContext";

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
};

export default Calendar;
