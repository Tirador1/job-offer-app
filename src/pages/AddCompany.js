import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavbarHr from "../components/NavbarHr";
import axios from "axios";

const AddCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newCompany = {
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
    };
    console.log(newCompany);

    try {
      const response = await axios(
        "http://localhost:5000/companies/createCompany",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accesstoken: localStorage.getItem("accesstoken"),
          },
          data: newCompany,
        }
      );

      if (response.status === 201) toast.success("Company Added Successfully");
      return navigate("/company-hr-dashboard");
    } catch (error) {
      if (error.response.status === 409) {
        return toast.error("Company already exists please try again");
      } else {
        return toast.error("Company addition failed, please try again");
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
                Add Company
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Google"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. A software company"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="industry"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Technology"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 123 Main St, New York, NY"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="numberOfEmployees"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Number of Employees
                </label>
                <input
                  type="text"
                  id="numberOfEmployees"
                  name="numberOfEmployees"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 100"
                  required
                  value={numberOfEmployees}
                  onChange={(e) => setNumberOfEmployees(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="companyEmail"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Email
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg@example.com"
                  required
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default AddCompany;
