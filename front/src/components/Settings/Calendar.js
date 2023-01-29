import { useContext } from "react";
import { DatePicker } from "rsuite";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "../../contexts/SettingsContext";

const Calendar = () => {
  const { setStartDate } = useContext(SettingsContext);
  const { setEndDate } = useContext(SettingsContext);
  const { t } = useTranslation();

  return (
    <>
      <p>{t("startDate")}</p>
      <DatePicker
        oneTap
        onSelect={(e) => setStartDate(e)}
        onClean={() => {
          setStartDate(new Date(2005, 1, 1));
        }}
        style={{ width: 200 }}
      />
      <hr />
      <p>{t("endDate")}</p>
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
