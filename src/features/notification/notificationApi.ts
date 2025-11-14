import apiClient from "../../services/axiosInstance";

//get notification
export const getNotificationsApi = (limit?:number, lastDate?:string) => {
  return apiClient.get(`/notification?limit=${limit}&lastDate=${lastDate}`);
};

//get unread-count
export const getUnreadCountApi = () => {
  return apiClient.get("/notification/unread-count");
};

// mark notification read
export const markNotificationAsReadApi = (notificationId: string) => {
  return apiClient.patch(`/notification/read/${notificationId}`);
};

// mark all notification read
export const markAllNotificationsAsReadApi = () => {
  return apiClient.patch("/notification/read-all");
};

//delete single notification
export const deleteSingleNotificationApi = (notificationId: string) => {
  return apiClient.delete(`/notification/remove/${notificationId}`);
};

//delete all notification
export const deleteAllNotificationsApi = () => {
  return apiClient.delete(`/notification/remove-all`);
};

//get first 3 notification
export const getFirst3NotificationApi = () => {
  return apiClient.get("/notification/dashboard")
}