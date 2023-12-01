export function formattedPhone(phone: string) {
  const cleaned = `${phone}`.replace(/\D/g, '');
  const match = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  // if (match) {
  //   return `(${match[1]}) ${match[2]}-${match[3]}`;
  // }

  return match;
}
