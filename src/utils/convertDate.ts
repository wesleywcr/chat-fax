export function convertDateFormatted(newDate: Date) {
  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = newDate.getFullYear();
  return `${month}/${day}/${year}`;
}

export function convertDateStringFormatted(date: string) {
  const newDate = new Date(date);

  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = newDate.getFullYear();
  return `${month}/${day}/${year}`;
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
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${months[month]} ${day}, ${year}`;
}

export function convertDateFormattedToDate(date: string) {
  const [day, month, year] = date.split('/');

  const newDate = new Date(`${year}-${month}-${day}`);
  return newDate.toISOString();
}
