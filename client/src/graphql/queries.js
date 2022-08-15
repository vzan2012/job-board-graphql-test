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
