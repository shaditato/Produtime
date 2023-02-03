import { useContext } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { TagChip } from "../TagChip";
import { TimerMenu } from "./TimerMenu";
import { GlobalContext } from "../../context/GlobalState";
import { COLOURS } from "../../data/constants";
import { msToHMS } from "../../utils/";

export function TimerDialog({ timer }) {
  const { projects, tags } = useContext(GlobalContext);
  const project = projects[timer.projectId];

  return (
    <>
      <Box
        sx={{
          backgroundColor: COLOURS[project.colour],
          display: "flex",
          flexDirection: "column",
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">{project.name}</Typography>
        <Chip
          label={msToHMS(timer.endedAt.toMillis() - timer.createdAt.toMillis())}
          sx={{ marginY: 1 }}
        />
        <Typography variant="caption">
          {timer.createdAt.toDate().toLocaleString()} to{"\n"}
          {timer.endedAt.toDate().toLocaleString()}
        </Typography>
        {timer.desc && (
          <Typography variant="subtitle2" sx={{ marginY: 1 }}>
            {timer.desc}
          </Typography>
        )}
        {timer.tags?.length > 0 && (
          <Box>
            {timer.tags.map((id) => (
              <TagChip key={`${timer.id}-dialog:${id}`} label={tags[id]} />
            ))}
          </Box>
        )}
      </Box>
      <TimerMenu />
    </>
  );
}
