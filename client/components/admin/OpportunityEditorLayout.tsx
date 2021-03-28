import React from "react";

import SimpleInput from "../reuseable/SimpleInput";
import SimpleTextArea from "../reuseable/SimpleTextArea";
import SpinnerButton from "../reuseable/SpinnerButton";

interface Props {
  onSubmit: (...any) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  image: string;
}

const OpportunityEditorLayout: React.FC<Props> = ({ onSubmit, setImage, isLoading, image }) => {
  return (
    <>
      <form className="opportunity-form" onSubmit={onSubmit}>
        <h1>Create Opportunity</h1>
        <SimpleInput placeholder={"Name: "} name={"name"} />
        <SimpleTextArea name={"description"} placeholder={"Description: "} height={140} margin={30} />
        <SimpleInput placeholder={"Contact Email: "} name={"contactEmail"} />
        <input
          type="file"
          name="image"
          placeholder="Upload an Image"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          accept="image/*"
        />
        {image !== null && <img src={image} alt="" />}
        <SpinnerButton text={"Create Opportunity"} isLoading={isLoading} buttonType={"submit"} />
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
      `}</style>
    </>
  );
};

export default OpportunityEditorLayout;
