import ToastMessage from '@component/ToastMessage';
import React, { createContext, useState, useContext, useRef } from 'react';

export type ToastContextType = {
  showToast: (config: ToastConfigs) => void
}

const ToastContext = createContext<ToastContextType>({ showToast: (config: ToastConfigs) => {}});

export type ToastConfigs = {
  type: 'success' | 'danger' | 'info' | 'warning',
  description: string;
  timeout: number;
}

export const ToastProvider = ({ children }) => {
  const [toastConfig, setToastConfig] = useState<ToastConfigs>();
  const toastRef = useRef(null);

  const showToast = (config: ToastConfigs) => {
    setToastConfig(config);
    
    if (toastRef.current) {
      toastRef.current.show();
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastMessage {...toastConfig} ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
