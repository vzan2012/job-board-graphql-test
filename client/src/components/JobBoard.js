import { useState, useEffect } from "react";

import JobList from "./JobList";
// import { jobs } from "../fake-data";
import { getJobs } from "./../graphql/queries.js";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    // getJobs().then((data) => setJobs(data));
    // Same as
    getJobs()
      .then(setJobs)
      .catch((err) => setError(true));
  }, []);

  if (error) return <p>Something went wrong !!!</p>;

  return (
    <div>
      <h1 className="title">Job Board</h1>

      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
