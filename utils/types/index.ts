export type HackatonFilters = "all" | "past" | "on-going" | "future";

export interface IHackaton {
  id: number;
  name: string;
  description: string;
  numberOfProjects: number;
  projects: any;
  owner: string;
  startDate: number;
  endDate: number;
  voteStart: number;
  voteEnd: number;
  reward: number;
}

export interface IProject {
  id: number;
  projectName: string;
  projectDescription: string;
  smartContractAddr: string;
  frontEndURL: string;
  projectOwner: string;
  numberOfVotes: number;
}
