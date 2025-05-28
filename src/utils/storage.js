// src/utils/storage.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";

// Upload a file to Firebase Storage
export const uploadFile = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Get a download URL for a file in Firebase Storage
export const getFileUrl = async (path) => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};