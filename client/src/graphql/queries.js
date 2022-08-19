import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";
const allJobsQuery = gql`
  query {
    jobs {
      id
      title
      company {
        name
      }
    }
  }
`;

const getJobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

const getCompanyQuery = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

const createJobQuery = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
    }
  }
`;

export const getJobs = async () => {
  const { jobs } = await request(GRAPHQL_URL, allJobsQuery);
  return jobs;
};

export const getJob = async (id) => {
  const variables = {
    id,
  };
  const { job } = await request(GRAPHQL_URL, getJobQuery, variables);
  return job;
};

export const getCompany = async (id) => {
  const variables = { id };

  const { company } = await request(GRAPHQL_URL, getCompanyQuery, variables);

  return company;
};

export const createJob = async (input) => {
  const variables = {
    input,
  };

  const { job } = await request(GRAPHQL_URL, createJobQuery, variables);
  return job;
};
