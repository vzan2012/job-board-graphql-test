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
    job: (_root, { id }) => Job.findById(id),

    company: (_root, { id }) => Company.findById(id),

    // Returns all the jobs
    jobs: () => Job.findAll(),
  },

  Mutation: {
    // Two parameters - root and the args is destructured
    createJob: (_root, { input }) => Job.create(input),
  },

  Job: {
    company: async (job) => await Company.findById(job.companyId),
  },

  Company: {
    jobs: async (company) =>
      await Job.findAll((job) => job.companyId === company.id),
  },
};
