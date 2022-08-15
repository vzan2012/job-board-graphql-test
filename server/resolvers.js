import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    // greeting: () => `Hello !!!`,
    // jobs: () => [
    //   { id: "Job:1", title: "Job title1", description: "Job Desc1" },
    //   { id: "Job:2", title: "Job title2", description: "Job Desc2" },
    //   { id: "Job:3", title: "Job title3", description: "Job Desc3" },
    // ],

    // Return the job by id
    job: (root, { id }) => Job.findById(id),

    // Returns all the jobs
    jobs: () => Job.findAll(),
  },

  Job: {
    company: async (job) => await Company.findById(job.companyId),
  },
};
