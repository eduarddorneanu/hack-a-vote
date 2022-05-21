import { IHackaton, IProject } from "../types";

export const mapHackatonToIHackaton = (
  hackaton: any,
  index: number
): IHackaton => ({
  id: index,
  name: hackaton.name,
  projects: [],
  owner: "",
  numberOfProjects: 0,
  endDate: hackaton.endDate.toNumber() * 1000,
  description: hackaton.description,
  reward: hackaton.reward.toNumber(),
  startDate: hackaton.startDate.toNumber() * 1000,
  voteEnd: hackaton.voteEnd.toNumber() * 1000,
  voteStart: hackaton.voteStart.toNumber() * 1000,
});

export const mapProjectToIProject = (
  project: any,
  index: number
): IProject => ({
  id: index,
  frontEndURL: project.url,
  numberOfVotes: project.votes.toNumber(),
  projectDescription: "",
  projectName: project.name,
  projectOwner: "",
  smartContractAddr: "",
});
