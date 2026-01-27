export type NewProject = {
  name: string;
  electionDate: Date | null;
  electionType: string | null;
};

export const toNewProjectDTO = (project: NewProject) => {
  return {
    name: project.name,
    election_date: project.electionDate,
    election_type: project.electionType,
  };
};
