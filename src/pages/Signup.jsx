import { Link, useNavigate } from "react-router-dom";

import personImage from "../assets/person.png";

import { useCallback, useRef, useState } from "react";
import { userSignup } from "../apifetch/user-api-fetch";
import { routes } from "../utilities/routes";

export default function Signup() {
  const navigate= useNavigate()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);



  const handleFormSubmit = useCallback(async (e)=>{
    e.preventDefault()
    const  formData = new FormData(e.target);
    formData.append("profilePicture", imageRef.current.files[0]);
    
    try {
      let result = await userSignup(formData);

      console.log("Response",result);


      if(result.data.status){

        navigate(routes.authroutes.verifyemail+"/"+result.data.data.id)

      }

      if (result.error) {
        console.error(result.error);
      }
      
    } catch (error) {

      console.error(error) 
    }

  },[]);

  const imageRef = useRef(null);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError(value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setError(value !== password);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex dark:bg-black bg-amber-50 items-center justify-center h-screen">
   <div className="bg-slate-50 p-8 rounded-md shadow-lg shadow-black max-h-[70%] overflow-y-auto dark:shadow-amber-50 w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%] light-scrollbar dark:dark-scrollbar">

        <h1 className="text-3xl font-medium text-center">Sign Up</h1>
        <form className="mt-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 mt-4 items-center justify-center">
            <img
              src={image || personImage}
              className="rounded-full h-16 w-16"
              ref={imageRef}
              alt="Profile"
            />

            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              id="uploadImage"
              ref={imageRef} // Assign ref here
            />

            <label
              htmlFor="uploadImage"
              className="cursor-pointer 0 px-3 py-1 rounded-md border-2 border-black"
            >
              Upload Profile Image
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block font-bold text-gray-800"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block font-bold text-gray-800">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block font-bold text-gray-800"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-bold text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-bold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className={`block font-bold text-gray-800 ${
                error ? "text-red-600" : ""
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={error}
            className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white ${
              error ? "opacity-50 cursor-not-allowed" : ""
            } text-sm`}
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
