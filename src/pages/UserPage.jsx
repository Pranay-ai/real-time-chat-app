import { useParams, useNavigate } from "react-router-dom";
import MainDiv from "../components/styled-components/MainDiv";
import { useEffect, useState } from "react";
import { fetchUserById } from "../apifetch/user-api-fetch";
import { UserCircle, Mail, Calendar } from 'lucide-react';

export default function UserPage() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser(id) {
      try {
        const result = await fetchUserById(id);
        if (result?.data?.data) {
          setUser(result.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    }
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const handleMessageClick = () => {
    console.log(`Messaging user with ID: ${id}`);
    navigate(`/messages/${id}`);
  };

  if (id === null) {
    return (
      <MainDiv>
        <div className="bg-slate-50 p-8 rounded-md shadow-lg shadow-black dark:shadow-amber-50 w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
          <h1 className="text-3xl font-medium text-center">User Page</h1>
          <p className="text-gray-800 text-center mt-2">
            User ID: Not provided
          </p>
        </div>
      </MainDiv>
    );
  }

  if (!user) {
    return (
      <MainDiv>
        <div className="bg-slate-50 p-8 rounded-md shadow-lg shadow-black dark:shadow-amber-50 w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] flex items-center justify-center">
          <div className="animate-pulse w-full space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-32 h-32 bg-gray-200 rounded-full" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </MainDiv>
    );
  }

  return (
    <MainDiv>
      <div className="bg-slate-50 p-8 rounded-md shadow-lg shadow-black dark:shadow-amber-50 w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 transition-transform duration-300 hover:scale-105">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={`Profile of ${user.displayName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.displayName}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {user.firstName} {user.lastName}
            </p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center md:justify-start text-gray-600">
                <Mail className="mr-2 text-blue-500 w-4 h-4" />
                {user.emailVerified ? "Email Verified" : "Email Not Verified"}
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-600">
                <Calendar className="mr-2 text-blue-500 w-4 h-4" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-600">
                <Calendar className="mr-2 text-blue-500 w-4 h-4" />
                Last active {new Date(user.updatedAt).toLocaleDateString()}
              </div>
            </div>

            <button
              onClick={handleMessageClick}
              className="mt-6 w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </MainDiv>
  );
}