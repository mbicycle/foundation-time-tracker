import { useGraphProjets } from './query-hooks';
import type { ProjectList } from './types';

export const useProjetList = (): ProjectList => {
  const { data: projects, error } = useGraphProjets();

  const projectList = projects?.items.map((project) => (
    { name: project.fields.Title, id: project.fields.id }
  ));

  projectList?.sort((a, b) => a.name.localeCompare(b.name));

  return { error, projectList };
};
