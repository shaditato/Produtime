import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { ProjectList } from "./ProjectList";
import { ProjectForm } from "./ProjectForm";
import { Book, Label } from "@mui/icons-material";
import { TagList } from "./TagList";
import { TagForm } from "./TagForm";

export function ProjectsDialog({ handleClose }) {
  /**
   * LIST: Display list of projects/tags
   * NEW: Provide dialog form to create new project/tag
   * [ID]: Provide dialog form to edit existing project/tag w/ ID
   */
  const [dialogState, setDialogState] = useState("LIST");
  // 0 = PROJECTS, 1 = TAGS
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  return (
    <>
      {dialogState === "LIST" ? (
        <>
          <Tabs onChange={handleTabChange} value={tabValue} variant="fullWidth">
            <Tab icon={<Book />} iconPosition="start" label="Projects" />
            <Tab icon={<Label />} iconPosition="start" label="Tags" />
          </Tabs>
          {tabValue === 0 ? (
            <ProjectList setDialogState={setDialogState} />
          ) : (
            <TagList setDialogState={setDialogState} />
          )}
        </>
      ) : tabValue === 0 ? (
        <ProjectForm handleClose={handleClose} id={dialogState} />
      ) : (
        <TagForm handleClose={handleClose} id={dialogState} />
      )}
    </>
  );
}
