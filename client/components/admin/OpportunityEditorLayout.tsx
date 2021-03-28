import React from "react";

import SimpleInput from "../reuseable/SimpleInput";
import SimpleTextArea from "../reuseable/SimpleTextArea";
import SpinnerButton from "../reuseable/SpinnerButton";

interface Props {
  onSubmit: (...any) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  image: string;
  headerText: string;
  defaultName?: string;
  defaultDescription?: string;
  defaultContactEmail?: string;
  buttonText?: string;
}

const OpportunityEditorLayout: React.FC<Props> = ({
  onSubmit,
  setImage,
  isLoading,
  image,
  headerText,
  defaultName,
  defaultDescription,
  defaultContactEmail,
  buttonText = "Create Opportunity",
}) => {
  return (
    <>
      <form className="opportunity-form" onSubmit={onSubmit}>
        <h1>{headerText}</h1>
        <SimpleInput placeholder={"Name: "} name={"name"} defaultValue={defaultName} />
        <SimpleTextArea
          name={"description"}
          placeholder={"Description: "}
          defaultValue={defaultDescription}
          height={140}
          margin={30}
        />
        <SimpleInput
          placeholder={"Contact Email: "}
          name={"contactEmail"}
          defaultValue={defaultContactEmail}
        />
        <input
          type="file"
          name="image"
          placeholder="Upload an Image"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          accept="image/*"
        />
        {image !== null && <img src={image} alt="" />}
        <SpinnerButton text={buttonText} isLoading={isLoading} buttonType={"submit"} />
      </form>

      <style jsx>{`
        .opportunity-form {
          width: 50%;
          margin: 80px auto;
          display: flex;
          flex-direction: column;
        }

        input {
          margin: 30px 0;
          align-self: flex-start;
        }

        img {
          display: block;
          max-width: 720px;
          max-height: 240px;
          width: auto;
          height: auto;
          align-self: flex-start;
        }

        @media screen and (max-width: 800px) {
          .opportunity-form {
            width: 70%;
          }
        }

        @media screen and (max-width: 600px) {
          .opportunity-form {
            width: 80%;
          }
        }
      `}</style>
    </>
  );
};

export default OpportunityEditorLayout;
