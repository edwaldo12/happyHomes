const calculateTimeDifference = (
  jam_mulai: string,
  jam_berakhir: string
): string => {
  const [startHour, startMinute] = jam_mulai.split(":").map(Number);
  const [endHour, endMinute] = jam_berakhir.split(":").map(Number);
  let hours = endHour - startHour;
  let minutes = endMinute - startMinute;
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  return `${hours} Jam ${minutes} Menit`;
};

const timeStringToMinutes = (timeString: string): number => {
  const parts = timeString.split(" ");
  let hours = 0;
  let minutes = 0;
  for (const part of parts) {
    if (part.toLowerCase() === "jam") {
      hours = parseInt(parts[parts.indexOf(part) - 1]);
    } else if (part.toLowerCase() === "menit") {
      minutes = parseInt(parts[parts.indexOf(part) - 1]);
    }
  }
  return hours * 60 + minutes;
};

const minutesToTimeString = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} Jam ${minutes} Menit`;
};

export { calculateTimeDifference, timeStringToMinutes, minutesToTimeString };
