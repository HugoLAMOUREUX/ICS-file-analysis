export const icsDateToGoodDate = (icsDate) => {
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
