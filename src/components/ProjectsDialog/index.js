import { useState } from "react";
import { ProjectList } from "./ProjectList";
import { ProjectForm } from "./ProjectForm";

export function ProjectsDialog({ handleClose }) {
  /**
   * PROJECT_LIST: Display list of projects
   * NEW_PROJECT: Provide dialog form to create new project
   * [PROJECT_ID]: Provide dialog form to edit existing project w/ ID
   */
  const [dialogState, setDialogState] = useState("PROJECT_LIST");

  return (
    <>
      {dialogState === "PROJECT_LIST" ? (
        <ProjectList setDialogState={setDialogState} />
      ) : (
        <ProjectForm handleClose={handleClose} id={dialogState} />
      )}
    </>
  );
}
