export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleDateString("en");
}
