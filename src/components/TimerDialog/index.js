import { useContext, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { TagChip } from "../TagChip";
import { TimerMenu } from "./TimerMenu";
import { GlobalContext } from "../../context/GlobalState";
import { COLOURS } from "../../data/constants";
import { msToHMS } from "../../utils/";
import { EditTimerDesc } from "./EditTimerDesc";
import { DeleteTimer } from "./DeleteTimer";
import { EditTimerTags } from "./EditTimerTags";

export function TimerDialog({ handleClose, timer }) {
  const { projects, tags } = useContext(GlobalContext);
  /**
   * MENU: Display menu of actions
   * EDIT_TAGS: Provide dialog form to edit associated tags
   * EDIT_DESC: Provide dialog form to edit description
   * DELETE: Provide dialog to confirm deletion of timer record
   */
  const [dialogState, setDialogState] = useState("MENU");
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
        {dialogState === "MENU" && timer.desc && (
          <Typography variant="subtitle2" sx={{ marginY: 1 }}>
            {timer.desc}
          </Typography>
        )}
        {dialogState === "MENU" && timer.tags?.length > 0 && (
          <Box>
            {timer.tags.map((id) => (
              <TagChip key={`${timer.id}-dialog:${id}`} label={tags[id]} />
            ))}
          </Box>
        )}
      </Box>
      {dialogState === "MENU" && <TimerMenu setDialogState={setDialogState} />}
      {dialogState === "EDIT_TAGS" && (
        <EditTimerTags handleClose={handleClose} timer={timer} />
      )}
      {dialogState === "EDIT_DESC" && (
        <EditTimerDesc handleClose={handleClose} timer={timer} />
      )}
      {dialogState === "DELETE" && (
        <DeleteTimer handleClose={handleClose} id={timer.id} />
      )}
    </>
  );
}
