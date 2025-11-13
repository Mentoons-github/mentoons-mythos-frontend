export interface NotificationTypes {
  _id?: string;
  receiverId: string;
  message: string;
  type: string;
  isRead?: boolean;
  relatedId: string;
  createdAt: string;
  isDeleted?: boolean;
}
