import { useContext, useState } from "react";
import {
  Card,
  CardActionArea,
  Chip,
  Collapse,
  Dialog,
  Toolbar,
  Typography,
} from "@mui/material";
import { TimerDialog } from "./TimerDialog";
import { GlobalContext } from "../context/GlobalState";
import { COLOURS } from "../data/constants";
import { msToHMS } from "../utils/format";
import { useLongPress } from "use-long-press";
import { Box } from "@mui/system";
import { Info } from "@mui/icons-material";
import { TagChip } from "./TagChip";

export function TimerRecord({ focusState: [focus, setFocus], timer }) {
  const { projects, tags } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const bind = useLongPress(() => setOpen(true));

  const handleClose = () => setOpen(false);
  const toggleFocus = () => {
    if (focus === timer.id) setFocus(null);
    else setFocus(timer.id);
  };

  return (
    <>
      <Card elevation={0}>
        <CardActionArea onClick={toggleFocus} {...bind()}>
          <Toolbar>
            <Chip
              label={msToHMS(
                timer.endedAt.toMillis() - timer.createdAt.toMillis()
              )}
              sx={{
                backgroundColor: COLOURS[projects[timer.projectId].colour],
              }}
            />
            <Typography sx={{ marginX: 1 }}>
              {projects[timer.projectId].name}
            </Typography>
          </Toolbar>
          <Collapse in={focus === timer.id}>
            <Box
              sx={{
                paddingX: { xs: 1.5, sm: 2.5 },
                paddingTop: 0,
                paddingBottom: 1,
              }}
            >
              {timer.tags?.length > 0 ? (
                <>
                  {timer.tags.map((id) => (
                    <TagChip key={`${timer.id}:${id}`} label={tags[id]} />
                  ))}
                </>
              ) : (
                <TagChip icon={<Info />} label="Tap and hold for options" />
              )}
            </Box>
          </Collapse>
        </CardActionArea>
      </Card>
      <Dialog onClose={handleClose} open={open}>
        <TimerDialog timer={timer} />
      </Dialog>
    </>
  );
}
