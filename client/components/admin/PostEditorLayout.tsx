import React, { useRef } from "react";

import SimpleInput from "../reuseable/SimpleInput";
import SimpleTextArea from "../reuseable/SimpleTextArea";
import SpinnerButton from "../reuseable/SpinnerButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setOldImages?: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  isLoading: boolean;
  onSubmit: (...any) => void;
  defaultUser?: string;
  defaultTitle?: string;
  defaultBody?: string;
  headerText?: string;
  buttonText?: string;
}

const PostEditorLayout: React.FC<Props> = ({
  setImages,
  images,
  isLoading,
  onSubmit,
  defaultBody,
  defaultTitle,
  defaultUser,
  setOldImages,
  headerText = "Create Post",
  buttonText = "Create Post",
}) => {
  const filesRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form className="post-form" onSubmit={onSubmit}>
        <h1>{headerText}</h1>
        <SimpleInput placeholder={"User: "} name={"user"} defaultValue={defaultUser} />
        <SimpleInput placeholder={"Title: "} name={"title"} margin={30} defaultValue={defaultTitle} />
        <SimpleTextArea name={"body"} placeholder={"Body: "} height={350} defaultValue={defaultBody} />
        <input
          type="file"
          name="images"
          placeholder="Image attachments"
          accept={"image/*"}
          ref={filesRef}
          onChange={(e) => {
            const arr: string[] = [];

            for (let i = 0; i < e.target.files.length; i++) {
              arr.push(URL.createObjectURL(e.target.files[i]));
            }

            setImages(arr);
          }}
          multiple
        />

        {images.map(
          (image) =>
            image && (
              <div className="image" key={image}>
                <img src={image} alt="image" />
                <div>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size={"1x"}
                    color={"red"}
                    onClick={() => {
                      filesRef.current.value = "";

                      if (image.includes("blob")) {
                        setImages([]);
                      } else {
                        if (setOldImages) {
                          setOldImages((old) => old.filter((i) => i !== image));
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )
        )}

        <SpinnerButton text={buttonText} isLoading={isLoading} buttonType={"submit"} />
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

        .image {
          align-self: flex-start;
          position: relative;
          margin: 20px 0;
          max-width: 30%;
        }

        .image > div {
          position: absolute;
          top: 5px;
          right: 5px;
          cursor: pointer;
        }

        img {
          display: block;
          max-width: 100%;
          width: auto;
          height: auto;
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

          .image {
            max-width: 50%;
          }
        }
      `}</style>
    </>
  );
};

export default PostEditorLayout;
