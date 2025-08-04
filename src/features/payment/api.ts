import apiClient from "../../services/axiosInstance";

export const initiatePayment = (data: {
  price: number;
  itemType: string;
  itemName: string | null;
}) => {
  return apiClient.post("/payment/initiate", data);
};
