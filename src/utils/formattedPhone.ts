export function formattedPhone(phone: string) {
  const cleaned = `${phone}`.replace(/\D/g, '');
  const match = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  return match;
}
