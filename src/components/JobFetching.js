import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

import axios from 'axios';

const JobFetching = ({ isHome = false, isHr = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const accesstoken = localStorage.getItem('accesstoken').toString();

  useEffect(() => {
    const fetchJobs = async () => {
      const baseUrl = isHr
        ? 'http://localhost:5000/jobs/getAllJobsForAHr'
        : isHome
        ? 'http://localhost:5000/jobs/getLastThreeJobsWithTheirCmpanies'
        : 'http://localhost:5000/jobs/getAllJobsWithTheirCmpanies';

      try {
        const response = await axios.request({
          method: 'GET',
          url: baseUrl,
          headers: {
            'Content-Type': 'application/json',
            accesstoken,
          },
        });
        setJobs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs', error);
        setLoading(false);
      }
    };

    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default JobFetching;
