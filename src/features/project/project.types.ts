export type ProjectEnvironment = 'production' | 'staging' | 'development';

export type ProjectStatus = 'active' | 'inactive';

export type Project = {
  id: string;
  name: string;
  websiteUrl: string;
  environment: ProjectEnvironment;
  projectKey: string;
  status: ProjectStatus;
  totalErrors: number;
  lastEventTime: string;
  createdDate: string;
};
