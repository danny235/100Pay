import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import CustomToast from "./CustomToast";

type ToastType = "success" | "error" | "info" | "string";
interface ToastMessage {
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToastQueue((prevQueue) => [...prevQueue, { message, type }]);
  };

  const hideToast = () => {
    setCurrentToast(null);
  };

  // Effect to display the next toast in the queue
  useEffect(() => {
    if (!currentToast && toastQueue.length > 0) {
      setCurrentToast(toastQueue[0]);
      setToastQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [currentToast, toastQueue]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {currentToast && (
        <CustomToast
          type={currentToast.type}
          message={currentToast.message}
          onClose={hideToast}
        />
      )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
