import { postImages } from './api';

export const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
   if (!e.target.files) return;

   const formData = new FormData();

   for (let i = 0; i < e.target.files.length; i++) {
      formData.append(`file${i}`, e.target.files[i]);
   }

   postImages(formData);
};
