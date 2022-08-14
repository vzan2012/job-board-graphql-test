import { Job } from "./db.js";

export const resolvers = {
  Query: {
    // greeting: () => `Hello !!!`,
    // jobs: () => [
    //   { id: "Job:1", title: "Job title1", description: "Job Desc1" },
    //   { id: "Job:2", title: "Job title2", description: "Job Desc2" },
    //   { id: "Job:3", title: "Job title3", description: "Job Desc3" },
    // ],
    jobs: () => Job.findAll(),
  },
};
