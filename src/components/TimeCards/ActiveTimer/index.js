import { useStopwatch } from "react-timer-hook";
import { Typography } from "@mui/material";
import { formatDigits as format } from "../../../utils/format";

export function ActiveTimer({ offsetTimestamp }) {
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
