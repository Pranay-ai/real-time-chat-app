import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { userLogin } from "../apifetch/user-api-fetch";
import { setUser } from "../store/features/auth-feature";
import LoadingIndicator from "../components/LoadingIndicator"
import { routes } from "../utilities/routes";
export default function SignIn() {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    
    
    
    
    
    
    
    const handleSignIn = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const body = { email, password };


      setIsLoading(true);
      const result = await userLogin(body);

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a slow network

        setIsLoading(false);
        console.log("Response Login",result)

      if (!result.error && result.data.status) {
        dispatch(setUser(result.data.data));
        // console.log("Response Data",response.data)
        navigate(routes.authroutes.home, { replace: true });
        console.log("Response Data",result.data)
      } else {
        console.log("Error", result.error.message);
      }
    };

 

    return (
        <div className="flex dark:from-gray-600 dark:via-gray-800 dark:to-gray-950 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 items-center justify-center h-screen">
          <div className="bg-slate-50 p-8 rounded-md shadow-lg shadow-black dark:shadow-amber-50 w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%] ">
            {isLoading ? (
                <div className="flex flex-col gap-6 justify-center items-center p-10">              
                <LoadingIndicator /> 
                <h1 className="text-3xl text-green-500">Verifying</h1>
              </div>

            ) : (
              <>
                <h1 className="text-3xl font-medium text-center">Sign In</h1>
                <form className="mt-6" onSubmit={handleSignIn}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-bold text-gray-800">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      required
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
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
                <div className="mt-4 cursor-pointer">
                  <Link to="/sign-up" className="text-blue-600 hover:underline">
                    Create an account
                  </Link>
                  <Link to="/forgot-password" className="text-blue-600 hover:underline ml-4">
                    Forgot Password?
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )
}
