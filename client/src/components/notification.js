import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-center",
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    borderRadius: '16px',
    border: '1px solid rgba(227, 255, 0, 0.1)',
    backgroundColor: '#050505',
    color: '#fff',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }
};

export const showToast = (message, type = "info") => {
  const icons = {
    success: "⚡",
    error: "⚠",
    warn: "☢",
    info: "🛈"
  };

  toast[type](message, {
    ...toastOptions,
    icon: icons[type] || icons.info
  });
};

const Notification = () => {
  return null;
};

export default Notification;
