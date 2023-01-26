import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { TimerRecord } from "./TimerRecord";
import { GlobalContext } from "../context/GlobalState";

export function Timers() {
  const { timers } = useContext(GlobalContext);

  // Create an object to map timers to date strings
  const datedTimers = timers.reduce((accumulator, timer) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = timer.createdAt
      .toDate()
      .toLocaleDateString(undefined, options);

    if (accumulator[date] === undefined) {
      return {
        ...accumulator,
        [date]: [timer],
      };
    }

    return {
      ...accumulator,
      [date]: [...accumulator[date], timer],
    };
  }, {});

  return (
    <>
      {timers.length !== 0 ? (
        Object.keys(datedTimers).map((date) => (
          <Box key={date}>
            <Typography sx={{ marginX: 3 }} variant="overline">
              {date}
            </Typography>
            {datedTimers[date].map((timer) => (
              <TimerRecord key={timer.id} timer={timer} />
            ))}
          </Box>
        ))
      ) : (
        <Box sx={{ marginY: 2, padding: 2, textAlign: "center" }}>
          <Typography variant="h4">No timers yet!</Typography>
          <Typography sx={{ marginY: 1 }}>
            Create a project and start a timer with the button above
          </Typography>
        </Box>
      )}
    </>
  );
}
