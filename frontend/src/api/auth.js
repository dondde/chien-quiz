import axios from 'axios';

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    const res = await axios.get('http://127.0.0.1:8000/api/auth/users/me/', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Erreur utilisateur connecté :", error);
    return null;
  }
};
