import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarHr from "../components/NavbarHr";

const ShowApplicationsForJob = () => {
  const param = useParams();
  const [applications, setApplications] = useState([]);

  const accesstoken = localStorage.getItem("accesstoken").toString();

  const handleGetApplications = async () => {
    const response = await axios.request({
      method: "GET",
      url: `http://localhost:5000/companies/getApplicationsForJobs/${param.id}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken,
      },
    });
    setApplications(response.data.data);
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
                  <h3 className="text-xl">
                    <b>First Name: </b> {application.userId.firstName}{" "}
                    {application.userId.lastName}
                  </h3>
                  <p className="text-black">
                    <b>Email: </b>
                    {application.userId.email}
                  </p>
                  <p className="text-black">
                    <b>Phone Number: </b> {application.userId.mobileNumber}
                  </p>
                  <p className="text-black">
                    <b>Resume: </b>
                    {application.userResume}
                  </p>
                  <p className="text-black">
                    <b>User Tech Skills: </b>
                    {application.userTechSkills.join(", ")}
                  </p>
                  <p className="text-black">
                    <b>User Soft Skills: </b>
                    {application.userSoftSkills.join(", ")}
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
