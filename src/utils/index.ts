export function timeAgo(unixEpochSeconds: number): string {
  const now = Date.now();
  const inputTime = unixEpochSeconds * 1000;
  const diff = now - inputTime;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (diff < minute) {
    return 'a minute ago';
  } else if (diff < hour) {
    const mins = Math.floor(diff / minute);
    return `${mins} min`;
  } else if (diff < 2 * hour) {
    return 'an hour ago';
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour ago`;
  } else if (diff < 2 * day) {
    return 'a day ago';
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} days ago`;
  } else if (diff < 5 * week) {
    const weeks = Math.floor(diff / week);
    return `${weeks} week ago`;
  } else if (diff < 2 * month) {
    return 'a month ago';
  } else {
    const months = Math.floor(diff / month);
    return `${months} months ago`;
  }
}
