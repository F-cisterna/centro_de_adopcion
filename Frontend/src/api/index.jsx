import axiosInstance from './axiosConfig';

export async function loginApi(payload) {
  try {
    const res = await axiosInstance.post('/auth/login', payload);
    return res.data; // token should be here
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data }; // ErrorInfo structure
    }
    return { error: { message: 'Error de conexión' } };
  }
}