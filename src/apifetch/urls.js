
export const urls ={

    users :{    
        signup: "/users/sign-up",
        login: "/users/sign-in",
        logout: "/users/sign-out",
        generateotp: "/users/generate-otp",
        validateotp: "/users/verify-otp",
        sendresetemail:"/users/forgot-password",
        resetpassword:"/users/reset-password",
        update:"/users/update-user",
        search:"/users/search",
        getUser:"/users",
    }

}


export const structureOptions = (method, data = null, auth = null) => {
    const options = {
      method: method.toUpperCase(), // Ensure method is uppercase
      headers: {}, // Start with an empty headers object
    };
  
    // Add Authorization header if an auth token is provided
    if (auth) {
      options.headers.Authorization = `Bearer ${auth}`;
    }
  
    // If data is provided, check if it's FormData or JSON
    if (data && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      if (data instanceof FormData) {
        // If data is FormData, do not set Content-Type (fetch will handle it)
        options.body = data;
      } else {
        // Otherwise, assume JSON and stringify it
        options.body = JSON.stringify(data);
        options.headers["Content-Type"] = "application/json";
      }
    }
  
    return options;
  };
  