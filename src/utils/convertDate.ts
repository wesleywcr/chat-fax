export function convertDateFormatted(date: string) {
  const newDate = new Date(date);

  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
}

export function convertDateToHours(date: string) {
  const newDate = new Date(date);
  let hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  const hoursFormatted = hours.toString().padStart(2, '0');
  const minutesFormatted = minutes.toString().padStart(2, '0');

  return `${hoursFormatted}:${minutesFormatted} ${period}`;
}

export function convertDateToDay(date: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const newDate = new Date(date);
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${months[month]} ${day}, ${year}`;
}
