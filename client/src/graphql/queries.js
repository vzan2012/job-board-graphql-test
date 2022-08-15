import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";
const jobQuery = gql`
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

export const getJobs = async () => {
  const { jobs } = await request(GRAPHQL_URL, jobQuery);
  return jobs;
};
