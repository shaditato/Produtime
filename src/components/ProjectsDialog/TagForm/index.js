import { useState } from "react";
import { DeleteTag } from "./DeleteTag";
import { EditTag } from "./EditTag";

export function TagForm({ handleClose, id }) {
  const [deleteTag, setDeleteTag] = useState(false);

  const handleDelete = () => setDeleteTag(true);

  return deleteTag ? (
    <DeleteTag handleClose={handleClose} id={id} />
  ) : (
    <EditTag handleClose={handleClose} handleDelete={handleDelete} id={id} />
  );
}
