import apiClient from "./apiClient";
import { ENDPOINTS } from "./endPoint";


// 🔐 Auth APIs
export const sendOtp = (data) => {
  return apiClient.post(ENDPOINTS.SEND_OTP, data);
};
export const verifyOtp = async (data) => {
  const res = await apiClient.post(ENDPOINTS.VERIFY_OTP, data);
  return res.data;
};

export const onBoarding = async (data) => {
  const res = await apiClient.put(ENDPOINTS.onBoarding, data);
  return res.data;
};
export const completeOnboarding = async () => {
  const res = await apiClient.post(ENDPOINTS.completeOnboarding);
  return res.data;
};
export const socialLogin = async (data) => {
  const res = await apiClient.post(ENDPOINTS.socialLogin,data);
  return res.data;  
};
export const kundliBasicDetail = async () => {
  const res = await apiClient.get(ENDPOINTS.basicKudliDetail);

  return res.data;  
};

export const kundliPlanetryPosition = async () => {
  const res = await apiClient.get(ENDPOINTS.kundliplanetarypositions);
  return res.data;  
};
export const astrologyChart = async (type: string) => {
  const res = await apiClient.get(`${ENDPOINTS.astrologyChart}/${type}`);
  return res.data;
};
export const astrologyDasha = async (type: string) => {
  const res = await apiClient.get(`${ENDPOINTS.astrologyDasha}/${type}`);
  return res.data;
};

export const logout = async () => {
  const res = await apiClient.post(ENDPOINTS.logout);
  return res.data;
};