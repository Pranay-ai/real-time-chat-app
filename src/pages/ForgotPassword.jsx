import { useState } from "react";
import { sendResetEmail } from "../apifetch/user-api-fetch";
import LoadingIndicator from "../components/LoadingIndicator";
import MainDiv from "../components/styled-components/MainDiv";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    const email = e.target.email.value;
    try {
      const result = await sendResetEmail(email);
      console.log("Response", result);

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a slow network
      
      if (!result.error && result.data.status) {
        setSuccess(true);
      } else {
        console.log("Error", result.error?.message);
        setError(result.error?.message || "An error occurred");
      }
    } catch (err) {
      console.error("Request failed", err);
      setError("Failed to send reset email");
    }
    
    setIsLoading(false);
  };

  return (
    <MainDiv>
            <div className="bg-slate-50 p-8 rounded-md shadow-lg shadow-black dark:shadow-amber-50 w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%]">
        {isLoading ? (
            <div className="flex flex-col gap-4 items-center justify-center p-6">          
                <LoadingIndicator />
                <h1 className="text-3xl text-green-500">Verifying</h1>
            
            </div>

        ) : success ? (
          <div className="flex flex-col gap-6 justify-center items-center p-10">
            <h1 className="text-3xl text-green-500">Email Sent</h1>
            <p className="text-gray-800 text-center">
              An email has been sent to your email address with instructions to reset your password.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-medium text-center">Forgot Password</h1>
            <p className="text-gray-800 text-center mt-2">
              Enter your email address to reset your password.
            </p>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  autoComplete="email"
                  required
                  onChange={() => setError(null)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 transition"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </MainDiv>
  );
}
