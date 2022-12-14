import { useState, useEffect } from "react";

import { useParams } from "react-router";
// import { companies } from '../fake-data';
import { getCompany } from "./../graphql/queries";

import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCompany(companyId)
      .then(setCompany)
      .catch((err) => setError(true));
  }, [companyId]);

  // const company = companies.find((company) => company.id === companyId);

  if (error) {
    return <p>Something went wrong !!!</p>;
  } else if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
