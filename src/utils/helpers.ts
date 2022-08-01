import { toast } from "react-toastify";

export const passwordExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

export const getFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setToStorage = (data: any, key: string) => {
  localStorage.setItem(key, data);
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const notifySuccess = (message: string) => {
  toast.success(message, { position: toast.POSITION.TOP_CENTER });
};
export const notifyError = (message: string) => {
  toast.error(message, { position: toast.POSITION.TOP_CENTER });
};
