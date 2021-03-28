import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Post } from "../../../../../types/Posts";
import PostEditorLayout from "../../../../../components/admin/PostEditorLayout";
import uploadImages from "../../../../../utils/uploadImages";

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const [images, setImages] = useState<string[]>([]);
  const [oldImages, setOldImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPost = async (uuid: string | string[]) => {
    const res = await fetch(`/api/posts/${uuid}`);
    return await res.json();
  };

  const { data } = useQuery<Post, Error>(["admin-post", uuid], () => fetchPost(uuid), {
    enabled: !!uuid,
  });

  useEffect(() => {
    if (data) {
      if (data.images) {
        setOldImages(data.images);
      }
    }
  }, [data]);

  const editPost = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const images = await uploadImages(e.target.images.files);

      const res = await fetch(`/api/posts/${uuid}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: e.target.user.value.trim(),
          title: e.target.title.value.trim(),
          body: e.target.body.value.trim().replaceAll(/(?:\r|\n|\r\n)/g, "<br/>"),
          images: images.concat(oldImages),
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
      <PostEditorLayout
        setImages={setImages}
        images={images.concat(oldImages)}
        isLoading={isLoading}
        onSubmit={editPost}
        defaultUser={data?.user}
        defaultTitle={data?.title}
        defaultBody={data?.body.replaceAll("<br/>", "\n")}
        setOldImages={setOldImages}
        headerText={"Edit Post"}
        buttonText={"Update Post"}
      />
    </>
  );
};

export default EditPostPage;
