import api from "./axiosConfig";
import { urls } from "./urls";


export async function userSignup(body) {
  try {
    const response = await api.post(urls.users.signup, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}

export async function userUpdate(body, id) {
  try {
    const response = await api.patch(urls.users.update + `/${id}` , body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}

export async function fetchUserById(id) {
  try {
    const response = await api.get(`${urls.users.getUser}/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }

}




export async function generateOTP(id) {
  try {
    const response = await api.post(`${urls.users.generateotp}/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}

export async function validateOTP(id, otp) {
  try {
    const response = await api.post(`${urls.users.validateotp}/${id}`, { otp });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}

export async function userLogin(body) {
  try {
    const response = await api.post(`${urls.users.login}`, body);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}


export async function userSignOut() {
  try {
    const response = await api.post(`${urls.users.logout}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}

export async function sendResetEmail(email) {
  try {
    const response = await api.post(`${urls.users.sendresetemail}/${email}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}

export async function resetPassword(token, body) {
  try {
    const response = await api.post(`${urls.users.resetpassword}/${token}`, body);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}

export async function fetchUsersByDisplayName(displayName) {
  try {
    const response = await api.get(`${urls.users.search}/${displayName}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data || error.message };
  }
}
