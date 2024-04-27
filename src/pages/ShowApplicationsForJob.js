import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavbarHr from '../components/NavbarHr';

const ShowApplicationsForJob = () => {
  const param = useParams();
  const [applications, setApplications] = useState([]);
  const [userData, setUserData] = useState([]);

  const usersId = [];
  const usersProfile = [];
  const handleGetApplications = async () => {
    try {
      const response = await axios(
        `http://localhost:5000/companies/getApplicationsForJobs/${param.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        }
      );
      if (response.status === 200) {
        await setApplications(response.data.data.applications);
        applications.map(async (application) => {
          return await usersId.push(application.userId);
        });
        for (const iterator of usersId) {
          await getUserData(iterator);
        }
        setUserData(usersProfile);
      }
    } catch (error) {
      toast.error('Error fetching applications', error);
    }
  };
  const getUserData = async (userId) => {
    try {
      const response = await axios(
        `http://localhost:5000/users/getProfileData/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        }
      );
      usersProfile.push(response.data.user);
    } catch (error) {
      toast.error('Error fetching user data', error);
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    handleGetApplications();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarHr />
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Applications
            </h2>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <div
                  key={index}
                  className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border"
                >
                  {console.log('userData', userData)}
                  <h3 className="text-xl">
                    <b>User Name: </b> {userData[index]?.firstName}{' '}
                    {userData[index]?.lastName}
                  </h3>
                  <p className="text-black">
                    <b>Email: </b>
                    {userData[index]?.email}
                  </p>
                  <p className="text-black">
                    <b>Phone Number: </b> {userData[index]?.mobileNumber}
                  </p>
                  <p className="text-black">
                    <b>Resume: </b>
                    {application.userResume}
                  </p>
                  <p className="text-black">
                    <b>User Tech Skills: </b>
                    {application.userTechSkills.join(', ')}
                  </p>
                  <p className="text-black">
                    <b>User Soft Skills: </b>
                    {application.userSoftSkills.join(', ')}
                  </p>
                  <p className="text-black">
                    <b>Submited At: </b>
                    {application.applicationDate}
                  </p>
                </div>
              ))
            ) : (
              <p>No applications</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowApplicationsForJob;
