import { Typography } from "@mui/material";
import { useStopwatch } from "react-timer-hook";

// Format each number to be displayed with at least two digits
const format = (n) => (n < 10 ? `0${n}` : n);

export function Timer({ offsetTimestamp }) {
  const { seconds, minutes, hours, days } = useStopwatch({
    autoStart: true,
    offsetTimestamp,
  });

  return (
    <Typography variant="h4">
      {format(hours + days * 24)}:{format(minutes)}:{format(seconds)}
    </Typography>
  );
}
