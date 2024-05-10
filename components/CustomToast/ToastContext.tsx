// ToastContext.tsx
import React, {createContext, ReactNode, useContext, useState} from 'react';
import CustomToast from './CustomToast';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{children: ReactNode}> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {toastMessage && <CustomToast message={toastMessage} />}
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
