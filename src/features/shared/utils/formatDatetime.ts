import {
  intervalToDuration,
  formatDuration,
  formatDistanceToNow,
} from "date-fns";
import { enGB } from "date-fns/locale";

const now = new Date();

export const timeLeft = ({ endTime }: { endTime: Date }) => {
  const duration = intervalToDuration({ start: now, end: endTime });
  const formatted = formatDuration(duration, {
    format: ["days", "hours", "minutes", "seconds"],
  });
  return formatted;
};

export const timeAgo = ({ startTime }: { startTime: Date }) => {
  const formatted = formatDistanceToNow(startTime, {
    addSuffix: true,
    locale: enGB,
  });
  return formatted === "less than a minute ago" ? "just now" : formatted;
};
