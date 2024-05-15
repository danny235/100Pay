// ToastContext.tsx
import React, {createContext, ReactNode, useContext, useState} from 'react';
import CustomToast from './CustomToast';
type ToastType = "success" | "error" | "info" | "string";
interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{children: ReactNode}> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<string | null>(null)

  const showToast = (message: string, type: string) => {
    setToastMessage(message);
    setToastType(type)
  };

  const hideToast = () => {
    setToastMessage("")
    setToastType("")
  }

  return (
    <ToastContext.Provider value={{showToast}}>
      {toastMessage && <CustomToast type={toastType} message={toastMessage} onClose={hideToast} />}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
