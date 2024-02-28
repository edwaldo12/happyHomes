const timeStringToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};

export { timeStringToMinutes };
