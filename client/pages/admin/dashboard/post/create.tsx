import React, { useState } from "react";
import { useRouter } from "next/router";

import PostEditorLayout from "../../../../components/admin/PostEditorLayout";
import uploadImages from "../../../../utils/uploadImages";

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPost = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const images = await uploadImages(e.target.images.files);

      const res = await fetch("/api/posts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: e.target.user.value.trim(),
          title: e.target.title.value.trim(),
          body: e.target.body.value.trim().replaceAll(/(?:\r|\n|\r\n)/g, "<br/>"),
          images: images,
        }),
      });

      if (res.ok) {
        await router.push("/admin/dashboard");
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <PostEditorLayout setImages={setImages} images={images} isLoading={isLoading} onSubmit={createPost} />
    </>
  );
};

export default CreatePostPage;
