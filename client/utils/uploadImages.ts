const uploadImages = async (files: FileList): Promise<string[]> => {
  const imageArr: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append("file", files[i]);
    formData.append("upload_preset", "school-website-images");

    const imageRes = await fetch("https://api.cloudinary.com/v1_1/dmdtixluw/image/upload", {
      method: "POST",
      body: formData,
    });
    const file = await imageRes.json();

    imageArr.push(file.secure_url);
  }

  return imageArr;
};

export default uploadImages;
