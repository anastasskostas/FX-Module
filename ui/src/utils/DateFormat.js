export const ConvertMillisecondsToDate = (milliseconds) => {
  if (milliseconds < 0) {
    return null;
  }
  const date = new Date(milliseconds);
  const convertedDate = date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate()) + " " + addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
  return convertedDate;
}

const addZero = (value) => {
  return (value < 10 ? '0' : '') + value;
}

export const ConvertDateToMilliseconds = (date) => {
  if (date) {
    const milliseconds = new Date(date).getTime();
    return milliseconds;
  }
  return '';
}

export const AddDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}