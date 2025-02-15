import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type) => {
  toast[type](message, { position: "top-right", autoClose: 3000 });
};

const Notification = () => {
  return null; // No UI component needed; just calling toast notifications
};

export default Notification;
