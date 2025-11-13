import { AlertTriangle } from "lucide-react";
import React from "react";

interface DeleteModalProps {
  loading?:boolean
  item:string
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm, item, loading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-secondary rounded-lg shadow-xl p-6 w-[350px] md:w-[400px] ">
        <div className="flex flex-col items-center justify-center ">
          <AlertTriangle className="text-red-600 " size={40}/>
        <h2 className="text-2xl font-bold  mb-4">
          Confirm Delete
        </h2>
        </div>
        <p className=" mb-6">
          Are you sure you want to delete this {item}?. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-primary text-secondary hover:bg-muted-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
           {loading ? "Deleting.." : "Delete"} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
