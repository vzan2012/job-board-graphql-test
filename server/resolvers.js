import { Job, Company, User } from "./db.js";

const rejectIf = (condition) => {
  if (condition) {
    throw new Error("Unauthorized");
  }
};

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
    createJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(id);
      rejectIf(user.companyId !== job.companyId);

      return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      const jobExists = await Job.findById(input.id);
      if (jobExists && user.companyId === jobExists.companyId) {
        return Job.update({ ...input, companyId: user.companyId });
      } else {
        throw new Error("No Job ID found");
      }
    },
  },

  Job: {
    company: async (job) => await Company.findById(job.companyId),
  },

  Company: {
    jobs: async (company) =>
      await Job.findAll((job) => job.companyId === company.id),
  },
};
