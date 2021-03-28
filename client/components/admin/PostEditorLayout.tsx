import React from "react";

import SimpleInput from "../reuseable/SimpleInput";
import SimpleTextArea from "../reuseable/SimpleTextArea";
import SpinnerButton from "../reuseable/SpinnerButton";

interface Props {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  isLoading: boolean;
  onSubmit: (...any) => void;
  defaultUser?: string;
  defaultTitle?: string;
  defaultBody?: string;
}

const PostEditorLayout: React.FC<Props> = ({
  setImages,
  images,
  isLoading,
  onSubmit,
  defaultBody,
  defaultTitle,
  defaultUser,
}) => {
  return (
    <>
      <form className="post-form" onSubmit={onSubmit}>
        <h1>Create Post</h1>
        <SimpleInput placeholder={"User: "} name={"user"} defaultValue={defaultUser} />
        <SimpleInput placeholder={"Title: "} name={"title"} margin={30} defaultValue={defaultTitle} />
        <SimpleTextArea name={"body"} placeholder={"Body: "} height={350} defaultValue={defaultBody} />
        <input
          type="file"
          name="images"
          placeholder="Image attachments"
          accept={"image/*"}
          onChange={(e) => {
            const arr: string[] = [];

            for (let i = 0; i < e.target.files.length; i++) {
              arr.push(URL.createObjectURL(e.target.files[i]));
            }

            setImages(arr);
          }}
          multiple
        />

        {images.map((image) => (
          <img src={image} alt="image" key={image} />
        ))}

        <SpinnerButton text={"Create Post"} isLoading={isLoading} buttonType={"submit"} />
      </form>

      <style jsx>{`
        .post-form {
          width: 50%;
          margin: 50px auto 100px;
          display: flex;
          flex-direction: column;
        }

        .post-form h1 {
          font-size: 1.4rem;
          margin-bottom: 30px;
        }

        input {
          margin: 30px 0;
        }

        img {
          display: block;
          max-width: 720px;
          max-height: 240px;
          width: auto;
          height: auto;
          align-self: flex-start;
          margin: 20px 0;
        }

        @media screen and (max-width: 800px) {
          .post-form {
            width: 70%;
          }
        }

        @media screen and (max-width: 600px) {
          .post-form {
            width: 80%;
          }
        }
      `}</style>
    </>
  );
};

export default PostEditorLayout;
