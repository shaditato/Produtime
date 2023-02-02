import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { DeleteProject } from "./DeleteProject";
import { EditProject } from "./EditProject";

export function ProjectForm({ handleClose, id }) {
  const { projects } = useContext(GlobalContext);
  return (
    <>
      {projects[id]?.archived ? (
        <DeleteProject handleClose={handleClose} id={id} />
      ) : (
        <EditProject handleClose={handleClose} id={id} />
      )}
    </>
  );
}
