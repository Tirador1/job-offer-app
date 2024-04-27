import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavbarHr from '../components/NavbarHr';
import axios from 'axios';

const EditJobPage = () => {
  const { id } = useParams();
  // const [jobTitle, setJobTitle] = useState('');
  // const [jobLocation, setJobLocation] = useState('');
  // const [workingTime, setWorkingTime] = useState('full-time');
  // const [seniorityLevel, setSeniorityLevel] = useState('Junior');
  // const [jobDescription, setJobDescription] = useState('');
  // const [salary, setSalary] = useState('');
  // const [technicalSkills, setTechnicalSkills] = useState('');
  // const [softSkills, setSoftSkills] = useState('');

  const navigate = useNavigate();

  const [job, setJob] = useState({
    _id: '',
    jobTitle: '',
    jobLocation: '',
    workingTime: '',
    seniorityLevel: '',
    jobDescription: '',
    salary: '',
    technicalSkills: '',
    softSkills: '',
  });
  const getJob = async () => {
    try {
      const response = await axios(`http://localhost:5000/jobs/getJob/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accesstoken: localStorage.getItem('accesstoken'),
        },
      });
      setJob(response.data.data);
    } catch (error) {
      toast.error('Error fetching job', error);
    }
  };

  useEffect(() => {
    getJob();
    // eslint-disable-next-line
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios(
        `http://localhost:5000/jobs/updateJob/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
          data: job,
        }
      );

      if (response.status === 200) {
        toast.success('Job Updated Successfully');
        return navigate('/');
      }
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
                  placeholder={job.jobTitle}
                  required
                  value={job.jobTitle}
                  onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
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
                  selected={job.jobLocation}
                  required
                  value={job.jobLocation}
                  onChange={(e) =>
                    setJob({ ...job, jobLocation: e.target.value })
                  }
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
                  selected={job.workingTime}
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={job.workingTime}
                  onChange={(e) =>
                    setJob({ ...job, workingTime: e.target.value })
                  }
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
                  selected={job.seniorityLevel}
                  required
                  value={job.seniorityLevel}
                  onChange={(e) =>
                    setJob({ ...job, seniorityLevel: e.target.value })
                  }
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
                  placeholder={job.jobDescription}
                  required
                  value={job.jobDescription}
                  onChange={(e) =>
                    setJob({ ...job, jobDescription: e.target.value })
                  }
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
                  placeholder={job.salary}
                  required
                  value={job.salary}
                  onChange={(e) => setJob({ ...job, salary: e.target.value })}
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
                  placeholder={job.technicalSkills}
                  required
                  value={job.technicalSkills}
                  onChange={(e) =>
                    setJob({ ...job, technicalSkills: e.target.value })
                  }
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
                  placeholder={job.softSkills}
                  required
                  value={job.softSkills}
                  onChange={(e) =>
                    setJob({ ...job, softSkills: e.target.value })
                  }
                />
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
export default EditJobPage;
