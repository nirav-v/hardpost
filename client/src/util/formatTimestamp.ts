function formatTimestamp(timestamp: string | number | Date) {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0"); // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "pm" : "am"; // Determine AM/PM

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

export default formatTimestamp;
