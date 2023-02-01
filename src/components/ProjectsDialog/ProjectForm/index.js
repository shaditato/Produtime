import { EditProject } from "./EditProject";

export function ProjectForm({ handleClose, id }) {
  return <EditProject handleClose={handleClose} id={id} />;
}
