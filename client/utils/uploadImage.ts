const uploadImage = async (files: FileList): Promise<any> => {
  if (files) {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "school-website-images");

    const imageRes = await fetch("https://api.cloudinary.com/v1_1/dmdtixluw/image/upload", {
      method: "POST",
      body: formData,
    });
    return await imageRes.json();
  } else {
    return null;
  }
};

export default uploadImage;
