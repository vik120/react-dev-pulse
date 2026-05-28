import { create } from 'zustand';

import { AddProjectSchema } from './addProject.schema';
import { Project, ProjectEnvironment } from './project.types';

type ProjectStore = {
  projects: Project[];
  isLoading: boolean;
  errorMessage: string;
  setProjects: (projects: Project[]) => void;
  fetchProjects: () => Promise<void>;
  addProject: (project: AddProjectSchema) => void;
  deleteProject: (projectId: string) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  isLoading: false,
  errorMessage: '',
  setProjects: (projects: Project[]) => set({ projects }),
  fetchProjects: async () => {
    try {
      set({
        isLoading: true,
        errorMessage: '',
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      set({
        errorMessage:
          error instanceof Error ? error.message : 'Error fetching projects',
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  addProject: (project: AddProjectSchema) => {
    try {
      const createdAt = new Date().toISOString();
      const environment =
        project.developmentType.toLowerCase() as ProjectEnvironment;

      set((state) => ({
        projects: [
          ...state.projects,
          {
            id: crypto.randomUUID(),
            name: project.projectName,
            websiteUrl: project.websiteUrl,
            environment,
            projectKey: project.projectName.toLowerCase().replace(/\s+/g, '-'),
            status: 'active',
            totalErrors: 0,
            lastEventTime: createdAt,
            createdDate: createdAt,
          },
        ],
        isLoading: false,
        errorMessage: '',
      }));
    } catch (error) {
      console.error('Error adding project:', error);
      set({
        isLoading: false,
        errorMessage:
          error instanceof Error ? error.message : 'Error adding project',
      });
    }
  },
  deleteProject: (projectId: string) => {
    try{
        set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
        }));
    }  catch (error) {
      console.error('Error adding project:', error);
      set({
        isLoading: false,
        errorMessage:
          error instanceof Error ? error.message : 'Error adding project',
      });
    }
  },
}));
