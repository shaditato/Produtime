/**
 * Partition active & archived projects as [projectId, project] pairs
 * @param projects object from state
 * @returns [active, archived] sorted alphabetically case-insensitive
 */
export const partitionArchived = (projects) => {
  const partitions = Object.entries(projects)
    .sort(([_a, a], [_b, b]) => a.name.localeCompare(b.name))
    .reduce(
      ([active, archived], [projectId, project]) => {
        if (project.archived) {
          return [active, [...archived, [projectId, project]]];
        }
        return [[...active, [projectId, project]], archived];
      },
      [[], []]
    );

  return partitions;
};
