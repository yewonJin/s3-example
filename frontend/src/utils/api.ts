export const getImages = async () => {
  return await (await fetch("http://localhost:4000/image")).json();
};

export const postImages = async (formData: FormData) => {
  await fetch("http://localhost:4000/image", {
    method: "POST",
    body: formData,
  });
};

export const deleteImage = async (fileName: string) => {
  await fetch(`http://localhost:4000/image/${fileName}`, {
    method: "DELETE",
  });
};
