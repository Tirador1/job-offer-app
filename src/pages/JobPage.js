import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavbarMain from '../components/NavbarUser';
import axios from 'axios';
import { useEffect, useState } from 'react';

const JobPage = () => {
  const param = useParams();
  const [job, setJob] = useState({
    _id: '',
    jobTitle: '',
    jobLocation: '',
    jobDescription: '',
    salary: '',
    workingTime: '',
    company: {
      companyName: '',
      description: '',
      companyEmail: '',
    },
  });

  const handleGetJob = async () => {
    try {
      const response = await axios(
        `http://localhost:5000/jobs/getJob/${param.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        }
      );
      setJob(response.data.data);
    } catch (error) {
      console.error('Error fetching job', error);
    }
  };

  useEffect(() => {
    handleGetJob();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarMain />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.workingTime}</div>
                <h1 className="text-3xl font-bold mb-4">{job.jobTitle}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">{job.jobLocation}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">{job.jobDescription}</p>
                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>
                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">{job.company.companyName}</h2>
                <p className="my-2">{job.company.description}</p>
                <hr className="my-4" />
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.companyEmail}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Apply Job Now</h3>
                <Link
                  to={`/applyPage/${job._id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Apply for this job
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
