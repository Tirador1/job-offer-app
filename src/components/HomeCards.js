import React from 'react';
import { Link } from 'react-router-dom';

const Homecards = () => {
  return (
    <>
      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Your Companies</h2>
              <p className="mt-2 mb-4">Add a new company to the job board</p>
              <Link
                to="/add-company"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Add Company
              </Link>
            </div>
            <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Your Jobs</h2>
              <p className="mt-2 mb-4">Add a new job to the job board</p>
              <Link
                to="/add-job"
                className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
              >
                Add Job
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homecards;
