import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { resetPassword } from "../apifetch/user-api-fetch";
import LoadingIndicator from "../components/LoadingIndicator";
import { routes } from "../utilities/routes";

export default function ResetPassword() {
    const navigate= useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { resetToken } = useParams();

    // Function to validate passwords

    const handleSubmission = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const body = { newPassword: password };
        const result = await resetPassword(resetToken, body);

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a slow network

        setIsLoading(false);

        if (!result.error && result.data.status) {
            console.log("Password Reset Success");
            setSuccess(true);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a slow network
            // Redirect to login page
            navigate(routes.authroutes.login, { replace: true });

        } else {
            console.log("Error", result.error.message);
            setError(result.error.message || "An error occurred");
        }



    }




    const validatePasswords = (newPassword, newConfirmPassword) => {
        if (newPassword !== newConfirmPassword) {
            setError("Passwords do not match");
        } else {
            setError(null);
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePasswords(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        validatePasswords(password, newConfirmPassword);
    };

    return (
        <div className="flex dark:from-gray-600 dark:via-gray-800 dark:to-gray-950 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 items-center justify-center h-screen">
          <div className="bg-slate-50 p-8 rounded-md shadow-lg shadow-black dark:shadow-amber-50 w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%]">

            {isLoading ? (
                <div className="flex flex-col items-center justify-center p-6 gap-4 " >
                    <LoadingIndicator />
                    <h1 className="text-3xl text-green-500">Verifying</h1>
                </div>
            ) :(success ? (

                <div className="flex flex-col gap-6 justify-center items-center p-10">
                <h1 className="text-3xl text-green-500">Password Reset</h1>
                <p className="text-gray-800 text-center">
                  Your password has been reset successfully.
                </p>
                </div>
            ):(   <form className="mt-6" onSubmit={handleSubmission}>
              <div className="mb-4">
                <label htmlFor="password" className="block font-bold text-gray-800">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block font-bold text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
                {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
                disabled={!!error} // Disable button if there's an error
              >
                Reset Password
              </button>
            </form>))}
         
          </div>
        </div>
    );
}
