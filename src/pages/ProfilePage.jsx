import { useEffect, useRef, useState } from "react";
import api from "../apifetch/axiosConfig";
import { userUpdate } from "../apifetch/user-api-fetch";
import MainDiv from "../components/styled-components/MainDiv";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    displayName: "",
    profilePicture: null,
    id: "",
  });
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        const user = response.data.data;
        setUserData(user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Oops! Failed to load user profile.");
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (imageRef.current.files[0]) {
      formData.append("profilePicture", imageRef.current.files[0]);
    }

    try {
      const response = await userUpdate(formData, userData.id);
      if (response.error) {
        console.error("Failed to update user:", response.error);
        setError("Failed to update user profile.");
        setIsModalOpen(false);
        return;
      } else {
        setIsModalOpen(false);
      }
    } catch (err) {}
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );

  return (
        <MainDiv>

<div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] p-8 relative flex flex-col items-center">
        {/* Profile Picture */}
        <div className="flex flex-col shadow-2xl shadow-gray-700 items-center justify-center p-4 rounded-lg">
          {" "}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-400 shadow-lg">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p>@{userData.displayName}</p>
        </div>

        {/* User Info */}
        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{userData.email}</p>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8">
          <button
            className="px-6 py-2 text-lg font-semibold bg-gray-800 text-white rounded-full shadow-md transition-transform transform hover:scale-110 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal with proper backdrop blur */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] z-50">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Profile
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 p-10"
            >
              <input
                type="text"
                name="displayName"
                placeholder="Display Name"
                value={userData.displayName}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={userData.firstName}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={userData.lastName}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="file"
                className="p-2 border rounded"
                ref={imageRef}
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      )}
        </MainDiv>
  );
}
