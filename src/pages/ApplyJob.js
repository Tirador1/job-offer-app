import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavbarUser from '../components/NavbarUser';
import axios from 'axios';

const ApplyJob = () => {
  const { id } = useParams();
  const [userTechSkills, setUserTechSkills] = useState(['']);
  const [userSoftSkills, setUserSoftSkills] = useState(['']);
  const [userResume, setUserResume] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const object = {
      userTechSkills: userTechSkills.split(','),
      userSoftSkills: userSoftSkills.split(','),
      userResume,
    };
    try {
      const response = await axios(
        `http://localhost:5000/jobs/applyForAJob/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
          data: object,
        }
      );

      if (response.status === 201)
        toast.success('Job application submitted successfully');
      return navigate(`/job/${id}`);
    } catch (error) {
      if (error.response.status === 409) {
        return toast.error('You have already applied for this job');
      }

      if (error.response.status === 401) {
        return toast.error('Job application failed, please try again');
      } else {
        toast.error('Job application failed, please try again');
      }
    }
  };

  return (
    <>
      <NavbarUser />
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Apply for Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Technical Skills
                </label>
                <input
                  type="text"
                  id="techSkills"
                  name="techSkills"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. HTML, CSS, JavaScript"
                  required
                  value={userTechSkills}
                  onChange={(e) => setUserTechSkills(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Soft Skills
                </label>
                <input
                  type="text"
                  id="softSkills"
                  name="softSkills"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Teamwork, Communication"
                  required
                  value={userSoftSkills}
                  onChange={(e) => setUserSoftSkills(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Resume
                </label>
                <input
                  type="text"
                  id="resume"
                  name="resume"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Paste your resume here"
                  required
                  value={userResume}
                  onChange={(e) => setUserResume(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Apply for Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default ApplyJob;
