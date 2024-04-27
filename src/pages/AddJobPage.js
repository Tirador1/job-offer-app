import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavbarHr from '../components/NavbarHr';
import axios from 'axios';

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('onsite');
  const [workingTime, setWorkingTime] = useState('full-time');
  const [seniorityLevel, setSeniorityLevel] = useState('Junior');
  const [jobDescription, setJobDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [company, setCompany] = useState('');

  const [companiesName, setCompaniesName] = useState([]);
  let companiesNameRes = [];

  const navigate = useNavigate();

  const getCompanies = async () => {
    try {
      const response = await axios(
        'http://localhost:5000/companies/getAllCompaniesForHR',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        }
      );

      if (response.status === 200) {
        companiesNameRes = response.data.data.companies.map((company) => {
          return company.companyName;
        });
        setCompaniesName(companiesNameRes);
      }
    } catch (error) {
      console.error('Error fetching companies', error);
    }
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const newJob = {
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      salary,
      technicalSkills: technicalSkills.split(','),
      softSkills: softSkills.split(','),
      company,
    };

    console.log(newJob);
    try {
      const response = await axios('http://localhost:5000/jobs/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accesstoken: localStorage.getItem('accesstoken'),
        },
        data: newJob,
      });

      if (response.status === 201) toast.success('Job Added Successfully');
      return navigate('/company-hr-dashboard');
    } catch (error) {
      if (error.response.status === 409) {
        return toast.error('Job already exists please try again');
      } else if (error.response.status === 500) {
        return toast.error('Job addition failed, please try again');
      } else {
        return toast.error('Job addition failed, please try again');
      }
    }
  };

  return (
    <>
      <NavbarHr />
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Software Engineer"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Job Location
                </label>
                <select
                  id="jobLocation"
                  name="jobLocation"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                >
                  <option value="onsite">On-site</option>
                  <option value="remotely">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="industry"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Working Time
                </label>
                <select
                  id="workingTime"
                  name="workingTime"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={workingTime}
                  onChange={(e) => setWorkingTime(e.target.value)}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="seniorityLevel"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Seniority Level
                </label>
                <select
                  id="seniorityLevel"
                  name="seniorityLevel"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={seniorityLevel}
                  onChange={(e) => setSeniorityLevel(e.target.value)}
                >
                  <option value="Junior">Junior</option>
                  <option value="Mid-Level">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Team-Lead">Lead</option>
                  <option value="CTO">CTO</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jobDescription"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Description
                </label>
                <input
                  type="text"
                  id="jobDescription"
                  name="jobDescription"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. We are looking for a software engineer..."
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="salary"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 100000"
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="technicalSkills"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Technical Skills
                </label>
                <input
                  type="text"
                  id="technicalSkills"
                  name="technicalSkills"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. HTML, CSS, JavaScript"
                  required
                  value={technicalSkills}
                  onChange={(e) => setTechnicalSkills(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="softSkills"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Soft Skills
                </label>
                <input
                  type="text"
                  id="softSkills"
                  name="softSkills"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Teamwork, Communication"
                  required
                  value={softSkills}
                  onChange={(e) => setSoftSkills(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <select
                  id="company"
                  name="company"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                >
                  {companiesName.map((companyName) => {
                    return (
                      <option key={companyName} value={companyName}>
                        {companyName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default AddJob;
