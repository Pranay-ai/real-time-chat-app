import { useNavigate, useParams } from "react-router-dom"; // Fixed router import
import { useState, useEffect, useCallback } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import { generateOTP, validateOTP } from "../apifetch/user-api-fetch";
import OTPInput from "../components/Otp";
import {routes} from "../utilities/routes"


export default function VerifyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [error, setError] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // ✅ Combined success & otp into one
  const [otpError, setOtpError] = useState(false); // ✅ Added separate OTP error handling
  const [isValidated, setIsValidated] = useState(false);

  // ✅ Function to send OTP (can be used for both initial load & resending)
  const sendOTP = async () => {
    setIsSendingOTP(true);
    setError(false);
    setOtpSent(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-sec delay

      const response = await generateOTP(id);
      console.log("Response", response);

      if (response.data.status) {
        setOtpSent(true); // ✅ Combined "success" and "otp" states
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsSendingOTP(false);
    }
  };

  // ✅ Trigger OTP on mount
  useEffect(() => {
    sendOTP();
  }, [id]);

  // ✅ Function to handle OTP verification
  const handleOtpVerification = useCallback(async (otp) => {
    try {
      const response = await validateOTP(id, otp);

      if (response.data.status) {
        console.log("OTP Verified");
        setOtpSent(false);
        setIsValidated(true);

        // ✅ Redirect to sign-in page

        await new Promise((resolve) => setTimeout(resolve, 3000)); // 2-sec delay


        navigate(routes.authroutes.login, {replace: true});
      } else {
        console.log("OTP Not Verified");
        setOtpError(true);
      }
    } catch (error) {
      console.log("Verification failed");
      setOtpError(true);
    }
  }, [id, navigate]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 items-center justify-center dark:from-gray-600 dark:via-gray-800 dark:to-gray-950">
      <div className="flex flex-col justify-center items-center bg-white w-1/3 h-1/3 rounded-lg p-4 dark:shadow-amber-50 shadow-xl shadow-black">
        
        {/* ✅ Showing Loading Indicator While OTP is Being Sent */}
        {isSendingOTP && (
          <div className="gap-3 flex flex-col">
            <LoadingIndicator />
            <p className="text-center text-xl font-bold">Sending Email...</p>
          </div>
        )}

        {/* ✅ Error Message */}
        {error && (
          <div className="gap-3 flex flex-col">
            <p className="text-center text-xl font-bold text-red-600">Error</p>
            <p className="text-center">An error occurred while sending OTP</p>
          </div>
        )}

        {/* ✅ OTP Sent Message */}
        {otpSent && (
          <div className="gap-3 flex flex-col">
            <p className="text-center text-xl font-bold text-green-600">OTP Sent</p>
            <p className="text-center">Please check your email for the OTP</p>
          </div>
        )}

        {/* ✅ OTP Input Section */}
        {otpSent && (
          <div className="gap-3 flex flex-col">
            <p className="text-center text-2xl">Enter the OTP</p>
            <OTPInput length={6} onComplete={handleOtpVerification} />
            {otpError && <p className="text-red-500 text-center">Invalid OTP. Try again.</p>}
            <button className="bg-blue-500 text-white p-2 rounded-lg mt-2" onClick={sendOTP}>
              Resend OTP
            </button>
          </div>
        )}

        {/* ✅ Success Message */}
        {isValidated && (
          <div className="gap-3 flex flex-col">
            <p className="text-center text-xl font-bold text-green-600">OTP Verified</p>
            <p className="text-center text-lg">Redirecting to sign-in page</p>
            <LoadingIndicator />
          </div>
        )}
      </div>
    </div>
  );
}
