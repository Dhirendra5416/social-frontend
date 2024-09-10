import React, { useState } from "react";
import { Inputfield } from "../components/atom/Inputfield";
import { PrimaryButton } from "../components/atom/button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (file) data.append("file", file);

    try {
      await axios.post("http://localhost:8800/api/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Clear form data on successful registration
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
      });
      setFile(null); // Clear the file input
      setErr(null); // Clear any previous errors
      navigate("/login"); // Redirect to home page
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setErr(error.response ? JSON.stringify(error.response.data) : "An unexpected error occurred");
      if (error.response && error.response.data && error.response.data.message === "User already exists") {
        setErr("User already exists. Please <a href='/login'>login</a>.");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          technotech
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Profile Picture Input */}
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>
              <Inputfield
                label={"Name"}
                type={"text"}
                name={"name"}
                required={true}
                onChange={handleChange}
                value={formData.name}
              />
              <Inputfield
                label={"Username"}
                type={"text"}
                name={"username"}
                required={true}
                onChange={handleChange}
                value={formData.username}
              />
              <Inputfield
                label={"Email"}
                type={"email"}
                name={"email"}
                required={true}
                onChange={handleChange}
                value={formData.email}
              />
              <Inputfield
                label={"Password"}
                type={"password"}
                name={"password"}
                required={true}
                onChange={handleChange}
                value={formData.password}
              />
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {err && <div className="text-red-500" dangerouslySetInnerHTML={{ __html: err }}></div>}
              <PrimaryButton label="Create an account" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
